/**
 * Single content entry point used by every page and component.
 *
 * The underlying module (`content.generated.ts`) is regenerated before each
 * build/dev run by `scripts/sync-content.ts`:
 *   - with `WP_API_URL` set  → typed data written from WordPress;
 *   - without it             → the seed files under `src/data/` are used.
 *
 * Types stay in the `src/data` modules; import them from there.
 */
export * from "./content.generated";