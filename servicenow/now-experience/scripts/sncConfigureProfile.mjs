import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

import dotenv from 'dotenv';

const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const envPath = path.join(projectRoot, '.env');

if (fs.existsSync(envPath)) {
	dotenv.config({ path: envPath });
} else {
	// Allow running without a .env (env vars may be provided by the shell/CI).
	dotenv.config();
}

function getEnv(name) {
	const value = process.env[name];
	return value && value.trim() ? value.trim() : undefined;
}

function normalizeHost(host) {
	const trimmed = String(host ?? '').trim().replace(/^['"]|['"]$/g, '');
	if (!trimmed) return '';
	if (/^https?:\/\//i.test(trimmed)) {
		try {
			return new URL(trimmed).host;
		} catch {
			// Fall through to the non-URL path.
		}
	}

	// SNC expects the instance host only. Strip any path/query/hash.
	return trimmed.replace(/^https?:\/\//i, '').split(/[/?#]/)[0].replace(/\/+$/, '');
}

const snHostRaw = getEnv('SN_HOST');
const snHost = snHostRaw ? normalizeHost(snHostRaw) : undefined;
const snLoginMethod = getEnv('SN_LOGIN_METHOD') ?? 'OAuth';
const snUsername = getEnv('SN_USERNAME');
const snPassword = getEnv('SN_PASSWORD');
const snClientId = getEnv('SN_CLIENT_ID') ?? '';
const snClientSecret = getEnv('SN_CLIENT_SECRET') ?? '';
const sncProfile = getEnv('SNC_PROFILE');

if (!snHost || !snUsername || !snPassword) {
	console.error(
		[
			'Missing required ServiceNow connection environment variables.',
			'',
			'Required in .env (or your shell):',
			'  - SN_HOST',
			'  - SN_USERNAME',
			'  - SN_PASSWORD',
			'',
			'Optional:',
			'  - SN_LOGIN_METHOD (default: OAuth)',
			'  - SN_CLIENT_ID / SN_CLIENT_SECRET (required for OAuth)',
			'  - SNC_PROFILE (configure a named profile instead of default)',
			'  - SNC_BIN (path to snc executable)',
		].join('\n')
	);
	process.exit(2);
}

function resolveSncBin() {
	const explicit = getEnv('SNC_BIN');
	if (explicit) return explicit;

	// If snc is on PATH, just use it.
	return 'snc';
}

function spawnInherit(command, args) {
	return new Promise((resolve) => {
		const env = { ...process.env, HOME: process.env.HOME || os.homedir() };
		const child = spawn(command, args, {
			cwd: projectRoot,
			stdio: 'inherit',
			env,
		});

		child.on('error', (error) => resolve({ code: 1, error }));
		child.on('close', (code) => resolve({ code: code ?? 1 }));
	});
}

async function main() {
	const sncBin = resolveSncBin();
	const sncArgs = ['configure', 'profile', 'set'];
	if (sncProfile) {
		sncArgs.push('--profile', sncProfile);
	}

	// IMPORTANT: Do not attempt to "type" secrets into SNC via stdin piping.
	// If any earlier prompt value is rejected, subsequent inputs can shift and get echoed to the terminal.
	// Instead, we validate that `.env` has what you need, then launch SNC interactively (TTY) so it can
	// securely store secrets in the OS keychain.

	console.log(`Starting interactive SNC setup for ${sncProfile ? `profile "${sncProfile}"` : 'default profile'}...`);
	console.log('When prompted, use these values (from your .env):');
	console.log(`  Host (no https://): ${snHost}`);
	console.log(`  Login method: ${snLoginMethod}`);
	console.log(`  Username: ${snUsername}`);
	if (snLoginMethod.toLowerCase() === 'oauth') {
		console.log('  (OAuth) Client id: (from .env)');
		console.log('  (OAuth) Client secret: (from .env)');
	} else {
		console.log('  Password: (from .env)');
	}
	console.log('');
	const result = await spawnInherit(sncBin, sncArgs);

	if (result.error) {
		console.error(`Failed to start snc: ${result.error.message}`);
		console.error('If snc is installed but not on PATH, set SNC_BIN in your .env, for example:');
		console.error('  SNC_BIN=/Applications/ServiceNow CLI/bin/snc');
		process.exit(1);
	}

	if (result.code !== 0) {
		console.error('snc configure profile set failed.');
		console.error(`  ${sncBin} configure profile set${sncProfile ? ` --profile ${sncProfile}` : ''}`);
		process.exit(result.code);
	}

	console.log('Refreshing SNC commands from your instance...');
	const refreshArgs = ['configure', 'profile', 'refresh'];
	if (sncProfile) refreshArgs.push('--profile', sncProfile);
	const refreshResult = await spawnInherit(sncBin, refreshArgs);
	process.exit(refreshResult.code);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
