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
  CardFooter,
  Progress, 
  Button,
  Chip,
  Divider,
  Avatar,
  CircularProgress
} from '@heroui/react';
import { 
  BookOpenIcon,
  CheckCircleIcon,
  ClockIcon,
  TrophyIcon,
  CodeIcon,
  GraduationCapIcon,
  BrainIcon,
  RocketIcon,
  FlameIcon,
  ArrowRightIcon,
  HeartIcon
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

// Mock function to get user streak data
const getUserStreak = () => {
  return {
    current: 3,
    longest: 7,
    lastActive: new Date().toISOString()
  };
};

// Mock achievements data
const getAchievements = () => [
  { 
    id: 1, 
    title: 'First Code', 
    description: 'Ran your first Python program', 
    earnedAt: '2025-03-16',
    icon: <CodeIcon />
  },
  { 
    id: 2, 
    title: 'Bug Hunter', 
    description: 'Fixed 5 bugs in your code', 
    earnedAt: '2025-03-17',
    icon: <BrainIcon />
  },
  { 
    id: 3, 
    title: 'Loop Master', 
    description: 'Completed the loops and iterations module',
    earnedAt: '2025-03-18',
    icon: <RocketIcon />
  }
];

export default function Dashboard() {
  const t = useTranslations('dashboard');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [userProgress, setUserProgress] = useState<{[key: number]: number}>({});
  const [streak, setStreak] = useState({ current: 0, longest: 0, lastActive: '' });
  const [achievements, setAchievements] = useState<any[]>([]);
  
  useEffect(() => {
    // Load user progress, streak, and achievements when component mounts
    setUserProgress(getUserProgress());
    setStreak(getUserStreak());
    setAchievements(getAchievements());
  }, []);
  
  // Calculate overall progress across all lessons
  const calculateOverallProgress = () => {
    if (Object.keys(userProgress).length === 0) return 0;
    
    const totalProgress = Object.values(userProgress).reduce((sum, value) => sum + value, 0);
    return Math.round(totalProgress / (lessons.length * 100) * 100);
  };
  
  // Get recent lessons (completed or in progress)
  const getRecentLessons = () => {
    return lessons
      .filter(lesson => userProgress[lesson.id] > 0)
      .sort((a, b) => userProgress[b.id] - userProgress[a.id])
      .slice(0, 3);
  };
  
  // Get recommended next lessons
  const getRecommendedLessons = () => {
    const completedLessonIds = Object.entries(userProgress)
      .filter(([_, progress]) => progress === 100)
      .map(([id]) => parseInt(id));
    
    // Find lessons that have all prerequisites completed but aren't completed themselves
    const recommendedLessons = lessons.filter(lesson => {
      // Skip completed lessons
      if (userProgress[lesson.id] === 100) return false;
      
      // If it has prerequisites, check if they're all completed
      if (lesson.prerequisites && lesson.prerequisites.length > 0) {
        return lesson.prerequisites.every(prereqId => completedLessonIds.includes(prereqId));
      }
      
      // If it doesn't have prerequisites and isn't completed, include it
      return true;
    });
    
    return recommendedLessons.slice(0, 2);
  };
  
  const recentLessons = getRecentLessons();
  const recommendedLessons = getRecommendedLessons();
  const overallProgress = calculateOverallProgress();
  
  // Animation variants
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">{t('welcome')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('readyToContinue')}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Progress overview card */}
          <motion.div variants={item}>
            <Card className="mb-6 overflow-hidden border-none shadow-md">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary/20 to-primary/5"></div>
              <CardHeader className="relative z-10">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">{t('yourProgress')}</h2>
                  <CircularProgress
                    value={overallProgress}
                    color="primary"
                    showValueLabel={true}
                    size="lg"
                    className="mr-4"
                  />
                </div>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col gap-4">
                  {recentLessons.map((lesson) => (
                    <div key={lesson.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{lesson.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{modules.find(m => m.id === lesson.moduleId)?.title}</p>
                        </div>
                        <span className="text-sm font-medium text-primary">{userProgress[lesson.id]}%</span>
                      </div>
                      <Progress
                        value={userProgress[lesson.id]}
                        color={userProgress[lesson.id] === 100 ? "success" : "primary"}
                        className="h-2"
                        aria-label={`${lesson.title} progress`}
                      />
                    </div>
                  ))}
                </div>
              </CardBody>
              <CardFooter>
                <Link href="/lessons" className="text-primary hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium">
                  {t('viewAllLessons')} →
                </Link>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Recommended next steps card */}
          <motion.div variants={item}>
            <Card>
              <CardHeader className="pb-0">
                <h2 className="text-xl font-bold">{t('recommendedNextSteps')}</h2>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendedLessons.map((lesson) => (
                    <Link href={`/lessons/${lesson.id}`} key={lesson.id} className="block">
                      <div className="border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all">
                        <div className="flex items-start mb-2">
                          <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-2 mr-3">
                            <BookOpenIcon size={16} className="text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{lesson.title}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              <Chip size="sm" variant="flat">{modules.find(m => m.id === lesson.moduleId)?.title}</Chip>
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{lesson.description}</p>
                      </div>
                    </Link>
                  ))}
                  
                  {/* Add playground link as an additional option */}
                  <Link href="/playground" className="block">
                    <div className="border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all">
                      <div className="flex items-start mb-2">
                        <div className="bg-secondary-100 dark:bg-secondary-900 rounded-full p-2 mr-3">
                          <CodeIcon size={16} className="text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{t('practiceInPlayground')}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <Chip size="sm" variant="flat" color="secondary">Playground</Chip>
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Apply what you've learned in a sandbox environment</p>
                    </div>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div 
          className="lg:col-span-1"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Streak card */}
          <motion.div variants={item}>
            <Card className="mb-6">
              <CardHeader className="pb-0">
                <h2 className="text-xl font-bold">{t('dailyStreak')}</h2>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="text-5xl font-bold text-primary">{streak.current}</div>
                    <div className="absolute -top-2 -right-2">
                      <FlameIcon size={24} className="text-red-500" />
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">{t('daysInRow')}</p>
                  <p className="text-sm text-center">{t('streakMessage')}</p>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Achievements card */}
          <motion.div variants={item}>
            <Card>
              <CardHeader className="pb-0">
                <h2 className="text-xl font-bold">{t('recentAchievements')}</h2>
              </CardHeader>
              <CardBody>
                {achievements.length > 0 ? (
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-start">
                        <Avatar
                          icon={achievement.icon}
                          color="primary"
                          isBordered
                          className="mr-3"
                        />
                        <div>
                          <h3 className="font-medium">{achievement.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{achievement.description}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {t('earnedOn')} {new Date(achievement.earnedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">{t('noAchievements')}</p>
                )}
              </CardBody>
              <CardFooter>
                <Link href="/achievements" className="text-primary hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium">
                  {t('viewAllAchievements')} →
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}