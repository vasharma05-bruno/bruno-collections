# Bruno Demo Day Workspace

A [Bruno](https://www.usebruno.com/) workspace used to demonstrate Bruno's API client features end-to-end — requests, scripting, testing, environments, secrets, and CLI-driven CI.

Workspace name: **Bruno-Demo-Day** (defined in [`workspace.yml`](./workspace.yml))

## Structure

```
.
├── workspace.yml                  # Workspace definition (OpenCollection 1.0.0)
├── environments/
│   └── Globals.yml                # Workspace-level global variables
├── collections/
│   └── Bruno E2E Demo/            # Primary demo collection
│       ├── opencollection.yml
│       ├── package.json           # Collection-level npm deps (e.g. zod)
│       ├── environments/          # Demo-Env, Staging-Env, Prod-Env
│       ├── Authentication/        # Basic Auth, Bearer, Client Credentials
│       ├── Basic-Requests-Tests/  # Simple GET/POST examples + tests
│       ├── Additional-Request-Types/  # GraphQL, gRPC, WebSocket, SSE, SOAP
│       ├── Scripting/             # Pre/post scripts, contract tests, faker, xml
│       ├── Variables/             # Variable precedence, secrets, prompt input
│       ├── Product Update Flow/   # Multi-request flow used by CI
│       └── Runner-DD-Users/       # Data-driven runner examples
├── reports/                       # CLI run reports (HTML)
└── .github/workflows/main.yml     # CI: Bruno CLI run on push/PR
```

## Demo Collection: `Bruno E2E Demo`

Each folder showcases a different Bruno capability:

| Folder | Demonstrates |
| --- | --- |
| `Authentication` | Basic Auth, Bearer tokens, OAuth2 Client Credentials |
| `Basic-Requests-Tests` | Plain HTTP requests with assertions and `test()` blocks |
| `Additional-Request-Types` | Non-HTTP protocols: GraphQL, gRPC, WebSocket, SSE, SOAP |
| `Scripting` | Pre/post-request scripts, contract tests, external libs (`zod`, `faker`), inbuilt XML support, JS file imports |
| `Variables` | Variable precedence, prompt-input vars, Bruno Secret Manager |
| `Product Update Flow` | Chained requests using `bru.setVar` to drive an update flow (used in CI) |
| `Runner-DD-Users` | Data-driven runs (CSV/JSON) via the Runner |

### Environments

Workspace globals are defined in [`environments/Globals.yml`](./environments/Globals.yml). The collection ships with three scoped environments under `collections/Bruno E2E Demo/environments/`:

- `Demo-Env` — used by CI
- `Staging-Env`
- `Prod-Env`

Secret variables (e.g. `news-api-key`, `mongodb`, `reqres-api-key`) are referenced via `{{secretName}}` and resolved from Bruno's secret store or `process.env` (e.g. `{{process.env.apikey}}`).

## Running Locally

### In the Bruno app
1. Install [Bruno](https://www.usebruno.com/downloads).
2. **Open Workspace** → select this repository's root folder.
3. Pick an environment (e.g. `Demo-Env`) and run any request.

### From the CLI

Install the [Bruno CLI](https://docs.usebruno.com/bru-cli/overview):

```bash
npm install -g @usebruno/cli
```

Install collection-level dependencies (required for scripts that import `zod`, etc.):

```bash
cd "collections/Bruno E2E Demo"
npm install
```

Run a folder against an environment:

```bash
# from collections/Bruno E2E Demo
bru run "Product Update Flow" \
  --env Demo-Env \
  --reporter-html ../../reports/results.html \
  --sandbox=developer
```

Useful flags:

- `--env <name>` — environment to load
- `--reporter-html <path>` — emit an HTML report
- `--reporter-json <path>` — emit a JSON report
- `--sandbox=developer` — required when scripts use external npm modules
- `-r` — recurse into subfolders

## CI

[`.github/workflows/main.yml`](./.github/workflows/main.yml) runs on every push and PR to `main`:

1. Checks out the repo
2. Sets up Node 20
3. Installs `@usebruno/cli` globally
4. Runs the `Product Update Flow` folder against `Demo-Env`
5. Uploads the HTML report as a `test-results` artifact

To wire in secrets used by the collection, add them as GitHub Actions secrets and expose them as env vars in the workflow (e.g. `apikey`, `news-api-key`).

## Links

- Bruno docs: https://docs.usebruno.com/
- Bruno CLI: https://docs.usebruno.com/bru-cli/overview
- Bruno on GitHub: https://github.com/usebruno/bruno

## New Heading
