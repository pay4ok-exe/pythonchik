'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { modules, lessons } from '@/lib/lessons-data';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Progress, 
  Button, 
  Badge,
  Chip,
  Avatar,
  Tabs,
  Tab,
  Image,
  Divider,
  Tooltip,
  Breadcrumbs,
  BreadcrumbItem,
  Pagination
} from '@heroui/react';
import { 
  BookOpenIcon, 
  CheckIcon, 
  LockIcon, 
  HomeIcon, 
  RefreshCwIcon,
  TrophyIcon,
  Clock8Icon
} from 'lucide-react';

// Mock function to get user progress (in a real app, this would fetch from backend)
const getUserProgress = () => {
  // Simulate progress for demo purposes
  const progress: {[key: number]: number} = {};
  
  for (let i = 1; i <= lessons.length; i++) {
    // For demo: Earlier lessons have more progress
    if (i <= 3) {
      progress[i] = 100; // Completed lessons
    } else if (i <= 5) {
      progress[i] = Math.floor(Math.random() * 60) + 40; // In progress
    } else if (i <= 7) {
      progress[i] = Math.floor(Math.random() * 40); // Just started
    } else {
      progress[i] = 0; // Not started
    }
  }
  
  return progress;
};

export default function LessonsPage() {
  const t = useTranslations('lesson');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [activeModule, setActiveModule] = useState(modules[0]);
  const [userProgress, setUserProgress] = useState<{[key: number]: number}>({});
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  
  useEffect(() => {
    // Load user progress when component mounts
    setUserProgress(getUserProgress());
  }, []);
  
  // Filter lessons by active module
  const moduleFilteredLessons = lessons.filter(lesson => lesson.moduleId === activeModule.id);
  
  // Pagination logic
  const totalPages = Math.ceil(moduleFilteredLessons.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLessons = moduleFilteredLessons.slice(startIndex, endIndex);
  
  // Function to determine if a lesson is locked (prerequisites not completed)
  const isLessonLocked = (lesson: any) => {
    if (!lesson.prerequisites || lesson.prerequisites.length === 0) {
      return false;
    }
    
    // Check if all prerequisites have 100% progress
    return !lesson.prerequisites.every((prerequisiteId: number) => userProgress[prerequisiteId] === 100);
  };
  
  // Function to determine badge color based on difficulty
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'danger';
      default: return 'default';
    }
  };
  
  // Animation variants for list items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link href="/dashboard">
            <HomeIcon size={16} className="mr-1" />
            Dashboard
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>{t('lessons')}</BreadcrumbItem>
      </Breadcrumbs>
      
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold mb-2">{t('lessons')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('chooseModule')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <h2 className="text-xl font-bold">Modules</h2>
            </CardHeader>
            <CardBody className="p-0">
              <div className="flex flex-col">
                {modules.map((module) => (
                  <Button
                    key={module.id}
                    variant={activeModule.id === module.id ? "solid" : "light"}
                    color={activeModule.id === module.id ? "primary" : "default"}
                    className="justify-start rounded-none h-auto py-4"
                    onPress={() => {
                      setActiveModule(module);
                      setPage(1); // Reset to first page when changing modules
                    }}
                  >
                    <div className="flex flex-col items-start">
                      <div className="font-medium">{module.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {module.lessons.length} {t('totalLessons')}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{activeModule.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{activeModule.description}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {currentLessons.map((lesson) => {
                  const progress = userProgress[lesson.id] || 0;
                  const locked = isLessonLocked(lesson);
                  
                  return (
                    <motion.div key={lesson.id} variants={item}>
                      <Card 
                        className={`hover:shadow-lg transition-shadow ${locked ? 'opacity-70' : ''}`}
                        isPressable={!locked}
                      >
                        <CardBody className="p-0">
                          {/* Lesson header with difficulty indicator */}
                          <div className="p-4 border-b flex justify-between items-center">
                            <div className="flex items-center">
                              {progress === 100 ? (
                                <Avatar
                                  icon={<CheckIcon size={16} />}
                                  classNames={{
                                    base: "bg-success-100 text-success-600 dark:bg-success-900 dark:text-success-200",
                                  }}
                                  size="sm"
                                />
                              ) : locked ? (
                                <Avatar
                                  icon={<LockIcon size={16} />}
                                  classNames={{
                                    base: "bg-default-100 text-default-600 dark:bg-default-700 dark:text-default-300",
                                  }}
                                  size="sm"
                                />
                              ) : (
                                <Avatar
                                  icon={<BookOpenIcon size={16} />}
                                  classNames={{
                                    base: "bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-200",
                                  }}
                                  size="sm"
                                />
                              )}
                              <span className="ml-2 font-medium">{lesson.title}</span>
                            </div>
                            <Badge color={getDifficultyColor(lesson.difficulty)} variant="flat" size="sm">
                              {t(`difficulty.${lesson.difficulty}`)}
                            </Badge>
                          </div>
                          
                          {/* Lesson content */}
                          <div className="p-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                              {lesson.description}
                            </p>
                            
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <Clock8Icon size={14} className="mr-1" />
                                {lesson.duration} {t('lessonTime')}
                              </div>
                              
                              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <TrophyIcon size={14} className="mr-1" />
                                {lesson.steps.length} steps
                              </div>
                            </div>
                            
                            <Progress 
                              value={progress} 
                              color={progress === 100 ? "success" : "primary"} 
                              className="h-1.5 mb-3" 
                            />
                            
                            {progress > 0 && progress < 100 && (
                              <div className="text-xs text-primary dark:text-primary-300 mb-3">
                                {progress}% {t('complete_percent')}
                              </div>
                            )}
                            
                            {locked ? (
                              <Tooltip content="Complete prerequisite lessons first">
                                <div>
                                  <Button
                                    color="default"
                                    className="w-full"
                                    isDisabled
                                  >
                                    <LockIcon size={16} className="mr-2" />
                                    {t('locked')}
                                  </Button>
                                </div>
                              </Tooltip>
                            ) : (
                              <Link href={`/lessons/${lesson.id}`}>
                                <Button
                                  color={progress === 100 ? "success" : progress > 0 ? "secondary" : "primary"}
                                  className="w-full"
                                >
                                  {progress === 100 ? (
                                    <>
                                      <RefreshCwIcon size={16} className="mr-2" />
                                      {t('review')}
                                    </>
                                  ) : progress > 0 ? (
                                    <>
                                      <RefreshCwIcon size={16} className="mr-2" />
                                      {t('continue')}
                                    </>
                                  ) : (
                                    <>
                                      <BookOpenIcon size={16} className="mr-2" />
                                      {t('start')}
                                    </>
                                  )}
                                </Button>
                              </Link>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <Pagination
                    total={totalPages}
                    initialPage={page}
                    onChange={setPage}
                    showControls
                  />
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}