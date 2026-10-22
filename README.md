# bruno-collections (QA fixtures)

Test data for manually testing the Bruno Backstage plugin
([usebruno/bruno-backstage-plugin](https://github.com/usebruno/bruno-backstage-plugin)).
Every entity name starts with `qa-` so it never clashes with the demo catalog.

## Register in Backstage

| What                   | How                                                                                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Valid descriptors      | Catalog import → `https://github.com/vasharma05-bruno/bruno-collections/blob/main/qa-fixtures/locations/valid.yaml`                           |
| Invalid descriptors    | Catalog import → `https://github.com/vasharma05-bruno/bruno-collections/blob/main/qa-fixtures/locations/invalid.yaml`                         |
| `app-config` origin    | Copy [`qa-fixtures/app-config.qa.yaml`](qa-fixtures/app-config.qa.yaml) into `app-config.local.yaml` in the plugin repo and restart the backend |
| UI / pull request flow | Use the folders in "No descriptor" below on the **Add Bruno Collection** page                                                                  |

## Collections with a descriptor (`locations/valid.yaml`)

| Entity                 | Folder                                     | Format         | What it covers                                                                              |
| ---------------------- | ------------------------------------------ | -------------- | ------------------------------------------------------------------------------------------- |
| `qa-github-rest-api`   | `github-rest-api-collection`               | `.bru`         | Explicit `spec.url`; title inherited from `bruno.json`; `partOf` one API                    |
| `qa-scim-provisioning` | `bruno-scim-api-collection/scim-collection` | `.bru`         | **No `spec.url`** — derived from the descriptor's location; owner is a `user:` ref          |
| `qa-bruno-e2e-demo`    | `bruno-demo-day-ws/collections/Bruno E2E Demo` | OpenCollection | Descriptor title / description / version / tags / links override the manifest; two APIs |
| `qa-orders-api`        | `openapi-sync-ws/collections/Orders API`   | OpenCollection | Minimal descriptor: no owner, no `partOf`; `%20` in the URL                                 |
| `qa-broken-manifest`   | `qa-fixtures/broken-manifest`              | `.bru`         | `bruno.json` is invalid JSON → entity ingested, API Docs "could not be generated"           |
| `qa-no-manifest`       | `qa-fixtures/no-manifest`                  | —              | No `bruno.json` / `opencollection.yml` → entity ingested without collection metadata        |

## Invalid descriptors (`locations/invalid.yaml`)

| File                       | Expected                                                         |
| -------------------------- | ---------------------------------------------------------------- |
| `missing-type.yaml`        | Rejected by schema validation (`spec.type` is required)          |
| `wrong-api-version.yaml`   | Rejected: `usebruno.com/v1` is not a known Bruno apiVersion      |
| `invalid-name.yaml`        | Rejected: `metadata.name` contains spaces                        |
| `unknown-api-part-of.yaml` | Ingested; no relation to the missing API; `api:` entry is skipped with a warning |
| `unparseable-owner.yaml`   | Ingested; owner relation skipped with a warning                  |
| `missing-path.yaml`        | Ingested without metadata; backend logs "could not read"         |
| `no-manifest-url.yaml`     | Ingested without metadata; backend logs "no bruno.json or opencollection.yml" |
| `duplicate-name.yaml`      | Conflicts with `qa-github-rest-api`; only one of the two is kept |

## No descriptor (for the Add Bruno Collection page)

| Folder                                | Format         | Probe result                                        |
| ------------------------------------- | -------------- | --------------------------------------------------- |
| `Webinar-Best-Practices-Feb-2026-BRU` | `.bru`         | Found `bruno.json`; name/title prefilled            |
| `bruno-testbench`                     | `.bru`         | Found `bruno.json` (also used by `app-config.qa.yaml`) |
| `genui-collection/collection`         | OpenCollection | Found `opencollection.yml` (also used by `app-config.qa.yaml`) |
| `genui-collection`                    | —              | "No bruno.json or opencollection.yml found"         |
| `bruno-demo-day-ws`                   | workspace      | "No bruno.json or opencollection.yml found"         |
