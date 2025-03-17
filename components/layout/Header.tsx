'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/app/providers';
import { 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle, 
  NavbarMenu, 
  NavbarMenuItem,
  Avatar
} from '@heroui/react';
import { SunIcon, MoonIcon, GlobeIcon, MenuIcon } from 'lucide-react';

export default function Header() {
  const t = useTranslations('navigation');
  const { locale, setLocale } = useLocale();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock user data - In a real app, this would come from auth context
  const user = {
    name: 'Alex Smith',
    avatar: null,
    initials: 'AS',
  };

  useEffect(() => {
    setMounted(true);
    // Mock authentication check - In a real app, this would be from auth state
    const hasSession = localStorage.getItem('session');
    setIsLoggedIn(!!hasSession);
  }, []);

  if (!mounted) return null;

  const navLinks = [
    { href: '/lessons', label: t('lessons') },
    { href: '/playground', label: t('playground') },
    { href: '/achievements', label: t('achievements') },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <Navbar 
      className="shadow-sm"
      maxWidth="xl"
      isBordered
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">PythonChik</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center" className="hidden sm:flex gap-4">
        {navLinks.map((link) => (
          <NavbarItem key={link.href} isActive={isActive(link.href)}>
            <Link href={link.href} className={`text-sm font-medium ${isActive(link.href) ? 'text-primary' : ''}`}>
              {link.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2">
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light" aria-label="Language">
                <GlobeIcon size={20} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Language Selection">
              <DropdownItem
                key="en"
                onPress={() => setLocale('en')}
                startContent={<span className="text-sm">🇺🇸</span>}
                className={locale === 'en' ? 'text-primary' : ''}
              >
                English
              </DropdownItem>
              <DropdownItem
                key="ru"
                onPress={() => setLocale('ru')}
                startContent={<span className="text-sm">🇷🇺</span>}
                className={locale === 'ru' ? 'text-primary' : ''}
              >
                Русский
              </DropdownItem>
              <DropdownItem
                key="kk"
                onPress={() => setLocale('kk')}
                startContent={<span className="text-sm">🇰🇿</span>}
                className={locale === 'kk' ? 'text-primary' : ''}
              >
                Қазақша
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        <NavbarItem>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            aria-label="Toggle Theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </Button>
        </NavbarItem>

        {isLoggedIn ? (
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  name={user.initials}
                  showFallback
                  size="sm"
                  className="cursor-pointer"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions">
                <DropdownItem key="profile">
                  <Link href="/profile" className="w-full">
                    {t('profile')}
                  </Link>
                </DropdownItem>
                <DropdownItem key="dashboard">
                  <Link href="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownItem>
                <DropdownItem key="logout" className="text-danger" color="danger">
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden sm:flex">
              <Link href="/login">
                <Button variant="light" size="sm">{t('login')}</Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/register">
                <Button color="primary" size="sm">{t('register')}</Button>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {navLinks.map((link) => (
          <NavbarMenuItem key={link.href}>
            <Link 
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`w-full ${isActive(link.href) ? 'text-primary' : ''}`}
            >
              {link.label}
            </Link>
          </NavbarMenuItem>
        ))}
        {!isLoggedIn && (
          <NavbarMenuItem className="sm:hidden">
            <Link 
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="w-full"
            >
              {t('login')}
            </Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}