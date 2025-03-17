'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardFooter,
  Button, 
  Divider,
  Tabs,
  Tab,
  Tooltip,
  Breadcrumbs,
  BreadcrumbItem,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner
} from '@heroui/react';
import { 
  HomeIcon,
  BookOpenIcon,
  CodeIcon,
  PlayIcon,
  TrashIcon,
  SaveIcon,
  DownloadIcon,
  UploadIcon,
  RefreshCwIcon,
  HelpCircleIcon,
  ChevronDownIcon,
  TerminalIcon
} from 'lucide-react';
import Link from 'next/link';

// Template code examples
const templates = [
  {
    id: 'hello-world',
    name: 'helloWorld',
    code: `# Simple Hello World program
print("Hello, World!")
print("Welcome to Python programming!")
`
  },
  {
    id: 'calculator',
    name: 'simpleCalculator',
    code: `# Simple Calculator
num1 = 10
num2 = 5

# Addition
print(f"{num1} + {num2} = {num1 + num2}")

# Subtraction
print(f"{num1} - {num2} = {num1 - num2}")

# Multiplication
print(f"{num1} * {num2} = {num1 * num2}")

# Division
print(f"{num1} / {num2} = {num1 / num2}")
`
  },
  {
    id: 'turtle-graphics',
    name: 'turtleGraphics',
    code: `# Turtle Graphics - Drawing a simple shape
import turtle

# Create a turtle object
t = turtle.Turtle()

# Draw a square
for _ in range(4):
    t.forward(100)
    t.right(90)

# Keep the window open
turtle.done()
`
  },
  {
    id: 'for-loop',
    name: 'forLoop',
    code: `# For Loop Example
for i in range(1, 11):
    print(f"Number: {i}")
    
# Sum the numbers from 1 to 10
total = 0
for i in range(1, 11):
    total += i
    
print(f"Sum of numbers from 1 to 10: {total}")
`
  },
  {
    id: 'lists',
    name: 'lists',
    code: `# Working with Lists
fruits = ["apple", "banana", "cherry", "orange", "kiwi"]

# Print the entire list
print("My fruit list:", fruits)

# Access specific items
print("First fruit:", fruits[0])
print("Last fruit:", fruits[-1])

# Loop through the list
print("\\nAll fruits:")
for fruit in fruits:
    print(f"- {fruit}")

# Add a new fruit
fruits.append("mango")
print("\\nAfter adding mango:", fruits)

# Sort the list
fruits.sort()
print("\\nSorted list:", fruits)
`
  }
];

// Help topics
const helpTopics = [
  {
    id: 'basics',
    name: 'basics',
    content: [
      { title: 'print()', description: 'Use print() to output text to the screen.' },
      { title: 'Comments', description: 'Use # to add comments that are ignored by Python.' },
      { title: 'Indentation', description: 'Python uses indentation (spaces) to define code blocks.' }
    ]
  },
  {
    id: 'variables',
    name: 'variables',
    content: [
      { title: 'Variable Assignment', description: 'Use = to assign values: name = "Alex"' },
      { title: 'Data Types', description: 'Common types: str, int, float, bool, list, dict' },
      { title: 'Type Conversion', description: 'Convert between types: int(), str(), float()' }
    ]
  },
  {
    id: 'loops',
    name: 'loops',
    content: [
      { title: 'For Loops', description: 'for i in range(5): - repeats code 5 times' },
      { title: 'While Loops', description: 'while condition: - repeats as long as condition is True' },
      { title: 'Loop Control', description: 'break - exits loop, continue - skips to next iteration' }
    ]
  }
];

export default function Playground() {
  const t = useTranslations('playground');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [code, setCode] = useState(`# Write your Python code here
print("Hello, PythonChik!")

# Try creating a variable
name = "Coder"
print("Hello, " + name + "!")

# Let's do some math
result = 5 + 5
print("5 + 5 =", result)
`);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [helpTopic, setHelpTopic] = useState('basics');
  const [savedCodes, setSavedCodes] = useState<{name: string, code: string}[]>([]);
  const [fileName, setFileName] = useState('my_code.py');
  const editorRef = useRef<HTMLTextAreaElement>(null);
  
  // Load saved codes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('playground_saved_codes');
    if (saved) {
      try {
        setSavedCodes(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved codes', e);
      }
    }
  }, []);
  
  // Function to run the code (simulated)
  const runCode = () => {
    setIsRunning(true);
    setOutput('');
    
    // Simulate a delay to show loading state
    setTimeout(() => {
      try {
        // Simple output simulation based on the code
        let simulatedOutput = '';
        
        if (code.includes('print(')) {
          // Extract print statements and simulate their output
          const printRegex = /print\((.*?)\)/g;
          const printMatches = [...code.matchAll(printRegex)];
          
          if (printMatches.length > 0) {
            simulatedOutput = printMatches.map(match => {
              try {
                // Try to evaluate the print content - this is a simplified simulation
                const content = match[1].replace(/f"(.*?)"/g, '`$1`') // Convert f-strings to template literals
                                        .replace(/([^"']+?)([+])/g, '`$1`$2'); // Convert concatenation
                
                // Simplistic evaluation - would need much more complexity for real Python execution
                let result = eval(content);
                return result;
              } catch (e) {
                // If evaluation fails, just return the raw content
                return match[1];
              }
            }).join('\n');
          } else {
            simulatedOutput = 'Program executed successfully!';
          }
        } else if (code.includes('turtle')) {
          simulatedOutput = '[Turtle Graphics would be displayed here]\nTurtle commands executed successfully!';
        } else {
          simulatedOutput = 'Program executed successfully!';
        }
        
        setOutput(simulatedOutput);
      } catch (error) {
        setOutput(`Error: ${error}`);
      } finally {
        setIsRunning(false);
      }
    }, 1000);
  };

  // Function to clear the code
  const clearCode = () => {
    if (confirm('Are you sure you want to clear the code editor? This cannot be undone.')) {
      setCode('');
      setOutput('');
      setSelectedTemplate('');
    }
  };

  // Function to load a template
  const loadTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setCode(template.code);
      setOutput('');
    }
  };
  
  // Function to save the current code
  const saveCode = () => {
    const name = prompt('Enter a name for this code:', fileName);
    if (name) {
      const newSavedCodes = [...savedCodes, { name, code }];
      setSavedCodes(newSavedCodes);
      setFileName(name);
      
      // Save to localStorage
      localStorage.setItem('playground_saved_codes', JSON.stringify(newSavedCodes));
    }
  };
  
  // Function to load saved code
  const loadSavedCode = (index: number) => {
    if (savedCodes[index]) {
      setCode(savedCodes[index].code);
      setOutput('');
      setFileName(savedCodes[index].name);
    }
  };
  
  // Function to download code as a file
  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
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
      <Breadcrumbs className="mb-4">
        <BreadcrumbItem>
          <Link href="/dashboard">
            <HomeIcon size={16} className="mr-1" />
            Dashboard
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          Playground
        </BreadcrumbItem>
      </Breadcrumbs>
    
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <motion.div 
          className="lg:col-span-1"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Templates card */}
          <motion.div variants={item}>
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-xl font-bold">{t('templates')}</h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-2">
                  {templates.map((template) => (
                    <Button
                      key={template.id}
                      color={selectedTemplate === template.id ? "primary" : "secondary"}
                      variant={selectedTemplate === template.id ? "solid" : "flat"}
                      className="w-full justify-start"
                      onClick={() => loadTemplate(template.id)}
                    >
                      {t(template.name)}
                    </Button>
                  ))}
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Saved code card */}
          <motion.div variants={item}>
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-xl font-bold">Saved Code</h2>
              </CardHeader>
              <CardBody>
                {savedCodes.length > 0 ? (
                  <div className="space-y-2">
                    {savedCodes.map((saved, index) => (
                      <Button
                        key={index}
                        color="secondary"
                        variant="flat"
                        className="w-full justify-start text-left"
                        onClick={() => loadSavedCode(index)}
                      >
                        <div className="truncate">
                          {saved.name}
                        </div>
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No saved code yet. Use the Save button to save your code.
                  </p>
                )}
              </CardBody>
            </Card>
          </motion.div>

          {/* Help card */}
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold">{t('help')}</h2>
              </CardHeader>
              <CardBody>
                <Tabs
                  aria-label="Help topics"
                  selectedKey={helpTopic}
                  onSelectionChange={(key) => setHelpTopic(key as string)}
                >
                  {helpTopics.map((topic) => (
                    <Tab key={topic.id} title={t(topic.name)}>
                      <div className="space-y-4 mt-2">
                        {topic.content.map((item, index) => (
                          <div key={index}>
                            <h3 className="font-medium mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </Tab>
                  ))}
                </Tabs>
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div 
          className="lg:col-span-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Code editor card */}
          <motion.div variants={item}>
            <Card className="mb-6">
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{t('codeEditor')}</h2>
                <div className="flex space-x-2">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button 
                        variant="flat" 
                        endContent={<ChevronDownIcon size={16} />}
                      >
                        {fileName}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="File actions">
                      <DropdownItem
                        key="save"
                        startContent={<SaveIcon size={16} />}
                        onPress={saveCode}
                      >
                        Save
                      </DropdownItem>
                      <DropdownItem
                        key="download"
                        startContent={<DownloadIcon size={16} />}
                        onPress={downloadCode}
                      >
                        Download
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  
                  <Button
                    color="default"
                    variant="flat"
                    isIconOnly
                    onClick={clearCode}
                    aria-label={t('clear')}
                  >
                    <TrashIcon size={16} />
                  </Button>
                  
                  <Button 
                    color="primary" 
                    onClick={runCode} 
                    isDisabled={isRunning}
                    startContent={isRunning ? <Spinner size="sm" /> : <PlayIcon size={16} />}
                  >
                    {isRunning ? t('running') : t('runCode')}
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md border overflow-hidden">
                  <textarea
                    ref={editorRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-64 font-mono text-sm p-2 border rounded bg-white dark:bg-gray-800 dark:text-gray-100"
                    placeholder="Write your Python code here..."
                    spellCheck="false"
                  ></textarea>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Output card */}
          <motion.div variants={item}>
            <Card>
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{t('output')}</h2>
                <Chip 
                  variant="flat" 
                  color={isRunning ? "warning" : output ? "success" : "default"}
                  startContent={isRunning ? <Spinner size="sm" /> : <TerminalIcon size={14} />}
                >
                  {isRunning ? t('running') : output ? "Ready" : "Waiting"}
                </Chip>
              </CardHeader>
              <CardBody>
                <div className="bg-black text-white p-4 rounded-md font-mono text-sm min-h-32 overflow-auto">
                  {output ? output : t('outputPlaceholder')}
                </div>
              </CardBody>
              <CardFooter>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <HelpCircleIcon size={14} className="mr-1" />
                  Tip: Use print() statements to see output
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}