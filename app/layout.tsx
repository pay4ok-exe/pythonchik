"use client" 

import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {Providers} from "./providers";

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
            <Providers>
              <main className="flex-grow">{children}</main>
            </Providers>
          <Footer />
        </div>
      </body>
    </html>
  );
}