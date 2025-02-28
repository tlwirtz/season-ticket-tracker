'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UserButton, useUser, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import '../../styles/NavBar.css';
import '../../styles/Colors.css';

//todo -- this needs a lot of love to add links back in, but functionally works.
export default function NavBar() {
    const [hideNav, setHideNav] = useState(false);
    const [innerWidth, setInnerWidth] = useState();

    const { user } = useUser();

    function windowResize() {
        const { innerWidth } = window;
        setHideNav(innerWidth < 660);
        setInnerWidth(innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', windowResize);
        return () => window.removeEventListener('resize', windowResize);
    }, []);

    return (
        <div className="nav-bar-container p-6 sm:p-6">
            <div className="nav-bar-item nav-bar-heading">
                <Link href="/">
                    <h1 className="nav-bar-title py-1">Match Finder</h1>
                </Link>
                <h3 className="nav-bar-subheading soft-grey-text">
                    Seattle Sounders {new Date(Date.now()).getFullYear()} Season
                </h3>
            </div>

            <div className="nav-bar-group">
                <div className="nav-bar-item">
                    <Link href="/">
                        <div className="nav-link">Home</div>
                    </Link>
                </div>
                <div className="nav-bar-item">
                    <Link href="/about">
                        <div className="nav-link">About</div>
                    </Link>
                </div>
                <SignedIn>
                    <div className="nav-bar-item">
                        <Link href="/profile">
                            <div className="nav-link">My Matches</div>
                        </Link>
                    </div>
                    {user && user.publicMetadata.role === 'admin' ? (
                        <div className="nav-bar-item">
                            <Link href="/admin">
                                <div className="nav-link">Admin</div>
                            </Link>
                        </div>
                    ) : null}
                    <div className="nav-bar-item">
                        <UserButton />
                    </div>
                </SignedIn>
                <SignedOut>
                    <div className="nav-bar-item">
                        <SignInButton
                            className="action-button claim-ticket-button"
                            forceRedirectUrl="/matches"
                        />
                    </div>
                </SignedOut>
            </div>
        </div>
    );
}
