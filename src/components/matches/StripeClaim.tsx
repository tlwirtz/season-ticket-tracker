'use client';
import { FC } from 'react';
import { useUser } from '@clerk/nextjs';

interface StripCheckoutProps {
    matchId: number;
}

const StripeCheckout: FC<StripCheckoutProps> = ({ matchId }) => {
    const pricingTableId: string | null = process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID ?? null;
    const publishableKey: string | null = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? null;
    const { isSignedIn, user, isLoaded } = useUser();

    if (!isLoaded) {
        return <div>Loading</div>;
    }
    if (!pricingTableId || !publishableKey) {
        console.error('Stripe keys not configured');
        return <></>;
    }

    if (!isSignedIn) {
        console.error('no user found');
        return <></>;
    }

    if (!user || user.emailAddresses.length <= 0) {
        console.error('user found, but no email was attached to the account');
        return <></>;
    }

    return (
        <stripe-pricing-table
            pricing-table-id={`${pricingTableId}`}
            publishable-key={`${publishableKey}`}
            customer-email={`${user.emailAddresses[0].emailAddress}`}
            client-reference-id={`${matchId}`}
        ></stripe-pricing-table>
    );
};

export default StripeCheckout;
