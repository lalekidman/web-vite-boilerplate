# API contracts

Every HTTP endpoint this client calls, and its exact request/response shape.
The `<Thing>Response` interfaces in `src/lib/api/` mirror these rows one-to-one.

Marker: 🟢 wired · 🟡 spec'd, not wired · ⚪ blocked on backend work.

## <Group>

### `GET /example` 🟡

- **Guard:** none
- **Request:** —
- **Response:** `{ id: string, name: string }`
- **Errors:** `404` not found
