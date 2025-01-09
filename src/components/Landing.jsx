import { SignInButton } from '@clerk/nextjs';

export default function Landing() {
    return (
        <div>
            <h2>Hello, Landing!</h2>
            <SignInButton
                className="action-button claim-ticket-button"
                forceRedirectUrl="/matches"
            />
        </div>
    );
}
