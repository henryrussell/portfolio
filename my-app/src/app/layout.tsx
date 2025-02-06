import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; //downloads the font during the build process - faster
import './globals.css';
import RootLayoutContent from './components/RootLayoutContent';

const inter = Inter({ subsets: ['latin'] }); //this tells nextjs which character subsets of the font to include

//meta data for the website - will appear as tab name
export const metadata: Metadata = {
  title: 'Hire Henry - Portfolio',
  description: 'Welcome to my website. Developed with nextjs, react and fuck knows what else.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* apply the inter font to the whole <body> of the HTML */}
      <body className={inter.className}>
        <RootLayoutContent>
          {children}
        </RootLayoutContent>
      </body> 
    </html>
  );
}
