'use client';

import React, { useState, useRef } from 'react';
import { Card, CardBody, CardHeader, Button, Divider } from '@heroui/react';

export default function Playground() {
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
  const editorRef = useRef(null);

  // Function to run the code (simulated)
  const runCode = () => {
    setIsRunning(true);
    setOutput('');
    
    // Simulating code execution with a delay
    setTimeout(() => {
      // Simple output simulation based on the code
      let simulatedOutput = '';
      
      if (code.includes('print("Hello, PythonChik!")')) {
        simulatedOutput += 'Hello, PythonChik!\n';
      }
      
      if (code.includes('name = "Coder"') && code.includes('print("Hello, " + name + "!")')) {
        simulatedOutput += 'Hello, Coder!\n';
      }
      
      if (code.includes('result = 5 + 5') && code.includes('print("5 + 5 =", result)')) {
        simulatedOutput += '5 + 5 = 10\n';
      }
      
      // If no specific outputs detected, provide a generic response
      if (!simulatedOutput) {
        simulatedOutput = 'Program executed successfully!';
      }
      
      setOutput(simulatedOutput);
      setIsRunning(false);
    }, 1000);
  };

  // Function to clear the code
  const clearCode = () => {
    setCode('');
    setOutput('');
  };

  // Function to load a template
  const loadTemplate = (template: any) => {
    setSelectedTemplate(template);
    
    switch(template) {
      case 'hello-world':
        setCode(`# Simple Hello World program
print("Hello, World!")
print("Welcome to Python programming!")
`);
        break;
      case 'calculator':
        setCode(`# Simple Calculator
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
`);
        break;
      case 'turtle-graphics':
        setCode(`# Turtle Graphics - Drawing a simple shape
import turtle

# Create a turtle object
t = turtle.Turtle()

# Draw a square
for _ in range(4):
    t.forward(100)
    t.right(90)

# Keep the window open
turtle.done()
`);
        break;
      default:
        break;
    }
  };

  // Templates list
  const templates = [
    { id: 'hello-world', name: 'Hello World' },
    { id: 'calculator', name: 'Simple Calculator' },
    { id: 'turtle-graphics', name: 'Turtle Graphics' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Python Playground</h1>
        <p className="text-gray-600">Experiment with Python code and see the results instantly</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Templates</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    color={selectedTemplate === template.id ? 'primary' : 'secondary'}
                    className="w-full justify-start"
                    onClick={() => loadTemplate(template.id)}
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-xl font-bold">Help</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Basics</h3>
                  <p className="text-sm text-gray-600">
                    Use <code className="bg-gray-100 px-1 rounded">print()</code> to output text
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Variables</h3>
                  <p className="text-sm text-gray-600">
                    Create variables with <code className="bg-gray-100 px-1 rounded">name = value</code>
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Loops</h3>
                  <p className="text-sm text-gray-600">
                    Use <code className="bg-gray-100 px-1 rounded">for i in range(5):</code> for repetition
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="mb-6">
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Code Editor</h2>
              <div className="flex space-x-2">
                <Button color="secondary" onClick={clearCode}>Clear</Button>
                <Button color="primary" onClick={runCode} disabled={isRunning}>
                  {isRunning ? 'Running...' : 'Run Code'}
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="bg-gray-50 p-4 rounded-md border overflow-hidden">
                <textarea
                  ref={editorRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-64 font-mono text-sm p-2 border rounded"
                  placeholder="Write your Python code here..."
                ></textarea>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Output</h2>
            </CardHeader>
            <CardBody>
              <div className="bg-black text-white p-4 rounded-md font-mono text-sm min-h-32">
                {output ? output : 'Run your code to see the output here'}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}