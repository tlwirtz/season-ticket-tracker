// import Image from "next/image";
import { SignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

//todo -- we should probably refactor this to be a landing page
//todo -- where users can click a button to login and then be redirected to the matches page
export default function Home() {
    return (
        <>
            <SignedOut>
                <SignIn forceRedirectUrl="/matches" />
            </SignedOut>
            <SignedIn>{redirect('/matches')}</SignedIn>
        </>
    );
}
