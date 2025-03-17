"use client";

import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Providers } from "./providers";
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize theme from localStorage or default to system
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the window object
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers>
          {mounted && (
            <>
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </>
          )}
        </Providers>
      </body>
    </html>
  );
}