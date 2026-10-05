# Campus Food Link

Campus Food Link is a campus food ordering interface built with TanStack Start, React, TypeScript, and Tailwind CSS. The code is organized with [Feature-Sliced Design](https://fsd.how/).

## Run locally

Install Node.js and pnpm, then run:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The catalog, menu item details, and vendor menus read their data from PostgreSQL. Search, categories, cart, orders, and the remaining demo screens still use mock data.

## Local database

PostgreSQL runs locally in Docker. Copy `.env.example` to `.env`, then run:

```bash
pnpm db:up
pnpm db:check
```

`db:check` runs `SELECT 1` through the shared Drizzle connection helper. It does not create tables or modify data. `pnpm db:down` stops the container; its named volume preserves the database. The database port is exposed only on localhost.

`.env` contains the local PostgreSQL settings and `DATABASE_URL`. If you change the password or port, update the URL too. PostgreSQL initialization settings apply when the data volume is first created. Keep `.env` untracked; `.env.example` contains development placeholders only.

The `createDatabase` factory in `src/server/db/connection.ts` returns a PostgreSQL client and Drizzle `db`. The check script opens the connection and closes it in `finally`. The auth middleware owns the same lifecycle for auth requests, without sharing sockets across Worker requests. The schema in `src/server/db/schema` contains Better Auth tables in `auth.ts` and the application vendor table in `vendors.ts`. Auth schema generation only updates `auth.ts`.

Drizzle Kit reads `.env` and `drizzle.config.ts`. After adding tables, generate and apply migrations with:

```bash
pnpm db:generate
pnpm db:migrate
```

For production, we will configure Hyperdrive with the Railway database credentials in Cloudflare Dashboard and add its binding to the Worker. Server operations will pass the binding's connection string to the same helper. Other server secrets can be stored as encrypted Worker secrets in the Dashboard. Production hosting and bindings are not configured in this step.

## Demo vendors

After applying migrations, run `pnpm db:seed` to insert Green Bowl, Campus Grill, and Coffee Corner. The seed skips existing slugs, so rerunning it does not duplicate vendors or overwrite changes. Owners are initially `null` and can be assigned manually to a Better Auth user later.

`vendors` uses a numeric identity primary key and a separate unique slug for URLs. Estimated preparation time is stored as minimum/maximum integer minutes, with database checks for a nonnegative, ordered range. Deleting an owner clears the link without deleting the establishment. Categories are not stored on this table.

Only R2 object keys such as `vendors/green-bowl.webp` are stored in `imageKey`. The demo bucket is `campus-food-link-images`; its current public development base URL is `https://pub-92ffa488bd5b4fb3bb2ef1fd2a69af2a.r2.dev`. The base URL is configured as `IMAGE_BASE_URL` in `wrangler.jsonc`. Server functions build public image URLs through `src/server/lib/image-url.server.ts`.

## Menu items

`menu_items` has a numeric identity ID, an indexed vendor foreign key, name, nullable description, R2 image key, integer price in cents, availability flag, and timestamps. A database check rejects negative prices. There is no slug or stock quantity. The foreign key prevents deleting a vendor while its menu items still reference it.

`pnpm db:seed` also inserts the six existing demo menu items, resolving their vendor IDs by slug. Repeated runs skip items with the same vendor and name and leave existing prices and availability unchanged. The old menu mock remains for the demo cart and as seed input. The previous mock-only portion weight is not included in this schema.

`src/server/repositories/menu-items.server.ts` provides available-menu queries and an item lookup joined with its vendor. `getMenuItems` and `getMenuItemById` expose these through authenticated GET server functions in `entities/menu-offering/api`. Query keys, options, and suspense hooks live alongside them; display types are inferred from server function results.

The catalog lists available items. `/menu/$offeringId` uses numeric IDs, returns 404 for invalid or missing IDs, and includes vendor details from the join. Unavailable items remain accessible by their direct URL, with the order button disabled. Ordering itself is still a UI placeholder.

## Vendor lookup

`src/server/repositories/vendors.server.ts` owns the Drizzle lookup. `findVendorBySlug(db, slug)` receives the request's database and returns display fields with `imageKey`, or `null` if the vendor does not exist. It does not manage connections or authentication.

`src/entities/vendor/api/get-vendor-by-slug.ts` exposes `getVendorBySlug` through a GET server function. It validates the slug with Zod and uses `requireSessionMiddleware`, which composes the existing connection/auth middleware and rejects requests without a session. Reading a vendor is available to any authenticated role; owner checks will be added to write operations.

Call it with `getVendorBySlug({ data: { slug: "green-bowl" } })`. The result includes `id`, `slug`, `name`, `imageUrl`, `estimatedMinutesMin`, `estimatedMinutesMax`, and a `menuItems` array, or `null`. The function first finds the vendor, then fetches its available menu items using the same request database connection. Router loaders translate a missing vendor into `notFound()`. The page loader and React hook share query options.

## Vendor queries and SSR

Following the [FSD TanStack Query guide](https://fsd.how/docs/guides/tech/with-react-query/), vendor query options and the `useVendorBySlug` hook live in `entities/vendor/api`. `VendorDetails` is inferred from the server function return type rather than copied into a separate interface.

`getRouter()` creates a new QueryClient and connects it through `setupRouterSsrQueryIntegration`. The integration provides QueryClientProvider and handles SSR dehydration/hydration. The `/vendors/$slug` loader fills the query cache with `query`; `VendorPage` reads the same options through the suspense hook. Queries stay fresh for one minute, avoiding an immediate hydration refetch. The loader waits for fresh data when the cache is stale. Invalidating the query uses the same server function again.

Catalog and menu-item loaders also populate the query cache with `query`; their pages consume the corresponding suspense hooks. The global query default is a one-minute `staleTime`. Query keys are defined centrally for each entity.

Unknown vendors produce a 404. Vendor category chips remain mock data matched by vendor slug. The static Open badge is removed until opening status is implemented. Login, registration, and logout cancel outstanding queries and clear the cache before refreshing router state.

## Authentication

Better Auth uses email/password authentication and the Drizzle adapter. Its schema contains `user`, `session`, `account`, and `verification`. Password hashes are stored in `account`, not `user`. Email verification and social providers are disabled.

Add `BETTER_AUTH_SECRET` (a random secret of at least 32 characters) and `BETTER_AUTH_URL=http://localhost:3000` to your local `.env`. With the database running, apply the migration using `pnpm db:migrate`. Then use `/register` or `/login`. Successful authentication opens the catalog (`/`) for students, `/vendor` for vendors, or `/account` for admins. The account header reads the authenticated user, and Log out ends the session.

Registration only creates a `student`. The `role` field accepts `student`, `vendor`, and `admin`, but API input cannot set or update it. For now, vendor/admin roles are assigned manually in the database. The role is included in the session. Vendor ownership checks will be added with the backend CRUD endpoints.

The `/api/auth/$` route delegates GET/POST requests to Better Auth. Its middleware owns the database connection for the request and closes it in `finally`. The client uses the official React client, including `useSession`, `signUp.email`, `signIn.email`, and `signOut`.

`pnpm auth:generate` regenerates the auth schema from `scripts/auth-schema-config.ts`; review the output before generating migrations. `pnpm typecheck` generates Worker binding types before checking TypeScript. Required server secret names are declared in `wrangler.jsonc`; their values remain in `.env` locally and will be set in Cloudflare for production. Hyperdrive integration remains a separate deployment step.

## Protected routes

The `_app` layout checks the session in `beforeLoad` through the `getSession` server function. Unauthenticated users are redirected to `/login` before child routes load. The `_auth` layout redirects signed-in users away from login/register to their role's home page.

Student route groups contain the catalog, cart, orders, and vendor/menu detail pages. The vendor route group contains the placeholder `/vendor` page. A role mismatch redirects to the user's home page. Desktop and mobile navigation show links for the authenticated role.

`/account` is shared by all roles. Its layout renders the user header and Log out button around an `Outlet`; the index route supplies student highlights/settings and currently leaves vendor/admin content empty. The balance and order history remain mock data.

Route guards control page loading. Future server functions and CRUD endpoints must independently check session, role, and ownership.

## Structure

```text
src/
  app/
    layouts/            # Shared page layouts
    styles/             # Global styles and design tokens
  pages/
    account/            # Account page
    cart/               # Cart review and mock items
    catalog/            # Catalog page and its UI components
    menu-offering/      # Menu offering page and its UI components
    orders/             # Orders page
    vendor/             # Vendor page and its UI components
  widgets/
    app-navigation/     # App navigation
    menu-offering-grid/ # Offering cards shared by catalog and vendor pages
  features/
    navigate-back/      # History-aware back link with a fallback route
  entities/
    menu-offering/      # Menu offering mock data and card
    vendor/             # Vendor mock data and card
  shared/
    assets/              # Reusable static assets
    lib/                 # Reusable, business-agnostic code
    ui/                  # Reusable UI primitives
  server/
    db/                  # PostgreSQL connection helper and database schema
  routes/                # TanStack Start file routes; thin page adapters
  router.tsx             # TanStack Start router entry point
  routeTree.gen.ts       # Generated by TanStack Router; do not edit
```

`app` holds application-wide setup. `pages` compose screens and keep page-specific UI components together. `widgets` hold substantial self-contained sections such as app navigation. `entities` hold business data and presentation. `shared` holds code without business logic. The framework's route files and router entry point remain at their TanStack Start paths. Route files stay thin and import pages directly.

Add `features/<action-name>` when a user-valued interaction is implemented. Keep slices in purpose-based segments such as `ui`, `model`, and `api`. Import the needed file directly; do not add barrel imports. A slice may import from lower layers, but not from another slice in the same layer. Avoid empty layers and placeholder slices until they have a real use.

Use kebab-case for new file names, for example `menu-offering-card.tsx`. Keep filenames required by TanStack Router (`__root.tsx`, `index.tsx`) as conventions.

## Commands

```bash
pnpm typecheck
pnpm check
pnpm build
```
