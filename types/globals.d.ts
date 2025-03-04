export {};

// Create a type for the roles
export type Roles = 'admin';

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: Roles;
        };
    }

    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
            CLERK_SECRET_KEY: string;
            TZ: string;
            NEXT_PUBLIC_USE_STRIPE: string;
            NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
            NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID: string;
            STRIPE_ENDPOINT_SECRET: string;
            STRIPE_SECRET_KEY: string;
        }
    }
    namespace JSX {
        interface IntrinsicElements {
            'stripe-pricing-table': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
        }
    }
}
