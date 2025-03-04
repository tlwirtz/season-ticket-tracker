# season-ticket-tracker

⚽️ A small app to manage our extra season ticket. See it [here](https://seasontickets.me)

## Hosting & Deploy

App hosted on Vercel and backed by a Neon SQL database. Auth by Clerk.

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
