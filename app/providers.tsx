'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { HeroUIProvider } from '@heroui/react';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import { locales } from '@/lib/locales';

// Create a context for locale management
type LocaleContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  messages: any;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  setLocale: () => {},
  messages: locales.en,
});

export const useLocale = () => useContext(LocaleContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState('en');
  const [messages, setMessages] = useState(locales.en);

  useEffect(() => {
    // Get saved locale from localStorage or default to 'en'
    const savedLocale = localStorage.getItem('locale') || 'en';
    setLocale(savedLocale);
    setMessages(locales[savedLocale as keyof typeof locales] || locales.en);
  }, []);

  const handleSetLocale = (newLocale: string) => {
    setLocale(newLocale);
    setMessages(locales[newLocale as keyof typeof locales] || locales.en);
    localStorage.setItem('locale', newLocale);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale, messages }}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <HeroUIProvider>
            {children}
          </HeroUIProvider>
        </NextIntlClientProvider>
      </LocaleContext.Provider>
    </ThemeProvider>
  );
}