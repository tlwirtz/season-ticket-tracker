import { SignedIn, SignedOut } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Matches from '../matches/page';

export default function Home() {
    const matchRedirect = () => redirect('/matches');
    return (
        <>
            <SignedOut>
                <Matches />
            </SignedOut>
            <SignedIn>
                <Matches />
            </SignedIn>
        </>
    );
}
