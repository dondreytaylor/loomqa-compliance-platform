# ServiceNow (UI Builder / Now Experience)

This folder contains the **Now Experience / UI Builder** version of the Loom platform.

If you’re looking for a **Service Portal** (AngularJS widget) version, it may live elsewhere in this repo depending on your branch/history.

## What’s in here

- `src/`: the UI Framework custom element implementation.
- `now-ui.json`: UI Builder registration (tile metadata) and app scope.
- `package.json`: local dev + deploy scripts (via `@servicenow/cli`).

## How this maps to the local app

- Local (`platform/local`) is a **Next.js** web app you own end-to-end (routing, layout, server, build).
- This ServiceNow version (`servicenow/now-experience`) is a **custom element** (Now Experience component) that runs inside ServiceNow’s runtime and is composed in **UI Builder**.

Practically: you don’t “deploy a website”; you deploy **component records + assets** that UI Builder can place on pages.

## React vs Next Experience (important)

- **Service Portal** uses an AngularJS widget model.
- **UI Builder / Next Experience** uses ServiceNow’s **UI Framework** (custom elements via `@servicenow/ui-core`) — it is *not* React.

If your goal is “Next Experience”, use `servicenow/now-experience/`.

## Prereqs

- **Node.js**: use Node `>=20`.
- **ServiceNow tooling**: `@servicenow/cli` requires **SNC** installed locally (even for local dev / offline update-set generation). If SNC is missing you’ll see: “SNC is not found, please install SNC from store.”

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

### Configure your ServiceNow instance profile (so `snc` can connect)

Profile details (instance URL + credentials) are stored by the **`snc`** CLI on your machine (in your user config), not in this repo.

That’s intentional:

- This repo does **not** store credentials.
- `@servicenow/cli` (used by `npm run start` / `npm run deploy`) relies on `snc` being installed and properly configured.

Because `snc` is installed from the Store and can vary by version, the safest way to configure profiles is:

1) See what your installed `snc` supports

```bash
snc --help
```

Look for a command related to **profiles**, **configure**, **auth**, or **login**.

2) Create/configure a profile

Run the relevant help for the command you find, for example:

```bash
snc configure --help
snc profile --help || true
snc profiles --help || true
snc login --help || true
```

Then create a profile using your instance host and user.

Tip: if your `snc` help shows a **config** command, it often includes a way to print where the CLI stores its config (and therefore profiles). Use whatever your version exposes (for example, a `path`, `list`, or `show` subcommand).

3) Validate the profile works

At minimum, verify you can list/see the profile via `snc` and that `snc` can resolve your instance details.

4) Use that profile with this project

Once `snc` is configured, the project commands should stop failing with the SNC error:

```bash
cd servicenow/now-experience
npm run start
# and later
npm run deploy
```

Fallback (if your CLI version suggests it):

The `@servicenow/cli` bundle includes a documented fallback to pass instance details directly using flags like `--loginHost`, `--username`, and `--password`.
If you see a “Please configure your profile…” message and want a quick one-off run, you can try:

```bash
npx -y @servicenow/cli deploy --loginHost https://YOUR_INSTANCE.service-now.com --username YOUR_USER --password 'YOUR_PASSWORD'
```

If your installed CLI rejects those flags, profiles are required.

Official CLI docs (profile/auth setup varies a bit by release):

- https://developer.servicenow.com/dev.do#!/reference/next-experience/washingtondc/cli/getting-started

## Quick start

1) Install dependencies

```bash
cd servicenow/now-experience
npm install
```

2) Run locally (component preview)

```bash
npm run start
```

If SNC isn’t installed yet, this will fail with the SNC missing message.

3) Deploy to your instance (requires SNC)

```bash
cd servicenow/now-experience
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
- This UI Builder scaffold currently includes a Loom-like sidebar and section placeholders in `src/x-loom-platform/index.js`.
