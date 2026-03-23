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

function resolveSncBin() {
	const explicit = getEnv('SNC_BIN');
	if (explicit) return explicit;
	return 'snc';
}

function buildSncEnv() {
	const env = { ...process.env };

	// VS Code tasks / npm scripts sometimes run with HOME unset/modified.
	// SNC uses HOME to resolve ~/.snc/config.json.
	env.HOME = env.HOME || os.homedir();

	const sncBin = resolveSncBin();
	if (sncBin.includes(path.sep)) {
		const sncDir = path.dirname(sncBin);
		env.PATH = env.PATH ? `${sncDir}:${env.PATH}` : sncDir;
	}

	return env;
}

function runCapture(command, args) {
	return new Promise((resolve) => {
		const child = spawn(command, args, {
			stdio: ['ignore', 'pipe', 'pipe'],
			env: buildSncEnv(),
		});

		let stdout = '';
		let stderr = '';
		child.stdout.on('data', (d) => (stdout += d.toString()));
		child.stderr.on('data', (d) => (stderr += d.toString()));

		child.on('error', (error) => resolve({ code: 1, stdout, stderr, error }));
		child.on('close', (code) => resolve({ code: code ?? 1, stdout, stderr }));
	});
}

async function main() {
	const sncBin = resolveSncBin();

	// Always ensure `snc` is available; @servicenow/cli shells out to it.
	const version = await runCapture(sncBin, ['version', '--output', 'json']);
	if (version.code !== 0) {
		console.error('SNC (snc) is not available.');
		console.error('If it is installed but not on PATH, set SNC_BIN in your .env, e.g.:');
		console.error('  SNC_BIN=/Applications/ServiceNow CLI/bin/snc');
		process.exit(1);
	}

	// If the caller has provided direct login flags, or explicitly asks to skip,
	// don't require an SNC profile to exist.
	const hasDirectLogin = Boolean(getEnv('SN_HOST') && getEnv('SN_USERNAME') && getEnv('SN_PASSWORD'));
	if (getEnv('SKIP_SNC_PROFILE_CHECK') === '1' || hasDirectLogin) return;

	const list = await runCapture(sncBin, ['configure', 'profile', 'list', '--output', 'json']);
	const stdoutTrimmed = (list.stdout || '').trim();
	const stderrTrimmed = (list.stderr || '').trim();
	if (list.code !== 0 || !stdoutTrimmed.startsWith('{')) {
		console.error('No SNC profiles configured. Create the default profile first:');
		console.error('  npm run snc:configure');
		console.error('or');
		console.error('  snc configure profile set');
		if (stderrTrimmed) {
			console.error('');
			console.error('snc output:');
			console.error(stderrTrimmed);
		}
		process.exit(1);
	}

	let parsed;
	try {
		parsed = JSON.parse(list.stdout);
	} catch {
		console.error('No SNC profiles configured. Create the default profile first:');
		console.error('  npm run snc:configure');
		console.error('or');
		console.error('  snc configure profile set');
		if (stderrTrimmed) {
			console.error('');
			console.error('snc output:');
			console.error(stderrTrimmed);
		}
		process.exit(1);
	}

	const defaultProfile = parsed?.default;
	const host = defaultProfile?.host;

	if (!defaultProfile || !host) {
		console.error('SNC default profile is missing required instance details.');
		console.error('Recreate it with:');
		console.error('  snc configure profile set');
		process.exit(1);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
