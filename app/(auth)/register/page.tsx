'use client';

import React, { useState } from "react";
import Link from 'next/link';
import { Form, Input, Button, Card, CardHeader, CardBody, CardFooter } from "@heroui/react";

export default function Register() {
  const [formAction, setFormAction] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement));
    console.log('Registration attempt', data);
    setFormAction(`submit ${JSON.stringify(data)}`);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardBody>
            <Form 
              className="flex flex-col gap-4" 
              onSubmit={handleSubmit}
              onReset={() => setFormAction("reset")}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  isRequired
                  errorMessage="Please enter your first name"
                  label="First Name"
                  labelPlacement="outside"
                  name="firstName"
                  placeholder="Enter your first name"
                />

                <Input
                  isRequired
                  errorMessage="Please enter your last name"
                  label="Last Name"
                  labelPlacement="outside"
                  name="lastName"
                  placeholder="Enter your last name"
                />
              </div>

              <Input
                isRequired
                errorMessage="Please enter a valid username"
                label="Username"
                labelPlacement="outside"
                name="username"
                placeholder="Choose a username"
              />

              <Input
                isRequired
                errorMessage="Please enter a valid email"
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Enter your email"
                type="email"
              />

              <Input
                isRequired
                errorMessage="Password must be at least 8 characters"
                label="Password"
                labelPlacement="outside"
                name="password"
                placeholder="Create a password"
                type="password"
              />

              <Input
                isRequired
                errorMessage="Passwords do not match"
                label="Confirm Password"
                labelPlacement="outside"
                name="confirmPassword"
                placeholder="Confirm your password"
                type="password"
              />

              <div className="flex items-center">
                <Input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="terms" className="ml-3 block text-sm leading-6 text-gray-900">
                  I agree to the <Link href="/terms" className="text-indigo-600 hover:text-indigo-500">Terms of Service</Link> and <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</Link>
                </label>
              </div>

              <div className="flex gap-2 mt-4">
                <Button color="primary" type="submit" className="w-full">
                  Sign up
                </Button>
              </div>
            </Form>
          </CardBody>
          <CardFooter>
            <p className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}