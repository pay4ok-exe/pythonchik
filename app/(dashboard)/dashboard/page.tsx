'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardBody, CardHeader, CardFooter, Progress } from '@heroui/react';

export default function Dashboard() {
  // Mock data - would come from API or database in real app
  const recentLessons = [
    { id: 1, title: 'Introduction to Python', progress: 100, module: 'Basics' },
    { id: 2, title: 'Variables and Data Types', progress: 75, module: 'Basics' },
    { id: 3, title: 'Control Flow', progress: 30, module: 'Basics' },
  ];

  const achievements = [
    { id: 1, title: 'First Code', description: 'Ran your first Python program', earnedAt: '2025-03-14' },
    { id: 2, title: 'Bug Hunter', description: 'Fixed 5 bugs in your code', earnedAt: '2025-03-15' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-gray-600">Ready to continue your coding adventure?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader className="pb-0">
              <h2 className="text-xl font-bold">Your Progress</h2>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-4">
                {recentLessons.map((lesson) => (
                  <div key={lesson.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{lesson.title}</h3>
                        <p className="text-sm text-gray-500">{lesson.module}</p>
                      </div>
                      <span className="text-sm font-medium text-indigo-600">{lesson.progress}%</span>
                    </div>
                    <Progress
                      value={lesson.progress}
                      color="primary"
                      className="h-2"
                      aria-label={`${lesson.title} progress`}
                    />
                  </div>
                ))}
              </div>
            </CardBody>
            <CardFooter>
              <Link href="/lessons" className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                View all lessons →
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-0">
              <h2 className="text-xl font-bold">Recommended Next Steps</h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/lessons/4" className="block">
                  <div className="border rounded-lg p-4 hover:border-indigo-500 hover:shadow-md transition-all">
                    <h3 className="font-medium mb-2">Functions in Python</h3>
                    <p className="text-sm text-gray-500">Learn how to create reusable blocks of code</p>
                  </div>
                </Link>
                <Link href="/playground" className="block">
                  <div className="border rounded-lg p-4 hover:border-indigo-500 hover:shadow-md transition-all">
                    <h3 className="font-medium mb-2">Practice in Playground</h3>
                    <p className="text-sm text-gray-500">Apply what you've learned in a sandbox environment</p>
                  </div>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader className="pb-0">
              <h2 className="text-xl font-bold">Recent Achievements</h2>
            </CardHeader>
            <CardBody>
              {achievements.length > 0 ? (
                achievements.map((achievement) => (
                  <div key={achievement.id} className="mb-4 last:mb-0">
                    <div className="flex items-start">
                      <div className="bg-indigo-100 rounded-full p-2 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                          <path d="M12 15c2.21 0 4-1.79 4-4 0-2.21-1.79-4-4-4-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4z" />
                          <path d="M8 9V1h8v8" />
                          <path d="M8 23v-8h8v8" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-gray-500">{achievement.description}</p>
                        <p className="text-xs text-gray-400 mt-1">Earned on {new Date(achievement.earnedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No achievements yet. Start learning to earn some!</p>
              )}
            </CardBody>
            <CardFooter>
              <Link href="/achievements" className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                View all achievements →
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-0">
              <h2 className="text-xl font-bold">Daily Streak</h2>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-indigo-600 mb-2">3</div>
                <p className="text-gray-500 mb-4">days in a row</p>
                <p className="text-sm text-center">Come back tomorrow to keep your streak going!</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}