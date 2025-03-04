import type { Metadata, Viewport } from 'next';

import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import Script from 'next/script';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './globals.css';
import '../../styles/index.css';
import '../../styles/Colors.css';
import '../../styles/App.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Seattle Sounders Match Finder',
    description: 'Grab some Seattle Sounders FC tickets!'
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    <Script src="https://js.stripe.com/v3/pricing-table.js" />
                    <NavBar />
                    {children}
                    <Footer />
                </body>
            </html>
        </ClerkProvider>
    );
}
