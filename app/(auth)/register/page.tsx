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
  CardHeader,
  Input,
  Button,
  Checkbox,
  Divider,
  Image
} from "@heroui/react";
import { 
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  UserIcon,
  UserCheckIcon,
  CodeIcon,
  BadgeCheckIcon,
  AlertCircleIcon
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

  // Form field styling
  const inputClasses = {
    label: "text-foreground font-medium",
    input: [
      "bg-background",
      "text-foreground",
      "placeholder:text-foreground-400",
    ],
    innerWrapper: "bg-background",
    errorMessage: "text-danger font-medium",
    inputWrapper: [
      "shadow-sm",
      "border-2",
      "border-default-200",
      "data-[hover=true]:border-default-400",
      "group-data-[focus=true]:border-primary",
      "rounded-xl"
    ],
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-primary-50 to-background dark:from-primary-950/20 dark:to-background">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto w-full"
      >
        <div className="text-center">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-primary-600 flex items-center justify-center mb-4 shadow-lg shadow-primary-500/20">
              <CodeIcon className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('registerTitle')}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {t('alreadyMember')}{' '}
            <Link href="/login" className="font-medium text-primary hover:text-primary-500">
              {t('signIn')}
            </Link>
          </p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <Card className="shadow-xl border-none bg-background/80 backdrop-blur-sm">
            <CardBody className="p-8">
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-danger-50 dark:bg-danger-900/40 text-danger-700 dark:text-danger-300 text-sm flex items-center">
                  <AlertCircleIcon size={16} className="mr-2 flex-shrink-0" />
                  <span>{error}</span>
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
                    classNames={inputClasses}
                    labelPlacement="outside"
                    isRequired
                    startContent={
                      <UserIcon 
                        className="text-default-400 pointer-events-none flex-shrink-0" 
                        size={16} 
                      />
                    }
                  />
                  
                  <Input
                    label={t('lastName')}
                    placeholder="Doe"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    classNames={inputClasses}
                    labelPlacement="outside"
                    isRequired
                    startContent={
                      <UserIcon 
                        className="text-default-400 pointer-events-none flex-shrink-0" 
                        size={16} 
                      />
                    }
                  />
                </div>
                
                <Input
                  label={t('username')}
                  placeholder="johndoe"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  classNames={inputClasses}
                  labelPlacement="outside"
                  isRequired
                  startContent={
                    <span className="text-default-400 text-sm">@</span>
                  }
                />
                
                <Input
                  label={t('email')}
                  placeholder="john.doe@example.com"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  classNames={inputClasses}
                  labelPlacement="outside"
                  isRequired
                  startContent={
                    <MailIcon 
                      className="text-default-400 pointer-events-none flex-shrink-0" 
                      size={16} 
                    />
                  }
                />
                
                <Input
                  label={t('password')}
                  placeholder="••••••••••"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={isVisible ? "text" : "password"}
                  classNames={inputClasses}
                  labelPlacement="outside"
                  isRequired
                  startContent={
                    <LockIcon 
                      className="text-default-400 pointer-events-none flex-shrink-0" 
                      size={16} 
                    />
                  }
                  endContent={
                    <button 
                      type="button" 
                      onClick={toggleVisibility}
                      className="text-default-400 hover:text-default-600 focus:outline-none"
                    >
                      {isVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                    </button>
                  }
                />
                
                <Input
                  label={t('confirmPassword')}
                  placeholder="••••••••••"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type={isVisible ? "text" : "password"}
                  classNames={inputClasses}
                  labelPlacement="outside"
                  isRequired
                  startContent={
                    <LockIcon 
                      className="text-default-400 pointer-events-none flex-shrink-0" 
                      size={16} 
                    />
                  }
                />
                
                <Checkbox
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  size="sm"
                  color="primary"
                  className="mt-2"
                >
                  <div className="text-sm text-default-700 dark:text-default-300">
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
                  className="w-full h-12 font-semibold text-md"
                  radius="lg"
                  isLoading={isLoading}
                  startContent={!isLoading && <UserCheckIcon size={16} />}
                >
                  {t('signUp')}
                </Button>
              </form>
              
              <Divider className="my-6" />
              <div className="text-center text-default-500 text-sm mb-4">OR</div>
              
              <div className="flex flex-col gap-3">
                <Button
                  variant="flat"
                  className="h-12"
                  radius="lg"
                  startContent={
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M17.2128 9.21693C17.2128 8.58193 17.1578 7.98526 17.0588 7.41693H9.08887V10.5169H13.7039C13.5059 11.4836 12.9268 12.2836 12.0602 12.8169V14.8336H14.8312C16.4352 13.3669 17.2128 11.5003 17.2128 9.21693Z" fill="#4285F4"/>
                      <path d="M9.08863 17.3336C11.3853 17.3336 13.3136 16.5836 14.8309 14.8336L12.0599 12.8169C11.3299 13.3169 10.3416 13.6169 9.08863 13.6169C6.9283 13.6169 5.10863 12.1669 4.44863 10.2003H1.59863V12.2836C3.10697 15.3003 5.8783 17.3336 9.08863 17.3336Z" fill="#34A853"/>
                      <path d="M4.44889 10.2003C4.28889 9.70029 4.19889 9.16696 4.19889 8.61696C4.19889 8.06696 4.29889 7.53363 4.44889 7.03363V4.95029H1.59889C1.04889 6.00029 0.738892 7.26696 0.738892 8.61696C0.738892 9.96696 1.04889 11.2336 1.59889 12.2836L4.44889 10.2003Z" fill="#FBBC05"/>
                      <path d="M9.08863 3.61694C10.3553 3.61694 11.4836 4.03361 12.3719 4.88361L14.8503 2.40528C13.3136 0.96694 11.3853 0.166943 9.08863 0.166943C5.8783 0.166943 3.10697 2.20027 1.59863 5.21694L4.44863 7.30028C5.10863 5.33361 6.9283 3.61694 9.08863 3.61694Z" fill="#EA4335"/>
                    </svg>
                  }
                >
                  Sign up with Google
                </Button>
                
                <Button
                  variant="flat"
                  className="h-12"
                  radius="lg"
                  startContent={
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M18 9C18 4.03125 13.9688 0 9 0C4.03125 0 0 4.03125 0 9C0 13.5 3.28125 17.2188 7.59375 17.8875V11.625H5.34375V9H7.59375V7.03125C7.59375 4.78125 8.93125 3.5625 10.9875 3.5625C11.9812 3.5625 13.0125 3.75 13.0125 3.75V5.9625H11.8875C10.7812 5.9625 10.4062 6.675 10.4062 7.40625V9H12.9L12.4688 11.625H10.4062V17.8875C14.7188 17.2188 18 13.5 18 9Z" fill="#1877F2"/>
                      <path d="M12.4688 11.625L12.9 9H10.4062V7.40625C10.4062 6.675 10.7812 5.9625 11.8875 5.9625H13.0125V3.75C13.0125 3.75 11.9812 3.5625 10.9875 3.5625C8.93125 3.5625 7.59375 4.78125 7.59375 7.03125V9H5.34375V11.625H7.59375V17.8875C8.5452 18.0371 9.45479 18.0371 10.4062 17.8875V11.625H12.4688Z" fill="white"/>
                    </svg>
                  }
                >
                  Sign up with Facebook
                </Button>
              </div>
            </CardBody>
          </Card>

          <p className="mt-6 text-center text-xs text-gray-600 dark:text-gray-400">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}