export {};

// Create a type for the roles
export type Roles = 'admin';

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: Roles;
        };
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
