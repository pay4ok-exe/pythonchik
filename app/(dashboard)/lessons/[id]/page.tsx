'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { lessons } from '@/lib/lessons-data';
import { 
  Button, 
  Card, 
  CardBody, 
  CardFooter, 
  CardHeader,
  Progress,
  Chip,
  Divider,
  Tooltip,
  Accordion,
  AccordionItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@heroui/react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  CheckCircleIcon, 
  AlertCircleIcon,
  HelpCircleIcon,
  HomeIcon,
  BookOpenIcon,
  LightbulbIcon,
  AwardIcon,
  RefreshCwIcon
} from 'lucide-react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Mock function to save progress (in a real app, this would connect to a backend)
const saveProgress = (lessonId: number, stepId: number, completed: boolean) => {
  const key = `lesson_${lessonId}_progress`;
  const progress = JSON.parse(localStorage.getItem(key) || '{}');
  progress[stepId] = completed;
  localStorage.setItem(key, JSON.stringify(progress));
};

// Mock function to get saved progress
const getProgress = (lessonId: number) => {
  const key = `lesson_${lessonId}_progress`;
  return JSON.parse(localStorage.getItem(key) || '{}');
};

// Create confetti effect
const createConfetti = () => {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDelay = Math.random() * 3 + 's';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    document.body.appendChild(confetti);
    
    // Clean up after animation completes
    setTimeout(() => {
      document.body.removeChild(confetti);
    }, 3000);
  }
};

export default function LessonDetail() {
  const { id } = useParams();
  const router = useRouter();
  const t = useTranslations('lesson');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const lessonId = parseInt(id as string);
  const lesson = lessons.find(l => l.id === lessonId);
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{[key: number]: string}>({});
  const [codeOutputs, setCodeOutputs] = useState<{[key: number]: string}>({});
  const [completedSteps, setCompletedSteps] = useState<{[key: number]: boolean}>({});
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Load saved progress when component mounts
    const savedProgress = getProgress(lessonId);
    setCompletedSteps(savedProgress);
    
    // Calculate which step to start on (first incomplete step or first step)
    const stepIds = lesson?.steps.map(s => s.id) || [];
    const firstIncompleteStep = stepIds.find(id => !savedProgress[id]);
    const startStepIndex = firstIncompleteStep 
      ? lesson?.steps.findIndex(s => s.id === firstIncompleteStep) || 0
      : 0;
    
    setCurrentStepIndex(startStepIndex);
  }, [lessonId, lesson]);

  if (!lesson) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
        <Link href="/lessons">
          <Button color="primary">
            <BookOpenIcon size={16} className="mr-2" />
            Back to Lessons
          </Button>
        </Link>
      </div>
    );
  }

  const currentStep = lesson.steps[currentStepIndex];
  const isLastStep = currentStepIndex === lesson.steps.length - 1;
  const progress = Math.round(((currentStepIndex + 1) / lesson.steps.length) * 100);
  
  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setShowHint(false);
      setShowSolution(false);
      setIsSuccess(false);
      setIsError(false);
    }
  };

  const handleNext = () => {
    // Mark current step as completed
    const newCompletedSteps = { ...completedSteps, [currentStep.id]: true };
    setCompletedSteps(newCompletedSteps);
    saveProgress(lessonId, currentStep.id, true);
    
    if (currentStepIndex < lesson.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setShowHint(false);
      setShowSolution(false);
      setIsSuccess(false);
      setIsError(false);
    } else {
      // Show completion modal for last step
      onOpen();
      createConfetti();
    }
  };

  const handleCodeChange = (value: string, stepId: number) => {
    setUserAnswers({...userAnswers, [stepId]: value});
  };

  const handleRunCode = (stepId: number) => {
    const step = lesson.steps.find(s => s.id === stepId);
    if (!step || !userAnswers[stepId]) return;

    try {
      // In a real implementation, this would run the code and return the output
      // Here we're just simulating output
      let output = "Program executed successfully!";
      
      // Simple output simulation based on expected keywords in the code
      if (userAnswers[stepId].includes('print(')) {
        const printMatches = userAnswers[stepId].match(/print\((.*?)\)/g) || [];
        output = printMatches.map(match => {
          const content = match.substring(6, match.length - 1);
          return eval(`\`\${${content}}\``);
        }).join('\n');
      }
      
      setCodeOutputs({...codeOutputs, [stepId]: output});
      
      // Check if code meets the expected output if specified
      if (step.expectedOutput && output.trim() === step.expectedOutput.trim()) {
        setIsSuccess(true);
        setIsError(false);
      } else if (step.expectedOutput) {
        setIsError(true);
        setIsSuccess(false);
      }
    } catch (error) {
      setCodeOutputs({...codeOutputs, [stepId]: `Error: ${error}`});
      setIsError(true);
      setIsSuccess(false);
    }
  };

  const handleQuizAnswer = (selectedOption: number) => {
    const step = lesson.steps[currentStepIndex];
    if (step.type !== 'quiz' || !step.options) return;
    
    const isCorrect = step.options[selectedOption].correct;
    setUserAnswers({...userAnswers, [step.id]: selectedOption.toString()});
    
    if (isCorrect) {
      setIsSuccess(true);
      setIsError(false);
    } else {
      setIsError(true);
      setIsSuccess(false);
    }
  };

  const handleCheckAnswer = () => {
    const step = lesson.steps[currentStepIndex];
    if (!step || !userAnswers[step.id]) {
      setIsError(true);
      return;
    }

    // For challenges, check against the solution if available
    if (step.type === 'challenge' && step.solution) {
      // This is a simplified check - in a real app, you would need more sophisticated comparison
      const userCode = userAnswers[step.id].replace(/\s+/g, '');
      const solutionCode = step.solution.replace(/\s+/g, '');
      
      if (userCode.includes(solutionCode) || solutionCode.includes(userCode)) {
        setIsSuccess(true);
        setIsError(false);
      } else {
        setIsError(true);
        setIsSuccess(false);
      }
    }
  };

  const renderCodeEditor = (step: any) => {
    return (
      <div className="space-y-4">
        {/* Code editor */}
        <div className="relative">
          <textarea
            className="w-full h-64 font-mono text-sm p-2 border rounded"
            value={userAnswers[step.id] || step.codeTemplate || ''}
            onChange={(e) => handleCodeChange(e.target.value, step.id)}
          />
          
          <div className="flex justify-between mt-2">
            <div>
              {step.hints && (
                <Tooltip content={showHint ? step.hints[0] : t('hint')}>
                  <Button 
                    color="secondary" 
                    variant="flat" 
                    size="sm"
                    onClick={() => setShowHint(!showHint)}
                  >
                    <LightbulbIcon size={16} className="mr-1" />
                    {t('hint')}
                  </Button>
                </Tooltip>
              )}
              
              {step.solution && (
                <Button 
                  color="secondary" 
                  variant="flat" 
                  size="sm"
                  className="ml-2"
                  onClick={() => setShowSolution(!showSolution)}
                >
                  <HelpCircleIcon size={16} className="mr-1" />
                  {t('showSolution')}
                </Button>
              )}
            </div>
            
            <Button 
              color="primary" 
              onClick={() => handleRunCode(step.id)}
            >
              {t('runCode')}
            </Button>
          </div>
          
          {showHint && step.hints && (
            <div className="mt-2 p-2 bg-yellow-100 dark:bg-yellow-900 rounded">
              <p className="text-sm">{step.hints[0]}</p>
            </div>
          )}
          
          {showSolution && step.solution && (
            <div className="mt-2 p-2 bg-blue-100 dark:bg-blue-900 rounded">
              <p className="text-sm font-semibold">{t('solution')}:</p>
              <SyntaxHighlighter language="python" style={tomorrow}>
                {step.solution}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
        
        {/* Output display */}
        {codeOutputs[step.id] && (
          <div className="mt-4">
            <p className="font-medium mb-1">{t('output')}:</p>
            <div className="bg-black text-white p-4 rounded-md font-mono text-sm overflow-auto max-h-40">
              {codeOutputs[step.id]}
            </div>
          </div>
        )}
        
        {/* Success/Error indicators */}
        {isSuccess && (
          <div className="success-animation p-2 bg-green-100 dark:bg-green-900 rounded flex items-center">
            <CheckCircleIcon className="text-green-600 dark:text-green-400 mr-2" />
            <p className="text-green-800 dark:text-green-300">{t('correct')}</p>
          </div>
        )}
        
        {isError && (
          <div className="p-2 bg-red-100 dark:bg-red-900 rounded flex items-center">
            <AlertCircleIcon className="text-red-600 dark:text-red-400 mr-2" />
            <p className="text-red-800 dark:text-red-300">{t('incorrect')}</p>
          </div>
        )}
      </div>
    );
  };

  const renderQuiz = (step: any) => {
    if (!step.options) return null;
    
    return (
      <div className="space-y-4">
        <div className="grid gap-3">
          {step.options.map((option: any, index: number) => (
            <Button
              key={index}
              color={isSuccess && option.correct ? "success" : isError && userAnswers[step.id] === index.toString() ? "danger" : "default"}
              variant="flat"
              className={`justify-start h-auto py-3 px-4 text-left ${userAnswers[step.id] === index.toString() ? 'border-primary' : ''}`}
              onClick={() => handleQuizAnswer(index)}
            >
              {option.text}
            </Button>
          ))}
        </div>
        
        {isSuccess && (
          <div className="success-animation p-2 bg-green-100 dark:bg-green-900 rounded flex items-center">
            <CheckCircleIcon className="text-green-600 dark:text-green-400 mr-2" />
            <p className="text-green-800 dark:text-green-300">{t('correct')}</p>
          </div>
        )}
        
        {isError && (
          <div className="p-2 bg-red-100 dark:bg-red-900 rounded flex items-center">
            <AlertCircleIcon className="text-red-600 dark:text-red-400 mr-2" />
            <p className="text-red-800 dark:text-red-300">{t('incorrect')}</p>
          </div>
        )}
      </div>
    );
  };

  const renderChallenge = (step: any) => {
    return (
      <div className="space-y-4">
        {renderCodeEditor(step)}
        
        <div className="flex justify-end">
          <Button 
            color="primary" 
            onClick={handleCheckAnswer}
          >
            {t('checkAnswer')}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <Link href="/lessons">
          <Button variant="light" startContent={<ChevronLeftIcon size={16} />}>
            {t('lessons')}
          </Button>
        </Link>
        
        <Chip color="primary" variant="flat">
          {lesson.difficulty === 'beginner' 
            ? t('difficulty.beginner') 
            : lesson.difficulty === 'intermediate' 
              ? t('difficulty.intermediate') 
              : t('difficulty.advanced')}
        </Chip>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
            <Chip>{currentStepIndex + 1}/{lesson.steps.length}</Chip>
          </div>
          <Progress 
            value={progress} 
            color="primary" 
            className="h-2" 
            aria-label="Lesson progress"
          />
        </CardHeader>
        
        <CardBody>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {currentStepIndex + 1}
                </span>
                <h2 className="text-xl font-bold">{currentStep.title}</h2>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <Markdown components={{
                  code(props: any) {
                    const {children, className, ...rest} = props;
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <SyntaxHighlighter
                        language={match[1]}
                        style={tomorrow}
                        PreTag="div"
                        {...rest}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...rest}>
                        {children}
                      </code>
                    );
                  }
                }}>
                  {currentStep.content}
                </Markdown>
              </div>
              
              <Divider className="my-4" />
              
              {/* Render different components based on step type */}
              {currentStep.type === 'code' && renderCodeEditor(currentStep)}
              {currentStep.type === 'quiz' && renderQuiz(currentStep)}
              {currentStep.type === 'challenge' && renderChallenge(currentStep)}
            </motion.div>
          </AnimatePresence>
        </CardBody>
        
        <CardFooter className="flex justify-between">
          <Button
            color="secondary"
            variant="flat"
            startContent={<ChevronLeftIcon size={16} />}
            onClick={handlePrevious}
            isDisabled={currentStepIndex === 0}
          >
            {t('previous')}
          </Button>
          
          <Button
            color="primary"
            endContent={<ChevronRightIcon size={16} />}
            onClick={handleNext}
            isDisabled={currentStep.type !== 'explanation' && !isSuccess && !completedSteps[currentStep.id]}
          >
            {isLastStep ? t('complete') : t('next')}
          </Button>
        </CardFooter>
      </Card>
      
      {/* Lesson completion modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col items-center">
            <div className="text-center">
              <AwardIcon size={48} className="text-primary mx-auto mb-2" />
              <h2 className="text-2xl font-bold">{t('congratulations')}</h2>
            </div>
          </ModalHeader>
          <ModalBody className="text-center">
            <p>{t('lessonCompleted')}</p>
            <div className="my-4">
              <div className="inline-block rounded-full bg-primary/10 p-4">
                <CheckCircleIcon size={36} className="text-primary" />
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="justify-center space-x-4">
            <Button color="secondary" variant="flat" onClick={() => router.push('/lessons')}>
              {t('nextLesson')}
            </Button>
            <Button color="primary" onClick={onClose}>
              {t('completeLesson')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}