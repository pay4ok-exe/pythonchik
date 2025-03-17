'use client';

import React, { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { 
  Card,
  CardBody,
  CardFooter,
  Input,
  Button,
  Checkbox,
  Divider
} from "@heroui/react";
import { 
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  UserIcon,
  UserCheckIcon,
  CodeIcon
} from 'lucide-react';

export default function Register() {
  const t = useTranslations('auth');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!formData.terms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      // In a real app, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful registration (just for demo)
      localStorage.setItem('session', 'true');
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 mb-4">
            <CodeIcon className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-center text-2xl font-bold tracking-tight">
            {t('registerTitle')}
          </h2>
        </motion.div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardBody className="p-6">
              {error && (
                <div className="mb-4 p-3 rounded bg-danger-100 dark:bg-danger-900 text-danger-700 dark:text-danger-300 text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label={t('firstName')}
                    placeholder="John"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    isRequired
                  />
                  
                  <Input
                    label={t('lastName')}
                    placeholder="Doe"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    isRequired
                  />
                </div>
                
                <Input
                  label={t('username')}
                  placeholder="johndoe"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  startContent={<UserIcon size={16} />}
                  isRequired
                />
                
                <Input
                  label={t('email')}
                  placeholder="you@example.com"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  startContent={<MailIcon size={16} />}
                  isRequired
                />
                
                <Input
                  label={t('password')}
                  placeholder="••••••••"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={isVisible ? "text" : "password"}
                  startContent={<LockIcon size={16} />}
                  endContent={
                    <button 
                      type="button" 
                      onClick={toggleVisibility}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      {isVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                    </button>
                  }
                  isRequired
                />
                
                <Input
                  label={t('confirmPassword')}
                  placeholder="••••••••"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type={isVisible ? "text" : "password"}
                  startContent={<LockIcon size={16} />}
                  isRequired
                />
                
                <Checkbox
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  size="sm"
                >
                  <div className="text-sm">
                    {t('agreeTerms').split(' and ')[0]}{' '}
                    <Link href="/terms" className="text-primary hover:underline">
                      {t('terms')}
                    </Link>
                    {' and '}
                    <Link href="/privacy" className="text-primary hover:underline">
                      {t('privacy')}
                    </Link>
                  </div>
                </Checkbox>

                <Button 
                  type="submit" 
                  color="primary" 
                  className="w-full"
                  isLoading={isLoading}
                  startContent={!isLoading && <UserCheckIcon size={16} />}
                >
                  {t('signUp')}
                </Button>
              </form>
              
              <Divider className="my-6" />
              
              <div className="flex justify-center gap-4">
                <Button
                  variant="flat"
                  startContent={
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  }
                >
                  Google
                </Button>
                
                <Button
                  variant="flat"
                  startContent={
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
                      />
                    </svg>
                  }
                >
                  Facebook
                </Button>
              </div>
            </CardBody>
            
            <CardFooter className="border-t bg-gray-50 dark:bg-gray-900 p-6">
              <div className="flex justify-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('alreadyMember')}{' '}
                  <Link
                    href="/login"
                    className="font-medium text-primary hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {t('signIn')}
                  </Link>
                </p>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}