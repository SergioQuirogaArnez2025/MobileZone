# Supabase Cloud setup

## Environment and installation

- **OS:** Windows 10/11, x64.
- **Project:** React 19 + Vite, JavaScript ES modules, npm; app and package manifest are in `react-app/`.
- **Runtime checked:** Node.js v24.19.0 and npm 11.17.0.
- **CLI:** Supabase CLI v3.0.0, installed as the local development dependency `supabase` in `react-app/package.json`. Run it from the repository root with `npx --prefix react-app supabase <command>`.
- **SDK:** `@supabase/supabase-js` installed as a runtime dependency.
- **Docker:** not installed or used. Do not run `supabase start`; this repository is being prepared for Supabase Cloud only.

## Authentication and project link

- CLI version is verified.
- **Authentication is pending:** `supabase projects list` reported that no access token is available. No access token or other credential has been written to the repository.
- **Remote project selection and link are pending:** no project reference is configured or linked yet. No remote database or project resources were changed.

To authenticate locally, run from the repository root:

```powershell
npx --prefix react-app supabase login
npx --prefix react-app supabase projects list
```

Complete the CLI authentication prompt on this machine. Do not paste an access token into source files, `.env.example`, or chat. Once the intended project is identified, link it from the repository root:

```powershell
npx --prefix react-app supabase link --project-ref <project-ref>
```

If the CLI asks for a database password, enter it only in the local CLI prompt. Linking associates the local configuration with a Cloud project; it does not push a schema.

## App configuration

`react-app/.env.example` documents the variables used by the Vite app. Copy it to the ignored local file `react-app/.env.local` and set values from the selected Supabase Cloud project:

```dotenv
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Use the project URL and **publishable** key from the Supabase Dashboard/API settings. Vite exposes `VITE_` variables in browser code: these values are intended to be public, but access must be protected by appropriate database policies when database features are added. Never use or expose a `service_role` or secret key in this frontend or in any `VITE_` variable.

The `.gitignore` in `react-app/` ignores `.env` and `.env.*` files while allowing `.env.example`. `src/lib/supabase.js` centralizes client initialization through `getSupabaseClient()` and reports a clear error if the local environment is not configured. The client is lazy so the existing application can continue to build before Cloud credentials are supplied.

## Files created or modified

- `react-app/package.json` and `react-app/package-lock.json`: local CLI and JS SDK dependencies.
- `supabase/config.toml` and `supabase/.gitignore`: CLI project scaffold; not linked to Cloud yet.
- `react-app/.gitignore`: protects local dotenv files.
- `react-app/.env.example`: documents required public client variables.
- `react-app/src/lib/supabase.js`: centralized lazy client.
- `react-app/src/lib/supabase.test.js`: client initialization/configuration checks.

No migrations, schema, tables, user authentication flows, CRUD, or remote database changes were created.

## Useful commands and validation

From the repository root:

```powershell
npx --prefix react-app supabase --version
npx --prefix react-app supabase projects list
npx --prefix react-app supabase status
```

From `react-app/`:

```powershell
npm ci
npm test
npm run build
```

The project is prepared for the initial application integration, but Cloud authentication, selecting/linking the intended project, and supplying local URL/publishable-key values still require completion. The full dependency audit also reports a pre-existing high-severity advisory affecting Vite 8.3.0–8.3.2; production dependencies have no audit findings. Review a Vite update separately before deployment.
