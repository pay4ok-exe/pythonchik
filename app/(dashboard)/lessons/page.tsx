'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardBody, CardHeader, Progress, Button, Badge } from '@heroui/react';

export default function Lessons() {
  // Mock data - would come from API or database in real app
  const modules = [
    {
      id: 1,
      title: 'Python Basics',
      description: 'Learn the fundamentals of Python programming',
      lessons: [
        { id: 1, title: 'Introduction to Python', difficulty: 'Beginner', completed: true },
        { id: 2, title: 'Variables and Data Types', difficulty: 'Beginner', completed: true },
        { id: 3, title: 'Control Flow', difficulty: 'Beginner', completed: false },
        { id: 4, title: 'Functions', difficulty: 'Beginner', completed: false },
        { id: 5, title: 'Lists and Loops', difficulty: 'Beginner', completed: false },
      ]
    },
    {
      id: 2,
      title: 'Intermediate Python',
      description: 'Take your Python skills to the next level',
      lessons: [
        { id: 6, title: 'Dictionaries and Sets', difficulty: 'Intermediate', completed: false },
        { id: 7, title: 'File Handling', difficulty: 'Intermediate', completed: false },
        { id: 8, title: 'Error Handling', difficulty: 'Intermediate', completed: false },
        { id: 9, title: 'Object-Oriented Programming', difficulty: 'Intermediate', completed: false },
      ]
    },
    {
      id: 3,
      title: 'Fun Projects',
      description: 'Apply your skills with creative coding projects',
      lessons: [
        { id: 10, title: 'Build a Simple Game', difficulty: 'Intermediate', completed: false },
        { id: 11, title: 'Create a Calculator', difficulty: 'Beginner', completed: false },
        { id: 12, title: 'Build a Weather App', difficulty: 'Advanced', completed: false },
      ]
    }
  ];

  // Active module state (default to first module)
  const [activeModule, setActiveModule] = useState(modules[0]);

  // Calculate module completion percentage
  const getModuleProgress = (moduleId: any) => {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return 0;
    
    const totalLessons = module.lessons.length;
    const completedLessons = module.lessons.filter(lesson => lesson.completed).length;
    return Math.round((completedLessons / totalLessons) * 100);
  };

  // Function to determine badge color based on difficulty
  const getDifficultyColor = (difficulty: any) => {
    switch(difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Lessons</h1>
        <p className="text-gray-600">Choose a module to start learning Python</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="space-y-4">
            {modules.map((module) => (
              <Card 
                key={module.id} 
                className={`cursor-pointer hover:border-indigo-500 transition-all ${activeModule.id === module.id ? 'border-indigo-500 shadow-md' : ''}`}
                onClick={() => setActiveModule(module)}
              >
                <CardBody className="p-4">
                  <h3 className="font-medium mb-1">{module.title}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">{module.lessons.length} lessons</span>
                    <span className="text-xs font-medium">{getModuleProgress(module.id)}% complete</span>
                  </div>
                  <Progress
                    value={getModuleProgress(module.id)}
                    color="primary"
                    className="h-1"
                    aria-label={`${module.title} progress`}
                  />
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">{activeModule.title}</h2>
              <p className="text-gray-600">{activeModule.description}</p>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y">
                {activeModule.lessons.map((lesson) => (
                  <div key={lesson.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 ${lesson.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                          {lesson.completed ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          ) : (
                            <span className="text-xs">{lesson.id}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{lesson.title}</h3>
                          <div className="flex items-center mt-1">
                            <Badge color={getDifficultyColor(lesson.difficulty)} className="mr-2">
                              {lesson.difficulty}
                            </Badge>
                            <span className="text-xs text-gray-500">~15 minutes</span>
                          </div>
                        </div>
                      </div>
                      <Link href={`/lessons/${lesson.id}`}>
                        <Button color={lesson.completed ? 'secondary' : 'primary'} size="sm">
                          {lesson.completed ? 'Review' : 'Start'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}