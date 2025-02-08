import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider, SignedIn } from '@clerk/nextjs';
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

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    //todo -- need to style all the login/logout stuff
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    <NavBar />
                    {children}
                    <Footer />
                </body>
            </html>
        </ClerkProvider>
    );
}
