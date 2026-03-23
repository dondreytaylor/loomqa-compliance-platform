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

function buildEnv() {
	const env = { ...process.env };
	env.HOME = env.HOME || os.homedir();

	const sncBin = resolveSncBin();
	if (sncBin.includes(path.sep)) {
		const sncDir = path.dirname(sncBin);
		env.PATH = env.PATH ? `${sncDir}:${env.PATH}` : sncDir;
	}

	return env;
}

async function main() {
	const sncBin = resolveSncBin();
	const args = process.argv.slice(2);
	if (args.length === 0) {
		console.error('Usage: node scripts/runSnc.mjs <snc args...>');
		process.exit(2);
	}

	const child = spawn(sncBin, args, { cwd: projectRoot, stdio: 'inherit', env: buildEnv() });
	child.on('close', (code) => process.exit(code ?? 1));
	child.on('error', (err) => {
		console.error(err);
		process.exit(1);
	});
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
