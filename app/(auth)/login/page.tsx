'use client';

import React, { useState } from "react";
import Link from 'next/link';
import { Form, Input, Button, Card, CardHeader, CardBody, CardFooter } from "@heroui/react";

export default function Login() {
  const [formAction, setFormAction] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement));
    console.log('Login attempt', data);
    setFormAction(`submit ${JSON.stringify(data)}`);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Log in to your account
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
                errorMessage="Please enter your password"
                label="Password"
                labelPlacement="outside"
                name="password"
                placeholder="Enter your password"
                type="password"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button color="primary" type="submit" className="w-full">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
          <CardFooter>
            <p className="text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Sign up now
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}