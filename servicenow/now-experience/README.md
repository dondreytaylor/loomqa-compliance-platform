# ServiceNow (UI Builder / Now Experience)

This folder contains the **Now Experience / UI Builder** version of the Loom platform.

If you’re looking for a **Service Portal** (AngularJS widget) version, it may live elsewhere in this repo depending on your branch/history.

## What’s in here

- `src/`: the UI Framework custom element implementation.
- `now-ui.json`: UI Builder registration (tile metadata) and app scope.
- `package.json`: local dev + deploy scripts (via `@servicenow/cli`).

## How this maps to the local app

- Local (`platform/local`) is a **Next.js** web app you own end-to-end (routing, layout, server, build).
- This ServiceNow version (`platform/servicenow/now-experience`) is a **custom element** (Now Experience component) that runs inside ServiceNow’s runtime and is composed in **UI Builder**.

Practically: you don’t “deploy a website”; you deploy **component records + assets** that UI Builder can place on pages.

## React vs Next Experience (important)

- **Service Portal** uses an AngularJS widget model.
- **UI Builder / Next Experience** uses ServiceNow’s **UI Framework** (custom elements via `@servicenow/ui-core`) — it is *not* React.

If your goal is “Next Experience”, use `platform/servicenow/now-experience/`.

## Prereqs

- **Node.js**: use Node `>=20`.

- **ServiceNow tooling**: `@servicenow/cli` requires **SNC** installed locally.
	- In most setups it uses your **default SNC profile** for instance connection.
	- If the CLI fails to detect your SNC profile, this project can also pass connection details directly from `.env` (see “Direct login from .env”).
	- If SNC is missing you’ll see: “SNC is not found, please install SNC from store.”
	- If the profile is missing you’ll see: “Please configure your profile with the instance details…”.

### Dev build warnings

This project uses `patch-package` to apply a tiny upstream fix to `@servicenow/ui-core` so webpack does not emit warnings about importing `version` from `package.json`.

- Patch file: `patches/@servicenow+ui-core+24.1.1.patch`
- Applied automatically via `postinstall`

### Install SNC (macOS, personal machine)

The `@servicenow/cli` package expects a separate **ServiceNow CLI** binary named `snc` to be installed and on your `PATH`.

#### 1) Get the SNC CLI (download)

- Go to the ServiceNow Store: https://store.servicenow.com/
- Search for **“ServiceNow CLI”** (often referred to as **SNC**).
- Download/install the macOS version.

If your organization provides a managed installer/package, use that instead — the key requirement is that you end up with the `snc` executable available in your terminal.

#### 2) Verify `snc` is available

Run:

```bash
command -v snc
snc version --output json
```

Expected: `which snc` prints a path, and `snc version --output json` prints JSON that includes an `snc` version.

If you still see “command not found: snc” after installing:

- Close/reopen your terminal (and VS Code) and try again.
- Confirm the installer completed successfully.
- If you can find where it installed `snc` but it isn’t on your PATH yet, add that folder to your PATH (for zsh, in `~/.zshrc`) and restart your terminal.

Quick PATH sanity checks:

```bash
echo "$PATH"
type -a snc || true
```

#### 2.5) If SNC is installed but not on PATH (common on macOS)

Some macOS installers place `snc` here:

`/Applications/ServiceNow CLI/bin/snc`

If `command -v snc` fails but that file exists, add the folder to your PATH.

For zsh, append this to `~/.zshrc`:

```bash
export PATH="/Applications/ServiceNow CLI/bin:$PATH"
```

Then fully restart:

- your terminal tabs, and
- VS Code (so Tasks inherit the updated PATH).

### Configure your ServiceNow instance profile (so `snc` can connect)

Profile details (instance URL + credentials) are stored by the **`snc`** CLI on your machine (in your user config), not in this repo.

Important: do **not** edit `~/.snc/config.json` by hand. SNC checksum-protects that file and will refuse to run if it detects manual edits. Always use `snc configure profile set` to change profile values.

That’s intentional:

- This repo does **not** store credentials.
- `@servicenow/cli` (used by `npm run start` / `npm run deploy`) relies on `snc` being installed and properly configured.

Because `snc` is installed from the Store and can vary by version, the safest way to configure profiles is:

For SNC `1.1.x`, profiles are managed via `snc configure profile ...`.

1) Create / update your **default** profile (interactive)

```bash
snc configure profile set
```

When prompted for **Host**, enter the host name without the scheme, for example:

- `dev185111.service-now.com`

Some ServiceNow tooling is picky about this format and may fail to detect instance details if you enter `https://...`.

This stores non-secret values in `~/.snc`. Sensitive credentials are stored in your OS keychain (macOS Keychain).

2) (Optional) Create a **named** profile

```bash
snc configure profile set --profile MyProfileName
```

3) List profiles (sanity check)

```bash
snc configure profile list --output table
```

4) Refresh commands from the instance (often required after first setup)

```bash
snc configure profile refresh
```

If you see:

"This instance does not support dynamic commands. Functionality will be limited."

That is a **warning**, not a failure. It means your instance doesn’t provide instance-driven (dynamic) SNC commands.
You can usually proceed with UI Builder / Now Experience workflows anyway.

Or run the following commands 

```bash
snc extension add --name ui-component
snc extension update --name ui-component
snc configure profile refresh
```

5) Use that default profile with this project

Once `snc` is configured, the project commands should stop failing with the SNC error:

```bash
cd platform/servicenow/now-experience
npm run start
# and later
npm run deploy
```

#### Optional: configure SNC from a `.env` file

If you prefer to keep your instance details in a local `.env` file, this project includes an npm script that reads `.env` and runs `snc configure profile set` for you.

1) Create your `.env`

```bash
cd platform/servicenow/now-experience
cp .env.example .env
```

2) Fill in values in `.env`

3) Configure SNC using the script

```bash
npm run snc:configure
```

Notes:

- `.env` is gitignored.
- `snc` still stores the resulting profile in `~/.snc` and secrets in macOS Keychain.
- For safety, the script does **not** auto-type secrets into SNC prompts; it launches SNC interactively and prints which `.env` values to enter.
- If `snc` is installed but not on PATH, set `SNC_BIN=/Applications/ServiceNow CLI/bin/snc` in your `.env`.
- `SN_HOST` can be either `https://YOUR_INSTANCE.service-now.com` or just `YOUR_INSTANCE.service-now.com` (the script normalizes to the host).

#### Direct login from `.env` (workaround for persistent profile detection errors)

If you keep seeing:

“Please configure your profile with the instance details…”

even though `snc configure profile list` shows a profile, this project will automatically pass the following flags to `@servicenow/cli` when they exist in `.env`:

- `--loginHost` (from `SN_HOST`, normalized to remove `https://` if present)
- `--username` (from `SN_USERNAME`)
- `--password` (from `SN_PASSWORD`)

This avoids the brittle “profile detection” path and makes `npm run start` / `npm run deploy` work using `.env` values.

Note: this passes the password as a process argument (visible to other local processes via OS tooling). If that’s a concern, prefer the SNC profile + keychain workflow.

Official CLI docs (profile/auth setup varies a bit by release):

- https://developer.servicenow.com/dev.do#!/reference/next-experience/washingtondc/cli/getting-started

## Quick start

0) Configure your instance connection

```bash
cd platform/servicenow/now-experience

# Option A: create/update an SNC profile (recommended)
npm run snc:configure

# Option B: direct interactive
# snc configure profile set
# snc configure profile refresh

# Option C: direct login from .env
# Fill in SN_HOST, SN_USERNAME, SN_PASSWORD in .env
```

1) Install dependencies

```bash
cd platform/servicenow/now-experience
npm install
```

2) Run locally (component preview)

```bash
npm run start
```

This launches the Now Experience local dev server and opens a browser automatically.
If it doesn’t open for you, navigate to:

- http://127.0.0.1:8081

If SNC isn’t installed yet, this will fail with the SNC missing message.

3) Deploy to your instance (requires SNC)

```bash
cd platform/servicenow/now-experience
npm run deploy
```

If this fails with the “SNC is not found…” message, install SNC first.

### Node version

If you use `nvm`, you can switch with:

```bash
nvm install 20
nvm use 20
```

## Deploy from VS Code

This repo adds workspace tasks in `.vscode/tasks.json`:

- **ServiceNow (Now Experience): Install deps**
- **ServiceNow (Now Experience): Start (local dev)**
- **ServiceNow (Now Experience): Deploy (now-cli)**
- **ServiceNow (Now Experience): Generate Update Set**

Open the Command Palette → **Tasks: Run Task**.

## Add the component in UI Builder

After a successful deploy:

1) Open **UI Builder** in your ServiceNow instance.
2) Open (or create) a page.
3) Add a component and search for **“Loom Platform”**.
4) Drag it onto the canvas and publish.

The component definition that makes it discoverable is in `now-ui.json`.

## How deployment works (high level)

- For Now Experience, deployment is driven by `@servicenow/cli` which packages your component (and its `now-ui.json`) for a ServiceNow instance.
- Unlike the local Next.js app (`platform/local`), you are building a **custom element** (via `@servicenow/ui-core`) which UI Builder can place on pages.

## Important config: `scopeName`

`now-ui.json` includes:

- `scopeName`: the ServiceNow application scope that owns the component.

Default is `"x_loom"`. If your instance uses a different scope, update it before deploying.

## Configuration

This scaffold does **not** include secrets.

- Configure `now-cli`/SNC per your organization’s standard (instance URL, auth, etc.).
- If your instance uses a non-default app scope, update `scopeName` in `now-ui.json`.

## Notes

- The existing Service Portal implementation (AngularJS widget) remains in `platform/servicenow/` and is useful when you specifically want **Service Portal** rather than UI Builder/Now Experience.
- This UI Builder scaffold includes a Loom-like app shell (sidebar/topbar/dashboard + modal interactions) under `src/x-loom-platform/`.
