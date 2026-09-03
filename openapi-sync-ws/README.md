# OpenAPI Sync Demo

A sample [Bruno](https://www.usebruno.com/) workspace used to demonstrate Bruno's **OpenAPI Sync** capability.

The workspace ships with two versions of the same OpenAPI (OAS) document so you can import one, sync against it, and then update using the second version to see how spec changes are detected and applied to an existing collection.

## Contents

```
.
├── workspace.yml                 # Bruno workspace definition
├── orders-api-v1.yaml            # Initial OAS document (import this first)
├── orders-api-v2.yaml            # Updated OAS document (use this to test sync)
└── collections/
    └── Orders API/               # Bruno collection generated from the OAS
        ├── opencollection.yml
        ├── Customers/
        ├── Orders/
        ├── System/
        └── environments/
```

## The two spec versions

Both files describe the same fictional **Orders API** (`https://api.demo.local/v1`). `v2` intentionally introduces changes that OpenAPI Sync should surface.

| Change                                            | v1 | v2 |
| ------------------------------------------------- | -- | -- |
| `GET /health`, `GET/POST /orders`, `GET/PUT /orders/{orderId}`, `GET /customers/{customerId}/orders` | ✅ | ✅ |
| `POST /orders/{orderId}/cancel` endpoint          | —  | ✅ |
| `priority` field on order request/response bodies | —  | ✅ |
| `on_hold` added to the `status` filter enum       | —  | ✅ |
| `include` query parameter on `GET /orders/{orderId}` | —  | ✅ |

## Using the demo with Bruno

1. **Open the workspace** in Bruno by opening this folder.
2. **Review the synced collection.** `collections/Orders API` is already populated from `orders-api-v1.yaml`. You can also import form this file as a collection and have a collection auto-generated. Its `opencollection.yml` records the source URL, last sync date, and spec hash under `extensions.bruno.openapi`.
3. **Trigger a sync against v1** to confirm the collection is up-to-date. No changes should be reported.
4. **Switch the source to v2** to see sync in action. Either:
   - Edit `collections/Orders API/opencollection.yml` and change the `sourceUrl` (or local path) to point at `orders-api-v2.yaml`, or
   - Update the spec source from Bruno's OpenAPI Sync UI.
5. **Run the sync again.** Bruno should detect the additions and updates listed above and offer to apply them to the `Orders API` collection.

## Resetting the demo

To run the demo again from a clean state, revert the collection folder and `opencollection.yml` to their committed versions:

```sh
git checkout -- "collections/Orders API"
```

## References

- Bruno documentation: https://docs.usebruno.com/
- Bruno repository: https://github.com/usebruno/bruno
