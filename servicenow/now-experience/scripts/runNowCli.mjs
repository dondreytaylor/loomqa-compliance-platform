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
	dotenv.config();
}

function getEnv(name) {
	const value = process.env[name];
	return value && value.trim() ? value.trim() : undefined;
}

function resolveSncBin() {
	return getEnv('SNC_BIN') ?? 'snc';
}

function hasArg(args, name) {
	return args.includes(name);
}

function normalizeLoginHost(host) {
	return host.replace(/^https?:\/\//i, '').replace(/\/+$/, '');
}

function buildDirectLoginArgs(existingArgs) {
	if (hasArg(existingArgs, '--loginHost') && hasArg(existingArgs, '--username') && hasArg(existingArgs, '--password')) {
		return [];
	}

	const host = getEnv('SN_HOST');
	const username = getEnv('SN_USERNAME');
	const password = getEnv('SN_PASSWORD');
	if (!host || !username || !password) return [];

	return ['--loginHost', normalizeLoginHost(host), '--username', username, '--password', password];
}

function buildEnvForChild() {
	const env = { ...process.env };

	// Reduce noisy toolchain output (webpack/CLI can trigger Node DeprecationWarnings).
	// This doesn't affect webpack warnings/errors.
	const existingNodeOptions = env.NODE_OPTIONS || '';
	if (!existingNodeOptions.includes('--no-deprecation')) {
		env.NODE_OPTIONS = `${existingNodeOptions} --no-deprecation`.trim();
	}

	// SNC relies on HOME to locate ~/.snc/config.json.
	env.HOME = env.HOME || os.homedir();

	const sncBin = resolveSncBin();

	// If SNC_BIN is an absolute path (common on macOS), ensure its directory is on PATH
	// so @servicenow/cli can spawn `snc`.
	if (sncBin.includes(path.sep)) {
		const sncDir = path.dirname(sncBin);
		env.PATH = env.PATH ? `${sncDir}:${env.PATH}` : sncDir;
	}

	return env;
}

function run(command, args, env) {
	return new Promise((resolve) => {
		const child = spawn(command, args, {
			cwd: projectRoot,
			stdio: 'inherit',
			env,
		});
		child.on('error', (error) => resolve({ code: 1, error }));
		child.on('close', (code) => resolve({ code: code ?? 1 }));
	});
}

function resolveNowCliInvocation() {
	const binName = process.platform === 'win32' ? 'now-cli.cmd' : 'now-cli';
	const localBin = path.join(projectRoot, 'node_modules', '.bin', binName);
	if (fs.existsSync(localBin)) {
		return { command: localBin, prefixArgs: [] };
	}

	// Fallback for repos that haven't installed dependencies yet.
	return { command: 'npx', prefixArgs: ['-y', '@servicenow/cli'] };
}

async function main() {
	const env = buildEnvForChild();

	const cliArgs = process.argv.slice(2);
	if (cliArgs.length === 0) {
		console.error('Usage: node scripts/runNowCli.mjs <@servicenow/cli args...>');
		process.exit(2);
	}

	const directLoginArgs = buildDirectLoginArgs(cliArgs);
	if (directLoginArgs.length > 0) {
		// Ensure profile checks don't block when credentials are supplied directly.
		env.SKIP_SNC_PROFILE_CHECK = '1';
	}

	// Preflight: confirm SNC is available (and profile exists unless skipped).
	const ensurePath = path.join(projectRoot, 'scripts', 'ensureSncProfile.mjs');
	const ensure = await run(process.execPath, [ensurePath], env);
	if (ensure.code !== 0) process.exit(ensure.code);

	const { command, prefixArgs } = resolveNowCliInvocation();
	const result = await run(command, [...prefixArgs, ...cliArgs, ...directLoginArgs], env);
	process.exit(result.code);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
