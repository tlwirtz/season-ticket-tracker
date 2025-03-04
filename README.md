# season-ticket-tracker

⚽️ A small app to manage our extra season ticket. See it [here](https://seasontickets.me)

## Hosting & Deploy

App in Next.js and hosted on Vercel. Backed by a Neon SQL database. Auth by Clerk.

## Running Locally

### Prereqs

Before running locally, you'll need a few things setup:

1. A [Clerk Auth](https://clerk.com) account and API keys.
2. A SQL database. I'm using [Neon](https://neon.tech), but you can use whatever you want.
3. A [Stripe](https://stripe.com) account an API keys, if you want to go down that route. Right now the app is configured to use Stripe's no-code embedded pricing table, although that might change in the future.

### Installing + Building

The app is built on [Next.js](https://nextjs.org). You'll need to configure the following environment variables in your `.env.local` file.

```bash
DATABASE_URL=[[DATABASE URL]]
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=[[CLERK_PUBLISHABLE_KEY]]
CLERK_SECRET_KEY=[[CLERK_SECRET_KEY]]
NEXT_PUBLIC_USE_STRIPE=false #switch to true to turn on Stripe integration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[[STRIPE_PUBLISHABLE_KEY]]
NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID=[[STRIPE_PRICING_TABLE_ID]]
STRIPE_SECRET_KEY=[[STRIPE_SECRET_KEY]]
STRIPE_ENDPOINT_SECRET=[[STRIPE_ENDPOINT_SECRET]]
```

Install

```bash
npm install
```

Seed database with demo data. We use `faker-js` to generate random data.

```bash
npm run db:seed
```

Run Dev Locally

```bash
npm run dev
```

## Update Database Schema

The database schema is handled by [Drizzle ORM](https://orm.drizzle.team/docs/overview). To modify the database schema, make your changes in the `./db/schema.ts` file and then generate a migration.

```bash
npm run db:generate
```

This will generate migration SQL in the `./migrations/` directory. You should commit these into source code. Drizzle will detect which migrations have run and apply anything that's missing. To apply a migration:

```bash
npm run db:migrate
```

At the moment, all migrations have to be run manually. There is no automatic migration runner. 

## Testing the Checkout Webhook

When a customer purchases tickets through Stripe, a webhook is sent to `/api/stripe/webhook/` and we process the purchase and tie it to the user.

You can test this logic locally via the Stripe CLI.

1. First run `npm run stripe:listen` which will run the Stripe CLI and listen for any incoming webhook events.
2. Running the command from step one will provide you with a temporary `webhookSecret`. Save this secret and paste it into the `.env.local` file.
3. In another terminal, start the application with `npm run dev`.
4. In a third terminal, use the Stripe CLI to trigger the webhook even we listen for:

```bash
stripe trigger checkout.session.completed \
--add checkout_session:client_reference_id=[[MATCH_ID]] \            
--add checkout_session:customer_email="[[EMAIL_ADDRESS]]" \
--override payment_method:"billing_details[email]"="[[EMAIL_ADDRESS]]"
```

### Testing a Preview Deploy on Vercel

When deploying to a Vercel preview environment, you'll need to turn off "Vercel Authentication" for the project. Vercel Authentication protects non-production environments and requires visitors to be logged into a Vercel account and part of our organization. Obviously, requests from Stripe won't have any type of authentication and we can't add custom headers to the Stripe request.

Also, every deploy to vercel gets a unique domain, which means we need to update our webhook endpoint in Stripe after a deploy to a non-production environment.
