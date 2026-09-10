# Local WordPress test environment

Runs a throwaway WordPress + MySQL stack so the content pipeline can be tested
end-to-end before deploying the plugin to the live server.

## Requirements

- Docker Desktop running
- This folder mounted at `/local` inside the containers (see `docker-compose.yml`)

## Start & install

```bash
docker compose -f cms/local/docker-compose.yml up -d
# wait for "healthy", then install WordPress + activate plugins:
docker compose -f cms/local/docker-compose.yml run --rm wpcli wp core install \
  --url=http://localhost:8080 --title="Local CRL" --admin_user=admin \
  --admin_password=adminpass --admin_email=admin@example.com --skip-email
docker compose -f cms/local/docker-compose.yml run --rm wpcli wp plugin activate --all
docker compose -f cms/local/docker-compose.yml run --rm wpcli \
  wp rewrite structure '/%postname%/' --hard
```

Pretty permalinks matter: with plain permalinks the pretty REST URL
`/wp-json/crl/v1/all` 301-redirects (the sync script would still follow it,
but pretty permalinks match the production setup and are worth testing).

## Smoke-test the endpoint

```bash
curl http://localhost:8080/wp-json/crl/v1/all
```

## Seed test content

```bash
# import one placeholder image and keep the returned attachment ID (e.g. 14)
docker compose -f cms/local/docker-compose.yml run --rm wpcli \
  wp media import /local/sample.png --porcelain

docker compose -f cms/local/docker-compose.yml run --rm \
  -e CRL_MEDIA_ID=14 wpcli wp eval-file /local/seed-content.php
```

`seed-content.php` is idempotent: re-running it deletes and recreates the
seeded posts. `cleanup.php` removes posts created by older runs (the `-2`
slug duplicates and the default `hello-world` post).

## Use it from the Next.js app

```bash
# Windows PowerShell
$env:WP_API_URL = "http://localhost:8080"
npm run sync:content
npm run build
Remove-Item Env:\WP_API_URL   # restore offline (seed) mode
```

The sync script fetches `{WP_API_URL}/wp-json/crl/v1/all`, converts it to the
domain module, and writes `src/lib/content.generated.ts`. Without
`WP_API_URL` the generated module just re-exports the bundled seed data.

## Troubleshooting observed locally

- **`/wp-json/crl/v1/all` returns 301 -> homepage HTML**: set pretty
  permalinks (above). The data is fine; it was a redirect, not a 404.
- **Relationship fields (`practiceAreas`, `author`, `practiceArea`) all
  return `hello-world`**: ACF returns `WP_Post` objects (not IDs) from
  relationship fields; PHP casts an object to `(int) 1`. The plugin now maps
  objects via `crl_post_id()` in `includes/rest.php`.
- **Images empty / `photo` field missing**: ACF image fields expect an
  attachment ID or a `{ID, url, alt}` array — a bare `{url, alt}` array is
  treated as empty. Seed with the attachment ID from `wp media import`.
- **`wp_insert_category` / `wp_create_category`**: `wp_insert_category`
  expects `cat_name`/`category_nicename`; `wp_create_category('News')` is the
  simple form used by `seed-content.php`.

## Stop

```bash
docker compose -f cms/local/docker-compose.yml down -v   # -v also drops MySQL data
```