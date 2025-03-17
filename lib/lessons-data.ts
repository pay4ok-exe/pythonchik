// lib/lessons-data.ts
// This file contains structured data for 10 lessons with multiple steps

export type LessonStep = {
    id: number;
    title: string;
    content: string;
    type: 'explanation' | 'code' | 'quiz' | 'game' | 'challenge';
    codeTemplate?: string;
    expectedOutput?: string;
    hints?: string[];
    solution?: string;
    options?: { text: string; correct: boolean }[];
    animation?: string;
  };
  
  export type Lesson = {
    id: number;
    title: string;
    description: string;
    module: string;
    moduleId: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: number; // in minutes
    steps: LessonStep[];
    prerequisites?: number[]; // IDs of prerequisite lessons
    image?: string;
  };
  
  export type Module = {
    id: number;
    title: string;
    description: string;
    orderIndex: number;
    lessons: number[]; // IDs of lessons in this module
    image?: string;
  };
  
  export const modules: Module[] = [
    {
      id: 1,
      title: 'Python Basics',
      description: 'Learn the fundamentals of Python programming',
      orderIndex: 1,
      lessons: [1, 2, 3, 4],
      image: '/images/modules/basics.svg'
    },
    {
      id: 2,
      title: 'Control Flow',
      description: 'Learn how to control the flow of your code with conditionals and loops',
      orderIndex: 2,
      lessons: [5, 6, 7],
      image: '/images/modules/control-flow.svg'
    },
    {
      id: 3,
      title: 'Data Structures',
      description: 'Learn about lists, dictionaries, and other data structures',
      orderIndex: 3,
      lessons: [8, 9, 10],
      image: '/images/modules/data-structures.svg'
    }
  ];
  
  export const lessons: Lesson[] = [
    {
      id: 1,
      title: 'Introduction to Python',
      description: 'Learn what Python is and write your first Python program',
      module: 'Python Basics',
      moduleId: 1,
      difficulty: 'beginner',
      duration: 15,
      steps: [
        {
          id: 1,
          title: 'What is Python?',
          content: `# Welcome to Python!
  
  Python is a popular programming language created by Guido van Rossum in 1991. It's designed to be simple and easy to read.
  
  Some cool facts about Python:
  - It's named after the comedy group Monty Python, not the snake!
  - Many big companies like Google, Netflix, and NASA use Python
  - Python can be used for websites, games, data science, and much more
  
  In this course, you'll learn the basics of Python programming in a fun and interactive way!`,
          type: 'explanation',
          animation: 'slide-in-left'
        },
        {
          id: 2,
          title: 'Your First Python Program',
          content: `# Let's write your first Python program!
  
  One of the simplest programs you can write is one that displays text on the screen.
  
  In Python, we use the \`print()\` function to display text. Try it out by typing this code in the editor below:
  
  \`\`\`python
  print("Hello, World!")
  \`\`\`
  
  When you run this code, Python will display "Hello, World!" on the screen.`,
          type: 'code',
          codeTemplate: 'print("Hello, World!")',
          expectedOutput: 'Hello, World!',
          animation: 'fade-in'
        },
        {
          id: 3,
          title: 'Add Your Own Message',
          content: `# Let's get personal!
  
  Now it's your turn to create your own message. Modify the code to print your name instead of "World".
  
  For example, if your name is Alex, you would write:
  
  \`\`\`python
  print("Hello, Alex!")
  \`\`\`
  
  Try it now!`,
          type: 'challenge',
          codeTemplate: 'print("Hello, World!")',
          hints: ['Just change the text inside the quotes to include your name'],
          animation: 'bounce'
        },
        {
          id: 4,
          title: 'Print Multiple Lines',
          content: `# Printing Multiple Lines
  
  You can use multiple print statements to display several lines of text.
  
  Try modifying the code to print "Hello, Python!" on the first line and "I'm learning to code!" on the second line.`,
          type: 'challenge',
          codeTemplate: 'print("Hello, Python!")\n# Add another print statement here',
          expectedOutput: 'Hello, Python!\nI\'m learning to code!',
          solution: 'print("Hello, Python!")\nprint("I\'m learning to code!")',
          animation: 'slide-in-right'
        },
        {
          id: 5,
          title: 'Python Print Quiz',
          content: `# Test Your Knowledge
  
  Let's see what you've learned about Python's print function:`,
          type: 'quiz',
          options: [
            { text: 'print() is used to display text on the screen', correct: true },
            { text: 'print() is used to create graphics', correct: false },
            { text: 'print() is used to calculate math problems', correct: false },
            { text: 'print() is used to save files', correct: false }
          ],
          animation: 'pulse'
        },
        {
          id: 6,
          title: 'Congratulations!',
          content: `# 🎉 Well Done!
  
  You've completed your first Python lesson! You've learned:
  - What Python is
  - How to use the print() function
  - How to display multiple lines of text
  
  In the next lesson, we'll learn about variables and how to store data in your programs.`,
          type: 'explanation',
          animation: 'bounce'
        }
      ]
    },
    {
      id: 2,
      title: 'Variables and Data Types',
      description: 'Learn how to store and work with different types of data in Python',
      module: 'Python Basics',
      moduleId: 1,
      difficulty: 'beginner',
      duration: 20,
      prerequisites: [1],
      steps: [
        {
          id: 1,
          title: 'What are Variables?',
          content: `# Variables in Python
  
  Variables are like containers that store data. You can think of them as labeled boxes that hold values.
  
  In Python, you create a variable by giving it a name and assigning a value with the equals sign (\`=\`).
  
  For example:
  
  \`\`\`python
  age = 10
  name = "Alex"
  \`\`\`
  
  Variables are super useful because you can use them, change them, and refer to them throughout your code!`,
          type: 'explanation',
          animation: 'slide-in-left'
        },
        {
          id: 2,
          title: 'Creating Your First Variable',
          content: `# Let's create a variable
  
  Let's create a variable called \`name\` that stores your name:
  
  \`\`\`python
  name = "Alex"
  print(name)
  \`\`\`
  
  When you run this code, Python will display "Alex" because that's the value stored in the \`name\` variable.
  
  Try it yourself! Create a variable with your own name.`,
          type: 'code',
          codeTemplate: 'name = "Alex"\nprint(name)',
          animation: 'fade-in'
        },
        {
          id: 3,
          title: 'Data Types: Numbers',
          content: `# Numbers in Python
  
  Python has different types of data. One type is numbers.
  
  There are two main types of numbers:
  - Integers (whole numbers like 5, 42, -10)
  - Floating point numbers (decimal numbers like 3.14, 2.5, -0.5)
  
  Let's create variables with numbers:
  
  \`\`\`python
  age = 10
  height = 4.5
  print("I am", age, "years old")
  print("I am", height, "feet tall")
  \`\`\`
  
  Try creating your own variables with numbers!`,
          type: 'code',
          codeTemplate: 'age = 10\nheight = 4.5\nprint("I am", age, "years old")\nprint("I am", height, "feet tall")',
          animation: 'slide-in-right'
        },
        {
          id: 4,
          title: 'Simple Math with Variables',
          content: `# Math with Variables
  
  You can do math operations with variables!
  
  \`\`\`python
  x = 5
  y = 3
  sum = x + y
  difference = x - y
  product = x * y
  quotient = x / y
  
  print("Sum:", sum)
  print("Difference:", difference)
  print("Product:", product)
  print("Quotient:", quotient)
  \`\`\`
  
  Now try creating your own math problem. Create two number variables and calculate their sum.`,
          type: 'challenge',
          codeTemplate: '# Create two number variables\n\n# Calculate their sum\n\n# Print the result',
          solution: 'num1 = 10\nnum2 = 7\nresult = num1 + num2\nprint("The sum is:", result)',
          animation: 'bounce'
        },
        {
          id: 5,
          title: 'Data Types: Strings',
          content: `# Strings in Python
  
  Strings are text values in Python. You create strings by putting text inside quotes:
  
  \`\`\`python
  name = "Alex"
  greeting = 'Hello there!'
  \`\`\`
  
  You can use either single quotes (') or double quotes (") for strings.
  
  You can join strings together using the + operator:
  
  \`\`\`python
  first_name = "Alex"
  last_name = "Smith"
  full_name = first_name + " " + last_name
  print(full_name)  # Prints: Alex Smith
  \`\`\`
  
  Try creating variables for your first and last name, then join them together!`,
          type: 'challenge',
          codeTemplate: '# Create variables for your first and last name\n\n# Join them with a space in between\n\n# Print the result',
          solution: 'first_name = "Alex"\nlast_name = "Smith"\nfull_name = first_name + " " + last_name\nprint(full_name)',
          animation: 'fade-in'
        },
        {
          id: 6,
          title: 'Variable Quiz',
          content: `# Test Your Knowledge
  
  Let's see what you've learned about variables:`,
          type: 'quiz',
          options: [
            { text: 'Variables can store different types of data like numbers and text', correct: true },
            { text: 'Once a variable is created, its value cannot be changed', correct: false },
            { text: 'You can do math operations with text variables', correct: false },
            { text: 'In Python, you create a variable using the = symbol', correct: true }
          ],
          animation: 'pulse'
        },
        {
          id: 7,
          title: 'Congratulations!',
          content: `# 🎉 Great Job!
  
  You've completed the variables lesson! You've learned:
  - What variables are and how to create them
  - Different data types: strings and numbers
  - How to do math with variables
  - How to join strings together
  
  In the next lesson, we'll learn about getting input from users to make your programs interactive!`,
          type: 'explanation',
          animation: 'bounce'
        }
      ]
    },
    {
      id: 3,
      title: 'User Input',
      description: 'Learn how to make your programs interactive by getting input from users',
      module: 'Python Basics',
      moduleId: 1,
      difficulty: 'beginner',
      duration: 15,
      prerequisites: [1, 2],
      steps: [
        {
          id: 1,
          title: 'Getting Input from Users',
          content: `# User Input in Python
  
  So far, our programs have been one-way conversations - the program talks to the user.
  
  But what if we want the user to tell us something?
  
  In Python, we use the \`input()\` function to get information from the user:
  
  \`\`\`python
  name = input("What is your name? ")
  print("Hello,", name, "!")
  \`\`\`
  
  When this code runs:
  1. It shows "What is your name? " to the user
  2. It waits for the user to type something and press Enter
  3. It stores what the user typed in the 'name' variable
  4. It prints a greeting using that name`,
          type: 'explanation',
          animation: 'slide-in-left'
        },
        {
          id: 2,
          title: 'Try User Input',
          content: `# Let's Get Some Input!
  
  Let's try getting input from the user:
  
  \`\`\`python
  favorite_color = input("What is your favorite color? ")
  print("Oh, I like", favorite_color, "too!")
  \`\`\`
  
  When you run this code, you'll need to type your favorite color and press Enter. Then the program will respond.
  
  Give it a try!`,
          type: 'code',
          codeTemplate: 'favorite_color = input("What is your favorite color? ")\nprint("Oh, I like", favorite_color, "too!")',
          animation: 'fade-in'
        },
        {
          id: 3,
          title: 'Numbers as Input',
          content: `# Getting Numbers from Users
  
  When you use \`input()\`, Python always treats what the user types as a string (text), even if they enter a number.
  
  If you want to use the input as a number, you need to convert it:
  
  \`\`\`python
  age_text = input("How old are you? ")
  age = int(age_text)  # Convert to integer
  years_to_100 = 100 - age
  print("You will be 100 in", years_to_100, "years!")
  \`\`\`
  
  The \`int()\` function converts a string to an integer (whole number).
  For decimal numbers, use \`float()\` instead.`,
          type: 'explanation',
          animation: 'slide-in-right'
        },
        {
          id: 4,
          title: 'Age Calculator',
          content: `# Create an Age Calculator
  
  Let's create a program that asks for the user's age and calculates:
  1. How many months they've been alive
  2. How many days they've been alive (approximately)
  
  Hints:
  - 1 year = 12 months
  - 1 year ≈ 365 days`,
          type: 'challenge',
          codeTemplate: '# Ask for the user\'s age\n\n# Convert the input to a number\n\n# Calculate months and days\n\n# Display the results',
          solution: 'age_text = input("How old are you? ")\nage = int(age_text)\nmonths = age * 12\ndays = age * 365\nprint("You have been alive for approximately:")\nprint(months, "months")\nprint(days, "days")',
          animation: 'bounce'
        },
        {
          id: 5,
          title: 'Creating a Greeting Program',
          content: `# Personalized Greeting Program
  
  Create a program that:
  1. Asks for the user's name
  2. Asks for the user's favorite hobby
  3. Prints a personalized message using both pieces of information
  
  For example: "Hi Alex! Your hobby of painting sounds really cool!"`,
          type: 'challenge',
          codeTemplate: '# Ask for the user\'s name\n\n# Ask for their hobby\n\n# Create and print a personalized message',
          solution: 'name = input("What is your name? ")\nhobby = input("What is your favorite hobby? ")\nprint("Hi", name + "! Your hobby of", hobby, "sounds really cool!")',
          animation: 'fade-in'
        },
        {
          id: 6,
          title: 'Input Function Quiz',
          content: `# Test Your Knowledge
  
  Let's see what you've learned about the input function:`,
          type: 'quiz',
          options: [
            { text: 'The input() function returns a string, even if the user types a number', correct: true },
            { text: 'You can use int() to convert string input to an integer number', correct: true },
            { text: 'The input() function automatically converts user input to the correct data type', correct: false },
            { text: 'You cannot display a message when asking for input', correct: false }
          ],
          animation: 'pulse'
        },
        {
          id: 7,
          title: 'Congratulations!',
          content: `# 🎉 Awesome Work!
  
  You've completed the user input lesson! You've learned:
  - How to get input from users using input()
  - How to convert string input to numbers
  - How to create interactive programs
  
  In the next lesson, we'll learn about making decisions in your code using conditionals!`,
          type: 'explanation',
          animation: 'bounce'
        }
      ]
    },
    {
      id: 4,
      title: 'Basic Operators',
      description: 'Learn about different operators in Python and how to use them in your code',
      module: 'Python Basics',
      moduleId: 1,
      difficulty: 'beginner',
      duration: 20,
      prerequisites: [2],
      steps: [
        {
          id: 1,
          title: 'Arithmetic Operators',
          content: `# Arithmetic Operators in Python
  
  Python has several operators that perform mathematical operations:
  
  - Addition: \`+\` (e.g., \`5 + 3\` equals \`8\`)
  - Subtraction: \`-\` (e.g., \`5 - 3\` equals \`2\`)
  - Multiplication: \`*\` (e.g., \`5 * 3\` equals \`15\`)
  - Division: \`/\` (e.g., \`5 / 3\` equals \`1.6666...\`)
  - Integer Division: \`//\` (e.g., \`5 // 3\` equals \`1\`)
  - Modulus (remainder): \`%\` (e.g., \`5 % 3\` equals \`2\`)
  - Exponentiation: \`**\` (e.g., \`5 ** 3\` equals \`125\`)
  
  Let's try some examples:`,
          type: 'explanation',
          animation: 'slide-in-left'
        },
        {
          id: 2,
          title: 'Using Arithmetic Operators',
          content: `# Let's Try Using Operators
  
  Let's practice using different arithmetic operators:
  
  \`\`\`python
  a = 10
  b = 3
  
  # Addition
  print("a + b =", a + b)
  
  # Subtraction
  print("a - b =", a - b)
  
  # Multiplication
  print("a * b =", a * b)
  
  # Division
  print("a / b =", a / b)
  
  # Integer Division
  print("a // b =", a // b)
  
  # Modulus (remainder)
  print("a % b =", a % b)
  
  # Exponentiation
  print("a ** b =", a ** b)
  \`\`\`
  
  Try running this code to see the results!`,
          type: 'code',
          codeTemplate: 'a = 10\nb = 3\n\n# Addition\nprint("a + b =", a + b)\n\n# Subtraction\nprint("a - b =", a - b)\n\n# Multiplication\nprint("a * b =", a * b)\n\n# Division\nprint("a / b =", a / b)\n\n# Integer Division\nprint("a // b =", a // b)\n\n# Modulus (remainder)\nprint("a % b =", a % b)\n\n# Exponentiation\nprint("a ** b =", a ** b)',
          animation: 'fade-in'
        },
        {
          id: 3,
          title: 'Comparison Operators',
          content: `# Comparison Operators
  
  Comparison operators compare two values and return a Boolean result (True or False):
  
  - Equal to: \`==\` (e.g., \`5 == 5\` is \`True\`, \`5 == 3\` is \`False\`)
  - Not equal to: \`!=\` (e.g., \`5 != 5\` is \`False\`, \`5 != 3\` is \`True\`)
  - Greater than: \`>\` (e.g., \`5 > 3\` is \`True\`, \`5 > 5\` is \`False\`)
  - Less than: \`<\` (e.g., \`5 < 3\` is \`False\`, \`3 < 5\` is \`True\`)
  - Greater than or equal to: \`>=\` (e.g., \`5 >= 5\` is \`True\`, \`5 >= 6\` is \`False\`)
  - Less than or equal to: \`<=\` (e.g., \`5 <= 5\` is \`True\`, \`5 <= 4\` is \`False\`)
  
  Let's try some examples:`,
          type: 'explanation',
          animation: 'slide-in-right'
        },
        {
          id: 4,
          title: 'Using Comparison Operators',
          content: `# Let's Try Comparison Operators
  
  Let's practice using comparison operators:
  
  \`\`\`python
  a = 10
  b = 5
  
  # Equal to
  print("a == b?", a == b)
  
  # Not equal to
  print("a != b?", a != b)
  
  # Greater than
  print("a > b?", a > b)
  
  # Less than
  print("a < b?", a < b)
  
  # Greater than or equal to
  print("a >= b?", a >= b)
  
  # Less than or equal to
  print("a <= b?", a <= b)
  \`\`\`
  
  Try running this code to see the results!`,
          type: 'code',
          codeTemplate: 'a = 10\nb = 5\n\n# Equal to\nprint("a == b?", a == b)\n\n# Not equal to\nprint("a != b?", a != b)\n\n# Greater than\nprint("a > b?", a > b)\n\n# Less than\nprint("a < b?", a < b)\n\n# Greater than or equal to\nprint("a >= b?", a >= b)\n\n# Less than or equal to\nprint("a <= b?", a <= b)',
          animation: 'fade-in'
        },
        {
          id: 5,
          title: 'Logical Operators',
          content: `# Logical Operators
  
  Python has three logical operators that work with Boolean values:
  
  - AND: \`and\` (True if both operands are True)
  - OR: \`or\` (True if at least one operand is True)
  - NOT: \`not\` (inverts the Boolean value)
  
  Here's how they work:
  
  \`\`\`python
  # AND
  print("True and True =", True and True)   # True
  print("True and False =", True and False) # False
  print("False and False =", False and False) # False
  
  # OR
  print("True or True =", True or True)   # True
  print("True or False =", True or False) # True
  print("False or False =", False or False) # False
  
  # NOT
  print("not True =", not True)   # False
  print("not False =", not False) # True
  \`\`\`
  
  Let's practice using these operators!`,
          type: 'code',
          codeTemplate: '# AND\nprint("True and True =", True and True)\nprint("True and False =", True and False)\nprint("False and False =", False and False)\n\n# OR\nprint("True or True =", True or True)\nprint("True or False =", True or False)\nprint("False or False =", False or False)\n\n# NOT\nprint("not True =", not True)\nprint("not False =", not False)',
          animation: 'slide-in-left'
        },
        {
          id: 6,
          title: 'Temperature Converter Challenge',
          content: `# Temperature Converter
  
  Let's use what we've learned about operators to create a temperature converter.
  
  Create a program that:
  1. Asks the user for a temperature in Fahrenheit
  2. Converts it to Celsius using the formula: C = (F - 32) * 5/9
  3. Prints the result
  
  Bonus: Also convert the temperature to Kelvin (K = C + 273.15)`,
          type: 'challenge',
          codeTemplate: '# Ask for the temperature in Fahrenheit\n\n# Convert to Celsius\n\n# Convert to Kelvin\n\n# Print both results',
          solution: 'fahrenheit = float(input("Enter temperature in Fahrenheit: "))\ncelsius = (fahrenheit - 32) * 5/9\nkelvin = celsius + 273.15\nprint(fahrenheit, "°F is equal to", round(celsius, 2), "°C")\nprint(fahrenheit, "°F is equal to", round(kelvin, 2), "K")',
          animation: 'bounce'
        },
        {
          id: 7,
          title: 'Operators Quiz',
          content: `# Test Your Knowledge
  
  Let's see what you've learned about operators:`,
          type: 'quiz',
          options: [
            { text: '10 % 3 equals 1', correct: true },
            { text: '5 ** 2 equals 10', correct: false },
            { text: 'True or False equals True', correct: true },
            { text: 'True and False equals True', correct: false }
          ],
          animation: 'pulse'
        },
        {
          id: 8,
          title: 'Congratulations!',
          content: `# 🎉 Great Job!
  
  You've completed the operators lesson! You've learned about:
  - Arithmetic operators (+, -, *, /, //, %, **)
  - Comparison operators (==, !=, >, <, >=, <=)
  - Logical operators (and, or, not)
  
  In the next lesson, we'll learn about control flow with if statements!`,
          type: 'explanation',
          animation: 'bounce'
        }
      ]
    },
    {
      id: 5,
      title: 'Conditional Statements',
      description: 'Learn how to make decisions in your code with if, elif, and else statements',
      module: 'Control Flow',
      moduleId: 2,
      difficulty: 'beginner',
      duration: 25,
      prerequisites: [3, 4],
      steps: [
        {
          id: 1,
          title: 'Introduction to Conditionals',
          content: `# Making Decisions with Conditionals
  
  In programming, we often need to make decisions based on conditions.
  
  For example:
  - If it's raining, take an umbrella
  - If the answer is correct, give points
  - If the user is logged in, show the dashboard
  
  Python uses \`if\`, \`elif\` (else if), and \`else\` statements to handle these decisions.
  
  \`\`\`python
  if condition:
      # Do something if condition is True
  elif another_condition:
      # Do something if another_condition is True
  else:
      # Do something if all conditions are False
  \`\`\`
  
  Let's learn how to use them!`,
          type: 'explanation',
          animation: 'slide-in-left'
        },
        {
          id: 2,
          title: 'Basic If Statement',
          content: `# Using If Statements
  
  The most basic conditional is the \`if\` statement:
  
  \`\`\`python
  age = 15
  
  if age >= 13:
      print("You are a teenager!")
  \`\`\`
  
  The code inside the if block (after the colon) runs only if the condition is True.
  
  Note: In Python, indentation is important! The indented code is part of the if block.`,
          type: 'code',
          codeTemplate: 'age = 15\n\nif age >= 13:\n    print("You are a teenager!")',
          animation: 'fade-in'
        },
        {
          id: 3,
          title: 'If-Else Statements',
          content: `# If-Else Statements
  
  We can use \`else\` to specify what happens when the condition is False:
  
  \`\`\`python
  age = 10
  
  if age >= 13:
      print("You are a teenager!")
  else:
      print("You are not a teenager yet.")
  \`\`\`
  
  Try changing the age value to see how the output changes!`,
          type: 'code',
          codeTemplate: 'age = 10\n\nif age >= 13:\n    print("You are a teenager!")\nelse:\n    print("You are not a teenager yet.")',
          animation: 'slide-in-right'
        },
        {
          id: 4,
          title: 'If-Elif-Else Statements',
          content: `# Multiple Conditions with Elif
  
  Sometimes we need to check multiple conditions. We can use \`elif\` (short for "else if"):
  
  \`\`\`python
  age = 25
  
  if age < 13:
      print("You are a child.")
  elif age < 20:
      print("You are a teenager.")
  elif age < 65:
      print("You are an adult.")
  else:
      print("You are a senior.")
  \`\`\`
  
  Python checks each condition in order. As soon as one is True, it runs that code block and skips the rest.
  
  Try changing the age to different values to see how the output changes!`,
          type: 'code',
          codeTemplate: 'age = 25\n\nif age < 13:\n    print("You are a child.")\nelif age < 20:\n    print("You are a teenager.")\nelif age < 65:\n    print("You are an adult.")\nelse:\n    print("You are a senior.")',
          animation: 'bounce'
        },
        {
          id: 5,
          title: 'Nested If Statements',
          content: `# Nested If Statements
  
  You can also put if statements inside other if statements:
  
  \`\`\`python
  age = 15
  has_permission = True
  
  if age < 18:
      print("You are under 18.")
      if has_permission:
          print("But you have permission, so you can proceed.")
      else:
          print("And you don't have permission, so you can't proceed.")
  else:
      print("You are 18 or older, so you can proceed.")
  \`\`\`
  
  Try changing the values of \`age\` and \`has_permission\` to see different results!`,
          type: 'code',
          codeTemplate: 'age = 15\nhas_permission = True\n\nif age < 18:\n    print("You are under 18.")\n    if has_permission:\n        print("But you have permission, so you can proceed.")\n    else:\n        print("And you don\'t have permission, so you can\'t proceed.")\nelse:\n    print("You are 18 or older, so you can proceed.")',
          animation: 'fade-in'
        },
// Continuing with Conditional Statements lesson
{
    id: 6,
    title: 'Grade Calculator Challenge',
    content: `# Grade Calculator

Create a program that:
1. Asks the user for their test score (0-100)
2. Displays their letter grade based on the score:
- A: 90-100
- B: 80-89
- C: 70-79
- D: 60-69
- F: 0-59

3. Also displays a message based on the grade:
- A or B: "Great job!"
- C: "Good effort!"
- D or F: "Let's work on improving!"`,
    type: 'challenge',
    codeTemplate: '# Ask for the test score\n\n# Determine the letter grade\n\n# Display the grade and appropriate message',
    solution: 'score = float(input("Enter your test score (0-100): "))\n\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelif score >= 60:\n    grade = "D"\nelse:\n    grade = "F"\n\nprint("Your grade is:", grade)\n\nif grade == "A" or grade == "B":\n    print("Great job!")\nelif grade == "C":\n    print("Good effort!")\nelse:  # D or F\n    print("Let\'s work on improving!")',
    animation: 'slide-in-left'
  },
  {
    id: 7,
    title: 'Conditionals Quiz',
    content: `# Test Your Knowledge

Let's see what you've learned about conditional statements:`,
    type: 'quiz',
    options: [
      { text: 'If multiple elif conditions are True, Python executes only the first one it encounters', correct: true },
      { text: 'You must always include an else statement with every if statement', correct: false },
      { text: 'You can nest if statements inside other if statements', correct: true },
      { text: 'Python uses indentation to identify which code belongs to a conditional block', correct: true }
    ],
    animation: 'pulse'
  },
  {
    id: 8,
    title: 'Congratulations!',
    content: `# 🎉 Well Done!

You've completed the conditional statements lesson! You've learned:
- How to use if statements to make decisions in your code
- How to use elif for multiple conditions
- How to use else for default cases
- How to nest conditionals

In the next lesson, we'll learn about loops for repeating tasks!`,
    type: 'explanation',
    animation: 'bounce'
  }
]
},
{
id: 6,
title: 'For Loops',
description: 'Learn how to repeat actions and iterate through collections with for loops',
module: 'Control Flow',
moduleId: 2,
difficulty: 'beginner',
duration: 25,
prerequisites: [5],
steps: [
  {
    id: 1,
    title: 'Introduction to Loops',
    content: `# Repeating Actions with Loops

Imagine you need to print the numbers from 1 to 10. You could write:

\`\`\`python
print(1)
print(2)
print(3)
# ... and so on
\`\`\`

But that's repetitive and inefficient! Instead, we use loops to repeat actions.

Python has two main types of loops:
- \`for\` loops: for iterating a specific number of times or through collections
- \`while\` loops: for repeating as long as a condition is True

In this lesson, we'll focus on \`for\` loops.`,
    type: 'explanation',
    animation: 'slide-in-left'
  },
  {
    id: 2,
    title: 'Basic For Loops with range()',
    content: `# Using For Loops with range()

The most common way to use a for loop is with the \`range()\` function:

\`\`\`python
for i in range(5):
print(i)
\`\`\`

This will print the numbers 0, 1, 2, 3, 4.

Note that \`range(n)\` gives numbers from 0 to n-1.

You can also specify a start and end value:

\`\`\`python
for i in range(1, 6):
print(i)
\`\`\`

This will print 1, 2, 3, 4, 5.

Let's try it!`,
    type: 'code',
    codeTemplate: '# Print numbers 0 to 4\nfor i in range(5):\n    print(i)\n\nprint("---")\n\n# Print numbers 1 to 5\nfor i in range(1, 6):\n    print(i)',
    animation: 'fade-in'
  },
  {
    id: 3,
    title: 'Stepping in range()',
    content: `# Stepping Through Values

The \`range()\` function can also take a third parameter for the step:

\`\`\`python
for i in range(0, 10, 2):
print(i)
\`\`\`

This will print 0, 2, 4, 6, 8 (every second number from 0 to 10).

You can also count backward with a negative step:

\`\`\`python
for i in range(10, 0, -1):
print(i)
\`\`\`

This will print 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 (countdown).`,
    type: 'code',
    codeTemplate: '# Print even numbers from 0 to 8\nfor i in range(0, 10, 2):\n    print(i)\n\nprint("---")\n\n# Countdown from 10 to 1\nfor i in range(10, 0, -1):\n    print(i)',
    animation: 'slide-in-right'
  },
  {
    id: 4,
    title: 'Looping Through Strings',
    content: `# Looping Through Characters in a String

You can use a for loop to iterate through each character in a string:

\`\`\`python
name = "Python"
for letter in name:
print(letter)
\`\`\`

This will print each letter on a new line: P, y, t, h, o, n.

Let's try looping through a string and doing something with each character:`,
    type: 'code',
    codeTemplate: 'name = "Python"\nfor letter in name:\n    print(letter.upper())',
    animation: 'bounce'
  },
  {
    id: 5,
    title: 'Accumulator Pattern',
    content: `# Building Results with Accumulators

A common pattern in loops is to build up a result by updating a variable in each iteration:

\`\`\`python
# Calculate the sum of numbers from 1 to 5
sum = 0
for i in range(1, 6):
sum = sum + i  # Add the current number to the running total
print(f"Added {i}, sum is now {sum}")
print(f"Final sum: {sum}")
\`\`\`

Let's try using the accumulator pattern to solve a problem:`,
    type: 'code',
    codeTemplate: '# Calculate the sum of numbers from 1 to 5\nsum = 0\nfor i in range(1, 6):\n    sum = sum + i  # or sum += i\n    print(f"Added {i}, sum is now {sum}")\nprint(f"Final sum: {sum}")',
    animation: 'fade-in'
  },
  {
    id: 6,
    title: 'Factorial Calculator Challenge',
    content: `# Factorial Calculator

The factorial of a number n (written as n!) is the product of all positive integers less than or equal to n.

For example:
- 5! = 5 × 4 × 3 × 2 × 1 = 120

Create a program that:
1. Asks the user for a positive integer
2. Calculates its factorial using a for loop
3. Displays the result`,
    type: 'challenge',
    codeTemplate: '# Ask for a positive integer\n\n# Calculate the factorial\n\n# Display the result',
    solution: 'num = int(input("Enter a positive integer: "))\n\nfactorial = 1\nfor i in range(1, num + 1):\n    factorial *= i\n\nprint(f"{num}! = {factorial}")',
    animation: 'slide-in-left'
  },
  {
    id: 7,
    title: 'Multiplication Table Challenge',
    content: `# Multiplication Table

Create a program that displays a multiplication table for a given number.

For example, if the user enters 5, the program should display:
5 × 1 = 5
5 × 2 = 10
5 × 3 = 15
...
5 × 10 = 50`,
    type: 'challenge',
    codeTemplate: '# Ask for a number\n\n# Display the multiplication table from 1 to 10',
    solution: 'num = int(input("Enter a number for multiplication table: "))\n\nfor i in range(1, 11):\n    result = num * i\n    print(f"{num} × {i} = {result}")',
    animation: 'bounce'
  },
  {
    id: 8,
    title: 'For Loops Quiz',
    content: `# Test Your Knowledge

Let's see what you've learned about for loops:`,
    type: 'quiz',
    options: [
      { text: 'range(5) produces the values 0, 1, 2, 3, 4', correct: true },
      { text: 'You can use a for loop to iterate through each character in a string', correct: true },
      { text: 'The range function requires exactly three arguments', correct: false },
      { text: 'You can only use range() with for loops', correct: false }
    ],
    animation: 'pulse'
  },
  {
    id: 9,
    title: 'Congratulations!',
    content: `# 🎉 Excellent Work!

You've completed the for loops lesson! You've learned:
- How to use for loops to repeat actions
- How to use range() with different parameters
- How to loop through strings
- How to use the accumulator pattern

In the next lesson, we'll learn about while loops for more flexible repetition!`,
    type: 'explanation',
    animation: 'bounce'
  }
]
},
{
id: 7,
title: 'While Loops',
description: 'Learn how to create loops that continue while a condition is true',
module: 'Control Flow',
moduleId: 2,
difficulty: 'beginner',
duration: 20,
prerequisites: [6],
steps: [
  {
    id: 1,
    title: 'Introduction to While Loops',
    content: `# While Loops in Python

Unlike for loops that iterate a specific number of times, while loops repeat as long as a condition is True.

The basic syntax is:

\`\`\`python
while condition:
# Code to repeat as long as the condition is True
\`\`\`

A while loop will keep executing its code block until the condition becomes False.`,
    type: 'explanation',
    animation: 'slide-in-left'
  },
  {
    id: 2,
    title: 'Basic While Loop',
    content: `# Basic While Loop Example

Here's a simple while loop that counts from 1 to 5:

\`\`\`python
count = 1
while count <= 5:
print(count)
count += 1  # This is the same as count = count + 1
\`\`\`

The loop continues as long as \`count\` is less than or equal to 5.

Important: Always make sure your while loop condition will eventually become False, or your program will run forever (infinite loop)!`,
    type: 'code',
    codeTemplate: 'count = 1\nwhile count <= 5:\n    print(count)\n    count += 1  # This is the same as count = count + 1\n\nprint("Loop finished!")',
    animation: 'fade-in'
  },
  {
    id: 3,
    title: 'While Loop with User Input',
    content: `# Using While Loops with User Input

While loops are great for situations where you don't know how many iterations you need.

For example, let's create a simple guessing game:

\`\`\`python
secret_number = 7
guess = 0

while guess != secret_number:
guess = int(input("Guess the number (1-10): "))
if guess != secret_number:
  print("Wrong guess. Try again!")

print("Correct! You guessed the secret number.")
\`\`\`

This loop will keep asking for guesses until the user guesses correctly.`,
    type: 'code',
    codeTemplate: 'secret_number = 7\nguess = 0\n\nwhile guess != secret_number:\n    guess = int(input("Guess the number (1-10): "))\n    if guess != secret_number:\n        print("Wrong guess. Try again!")\n\nprint("Correct! You guessed the secret number.")',
    animation: 'slide-in-right'
  },
  {
    id: 4,
    title: 'While Loop with Break',
    content: `# Breaking Out of a While Loop

Sometimes you want to exit a loop early, even if the condition is still True.

The \`break\` statement allows you to exit a loop immediately:

\`\`\`python
while True:  # This creates an infinite loop
response = input("Type 'quit' to exit: ")
if response == 'quit':
  break  # Exit the loop
print("You typed:", response)

print("Loop exited!")
\`\`\`

This loop will continue forever (because the condition is always True) until the user types 'quit'.`,
    type: 'code',
    codeTemplate: 'while True:  # This creates an infinite loop\n    response = input("Type \'quit\' to exit: ")\n    if response == \'quit\':\n        break  # Exit the loop\n    print("You typed:", response)\n\nprint("Loop exited!")',
    animation: 'bounce'
  },
  {
    id: 5,
    title: 'While Loop with Continue',
    content: `# Skipping Iterations with Continue

The \`continue\` statement lets you skip the rest of the current iteration and move to the next one:

\`\`\`python
count = 0
while count < 10:
count += 1
if count % 2 == 0:  # If count is even
  continue  # Skip the rest of this iteration
print(count)
\`\`\`

This will print only the odd numbers from 1 to 9 because the even numbers are skipped by the continue statement.`,
    type: 'code',
    codeTemplate: 'count = 0\nwhile count < 10:\n    count += 1\n    if count % 2 == 0:  # If count is even\n        continue  # Skip the rest of this iteration\n    print(count)',
    animation: 'fade-in'
  },
  {
    id: 6,
    title: 'Password Validation Challenge',
    content: `# Password Validation Challenge

Create a program that:
1. Asks the user to create a password
2. The password must be at least 8 characters long
3. Keep asking until they enter a valid password
4. Once they enter a valid password, display a success message`,
    type: 'challenge',
    codeTemplate: '# Write your password validation program here',
    solution: 'while True:\n    password = input("Create a password (must be at least 8 characters): ")\n    if len(password) >=.8:\n        print("Password created successfully!")\n        break\n    else:\n        print("Password is too short. Please try again.")',
    animation: 'slide-in-left'
  },
  {
    id: 7,
    title: 'Number Sum Challenge',
    content: `# Number Sum Challenge

Create a program that:
1. Asks the user to enter numbers one at a time
2. Adds each number to a running total
3. Stops when the user enters 0
4. Displays the final sum`,
    type: 'challenge',
    codeTemplate: '# Write your number sum program here',
    solution: 'sum = 0\n\nwhile True:\n    num = float(input("Enter a number (0 to finish): "))\n    if num == 0:\n        break\n    sum += num\n\nprint("The sum of all numbers is:", sum)',
    animation: 'bounce'
  },
  {
    id: 8,
    title: 'While Loops Quiz',
    content: `# Test Your Knowledge

Let's see what you've learned about while loops:`,
    type: 'quiz',
    options: [
      { text: 'A while loop continues as long as its condition is True', correct: true },
      { text: 'The break statement can be used to exit a while loop early', correct: true },
      { text: 'While loops always execute at least once', correct: false },
      { text: 'The continue statement ends the entire loop', correct: false }
    ],
    animation: 'pulse'
  },
  {
    id: 9,
    title: 'Congratulations!',
    content: `# 🎉 Fantastic Work!

You've completed the while loops lesson! You've learned:
- How to create basic while loops
- How to use while loops with user input
- How to use break to exit loops early
- How to use continue to skip iterations

In the next lesson, we'll learn about lists for storing collections of data!`,
    type: 'explanation',
    animation: 'bounce'
  }
]
},
{
id: 8,
title: 'Lists',
description: 'Learn how to work with lists to store collections of data',
module: 'Data Structures',
moduleId: 3,
difficulty: 'beginner',
duration: 30,
prerequisites: [4, 6],
steps: [
  {
    id: 1,
    title: 'Introduction to Lists',
    content: `# Lists in Python

So far, we've used variables to store single values like numbers or strings. But what if you want to store multiple values?

In Python, a list is an ordered collection of items. Lists can contain any type of data, including numbers, strings, or even other lists.

Here's how to create a list:

\`\`\`python
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
\`\`\`

Lists are written with square brackets, and items are separated by commas.`,
    type: 'explanation',
    animation: 'slide-in-left'
  },
  {
    id: 2,
    title: 'Accessing List Items',
    content: `# Accessing Items in a List

You can access list items by their index (position). In Python, indices start at 0:

\`\`\`python
fruits = ["apple", "banana", "cherry"]

print(fruits[0])  # Prints "apple" (first item)
print(fruits[1])  # Prints "banana" (second item)
print(fruits[2])  # Prints "cherry" (third item)
\`\`\`

You can also use negative indices to access items from the end:

\`\`\`python
print(fruits[-1])  # Prints "cherry" (last item)
print(fruits[-2])  # Prints "banana" (second-to-last item)
\`\`\`

Let's try accessing items in a list:`,
    type: 'code',
    codeTemplate: 'fruits = ["apple", "banana", "cherry", "date", "elderberry"]\n\n# Print the first item\nprint(fruits[0])\n\n# Print the third item\nprint(fruits[2])\n\n# Print the last item\nprint(fruits[-1])\n\n# Print the second-to-last item\nprint(fruits[-2])',
    animation: 'fade-in'
  },
  {
    id: 3,
    title: 'Modifying Lists',
    content: `# Changing List Items

Unlike strings, lists are mutable, which means you can change their content:

\`\`\`python
fruits = ["apple", "banana", "cherry"]

# Change the second item
fruits[1] = "blueberry"
print(fruits)  # Prints ["apple", "blueberry", "cherry"]
\`\`\`

You can also add items to a list using the \`append()\` method:

\`\`\`python
fruits.append("dragonfruit")
print(fruits)  # Prints ["apple", "blueberry", "cherry", "dragonfruit"]
\`\`\`

And remove items using \`remove()\`:

\`\`\`python
fruits.remove("cherry")
print(fruits)  # Prints ["apple", "blueberry", "dragonfruit"]
\`\`\`

Let's practice modifying lists:`,
    type: 'code',
    codeTemplate: 'fruits = ["apple", "banana", "cherry"]\n\n# Change the second item to "blueberry"\nfruits[1] = "blueberry"\nprint(fruits)\n\n# Add "dragonfruit" to the end of the list\nfruits.append("dragonfruit")\nprint(fruits)\n\n# Remove "cherry" from the list\nfruits.remove("cherry")\nprint(fruits)',
    animation: 'slide-in-right'
  },
  {
    id: 4,
    title: 'List Operations',
    content: `# Common List Operations

Python provides many useful operations for working with lists:

\`\`\`python
# List Length
fruits = ["apple", "banana", "cherry"]
print(len(fruits))  # Prints 3

# Checking if an item exists
print("banana" in fruits)  # Prints True
print("mango" in fruits)   # Prints False

# Finding the index of an item
print(fruits.index("cherry"))  # Prints 2

# Counting occurrences of an item
numbers = [1, 2, 2, 3, 2, 4]
print(numbers.count(2))  # Prints 3

# Sorting a list
fruits.sort()
print(fruits)  # Prints ["apple", "banana", "cherry"] (alphabetical order)

# Reversing a list
fruits.reverse()
print(fruits)  # Prints ["cherry", "banana", "apple"] (reversed)
\`\`\`

Let's try some list operations:`,
    type: 'code',
    codeTemplate: 'fruits = ["apple", "banana", "cherry", "apple"]\n\n# Print the length of the list\nprint("Length:", len(fruits))\n\n# Check if "banana" is in the list\nprint("Is banana in the list?", "banana" in fruits)\n\n# Count how many times "apple" appears\nprint("Apple count:", fruits.count("apple"))\n\n# Sort the list\nfruits.sort()\nprint("Sorted list:", fruits)\n\n# Reverse the list\nfruits.reverse()\nprint("Reversed list:", fruits)',
    animation: 'bounce'
  },
  {
    id: 5,
    title: 'Looping Through Lists',
    content: `# Using For Loops with Lists

One of the most common operations is to iterate through all items in a list using a for loop:

\`\`\`python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
print(fruit)
\`\`\`

This will print each fruit on a new line.

You can also use the \`enumerate()\` function to get both the index and value:

\`\`\`python
for index, fruit in enumerate(fruits):
print(f"{index}: {fruit}")
\`\`\`

Let's practice looping through lists:`,
    type: 'code',
    codeTemplate: 'fruits = ["apple", "banana", "cherry", "date", "elderberry"]\n\n# Print all fruits\nprint("All fruits:")\nfor fruit in fruits:\n    print(fruit)\n\n# Print fruits with their indices\nprint("\\nFruits with indices:")\nfor index, fruit in enumerate(fruits):\n    print(f"{index}: {fruit}")',
    animation: 'fade-in'
  },
  {
    id: 6,
    title: 'List Slicing',
    content: `# Getting Parts of Lists with Slicing

List slicing allows you to extract a portion of a list:

\`\`\`python
fruits = ["apple", "banana", "cherry", "date", "elderberry"]

# Get a slice from index 1 to index 3 (exclusive)
print(fruits[1:3])  # Prints ["banana", "cherry"]

# Get everything from index 2 onwards
print(fruits[2:])  # Prints ["cherry", "date", "elderberry"]

# Get everything up to index 3 (exclusive)
print(fruits[:3])  # Prints ["apple", "banana", "cherry"]

# Get the last 2 items
print(fruits[-2:])  # Prints ["date", "elderberry"]
\`\`\`

Let's practice list slicing:`,
    type: 'code',
    codeTemplate: 'fruits = ["apple", "banana", "cherry", "date", "elderberry"]\n\n# Get items from index 1 to 3 (exclusive)\nprint(fruits[1:3])\n\n# Get everything from index 2 onwards\nprint(fruits[2:])\n\n# Get everything up to index 3 (exclusive)\nprint(fruits[:3])\n\n# Get the last 2 items\nprint(fruits[-2:])',
    animation: 'slide-in-left'
  },
  {
    id: 7,
    title: 'Shopping List Challenge',
    content: `# Shopping List Challenge

Create a simple shopping list program that:
1. Starts with an empty list
2. Allows the user to add items to the list
3. Allows the user to remove items from the list
4. Displays the current list when requested
5. Quits when the user types "exit"

For example:
- 'add apple' adds "apple" to the list
- 'remove apple' removes "apple" from the list
- 'show' displays the current list
- 'exit' ends the program`,
    type: 'challenge',
    codeTemplate: '# Create an empty shopping list\n\n# Start the main loop\n\n# Handle user commands',
    solution: 'shopping_list = []\n\nwhile True:\n    command = input("Enter command (add/remove/show/exit): ").split()\n    \n    if len(command) == 0:\n        continue\n        \n    if command[0] == "exit":\n        print("Goodbye!")\n        break\n    elif command[0] == "show":\n        if shopping_list:\n            print("Shopping List:")\n            for i, item in enumerate(shopping_list, 1):\n                print(f"{i}. {item}")\n        else:\n            print("Your shopping list is empty.")\n    elif command[0] == "add" and len(command) > 1:\n        item = " ".join(command[1:])\n        shopping_list.append(item)\n        print(f"\'{item}\' added to the list.")\n    elif command[0] == "remove" and len(command) > 1:\n        item = " ".join(command[1:])\n        if item in shopping_list:\n            shopping_list.remove(item)\n            print(f"\'{item}\' removed from the list.")\n        else:\n            print(f"\'{item}\' is not in the list.")\n    else:\n        print("Invalid command. Try add/remove/show/exit.")',
    animation: 'bounce'
  },
  {
    id: 8,
    title: 'Average Calculator Challenge',
    content: `# Average Calculator Challenge

Create a program that:
1. Asks the user to input a series of numbers
2. Stores the numbers in a list
3. Calculates the average (mean) of the numbers
4. Finds the maximum and minimum values
5. Displays the results

Hint: Use a while loop to keep asking for numbers until the user enters 'done'`,
    type: 'challenge',
    codeTemplate: '# Create an empty list for the numbers\n\n# Ask for numbers until the user enters "done"\n\n# Calculate and display results',
    solution: 'numbers = []\n\nwhile True:\n    user_input = input("Enter a number (or \'done\' to finish): ")\n    \n    if user_input.lower() == "done":\n        break\n        \n    try:\n        number = float(user_input)\n        numbers.append(number)\n    except ValueError:\n        print("Invalid input. Please enter a number or \'done\'.")\n\nif numbers:\n    # Calculate statistics\n    average = sum(numbers) / len(numbers)\n    maximum = max(numbers)\n    minimum = min(numbers)\n    \n    # Display results\n    print(f"\\nNumbers entered: {numbers}")\n    print(f"Count: {len(numbers)}")\n    print(f"Average: {average:.2f}")\n    print(f"Maximum: {maximum}")\n    print(f"Minimum: {minimum}")\nelse:\n    print("No numbers were entered.")',
    animation: 'slide-in-right'
  },
  {
    id: 9,
    title: 'Lists Quiz',
    content: `# Test Your Knowledge

Let's see what you've learned about lists:`,
    type: 'quiz',
    options: [
      { text: 'List indices in Python start at 0', correct: true },
      { text: 'You can use append() to add an item to the end of a list', correct: true },
      { text: 'Lists can only contain items of the same data type', correct: false },
      { text: 'You cannot change the items in a list after it\'s created', correct: false }
    ],
    animation: 'pulse'
  },
  {
    id: 10,
    title: 'Congratulations!',
    content: `# 🎉 Fantastic Work!

You've completed the lists lesson! You've learned:
- How to create and access items in lists
- How to modify lists by adding, removing, and changing items
- How to use common list operations and methods
- How to loop through lists and use list slicing

In the next lesson, we'll learn about dictionaries for storing key-value pairs!`,
    type: 'explanation',
    animation: 'bounce'
  }
]
},
{
    id: 9,
    title: 'Dictionaries',
    description: 'Learn how to create and use dictionaries to organize and reuse code',
    module: 'Data Structures',
    moduleId: 3,
    difficulty: 'intermediate',
    duration: 35,
    prerequisites: [4, 5],
    steps: [
// Completing the Dictionaries lesson and adding the final lesson
{
    id: 1,
    title: 'Introduction to Dictionaries',
    content: `# Dictionaries in Python

While lists store items in a specific order, dictionaries store data as key-value pairs.

Think of a dictionary like a real-world dictionary: you look up a word (the key) to find its definition (the value).

Here's how to create a dictionary:

\`\`\`python
student = {
    "name": "Alex",
    "age": 15,
    "grade": 9,
    "subjects": ["Math", "Science", "History"]
}
\`\`\`

Dictionaries are written with curly braces. Each key-value pair is separated by a colon, and pairs are separated by commas.

Keys must be unique and immutable (like strings, numbers, or tuples), but values can be any data type (even lists or other dictionaries).`,
    type: 'explanation',
    animation: 'slide-in-left'
  },
  {
    id: 2,
    title: 'Accessing Dictionary Values',
    content: `# Accessing Values in a Dictionary

You can access dictionary values by referring to their keys:

\`\`\`python
student = {
    "name": "Alex",
    "age": 15,
    "grade": 9
}

print(student["name"])  # Prints "Alex"
print(student["age"])   # Prints 15
\`\`\`

You can also use the \`get()\` method, which has the advantage of not raising an error if the key doesn't exist:

\`\`\`python
print(student.get("name"))  # Prints "Alex"
print(student.get("phone"))  # Prints None (since "phone" doesn't exist)
print(student.get("phone", "Not available"))  # Prints "Not available" (default value)
\`\`\`

Let's practice accessing dictionary values:`,
    type: 'code',
    codeTemplate: 'student = {\n    "name": "Alex",\n    "age": 15,\n    "grade": 9,\n    "subjects": ["Math", "Science", "History"]\n}\n\n# Print the student\'s name\nprint(student["name"])\n\n# Print the student\'s age\nprint(student["age"])\n\n# Print the first subject using both dictionary and list syntax\nprint(student["subjects"][0])\n\n# Try to get "phone" with a default value\nprint(student.get("phone", "Not available"))',
    animation: 'fade-in'
  },
  {
    id: 3,
    title: 'Modifying Dictionaries',
    content: `# Changing Dictionary Values

Dictionaries are mutable, so you can change, add, or remove key-value pairs:

\`\`\`python
student = {
    "name": "Alex",
    "age": 15,
    "grade": 9
}

# Change a value
student["age"] = 16
print(student)  # Age is now 16

# Add a new key-value pair
student["phone"] = "555-1234"
print(student)  # Now has a phone key

# Remove a key-value pair
del student["grade"]
print(student)  # No longer has a grade key
\`\`\`

You can also use \`pop()\` to remove a key and return its value:

\`\`\`python
phone = student.pop("phone")
print(phone)  # Prints "555-1234"
print(student)  # No longer has a phone key
\`\`\`

Let's practice modifying dictionaries:`,
    type: 'code',
    codeTemplate: 'student = {\n    "name": "Alex",\n    "age": 15,\n    "grade": 9\n}\n\n# Change the age to 16\nstudent["age"] = 16\nprint(student)\n\n# Add a new key-value pair for "email"\nstudent["email"] = "alex@example.com"\nprint(student)\n\n# Remove the grade using del\ndel student["grade"]\nprint(student)\n\n# Remove the email using pop and print the returned value\nemail = student.pop("email")\nprint("Removed email:", email)\nprint(student)',
    animation: 'slide-in-right'
  },
  {
    id: 4,
    title: 'Dictionary Methods',
    content: `# Common Dictionary Methods

Python provides several useful methods for working with dictionaries:

\`\`\`python
student = {
    "name": "Alex",
    "age": 15,
    "grade": 9
}

# Get all keys
print(list(student.keys()))  # Prints ["name", "age", "grade"]

# Get all values
print(list(student.values()))  # Prints ["Alex", 15, 9]

# Get all key-value pairs as tuples
print(list(student.items()))  # Prints [("name", "Alex"), ("age", 15), ("grade", 9)]

# Check if a key exists
print("name" in student)  # Prints True
print("phone" in student)  # Prints False

# Copy a dictionary
student_copy = student.copy()
print(student_copy)  # Creates a new copy of the dictionary

# Clear all items
student.clear()
print(student)  # Prints {} (empty dictionary)
\`\`\`

Let's practice using dictionary methods:`,
    type: 'code',
    codeTemplate: 'student = {\n    "name": "Alex",\n    "age": 15,\n    "grade": 9,\n    "subjects": ["Math", "Science", "History"]\n}\n\n# Print all keys\nprint("Keys:", list(student.keys()))\n\n# Print all values\nprint("Values:", list(student.values()))\n\n# Print all key-value pairs\nprint("Items:", list(student.items()))\n\n# Check if "grade" and "phone" exist\nprint("Has grade:", "grade" in student)\nprint("Has phone:", "phone" in student)\n\n# Create a copy and modify it\nstudent_copy = student.copy()\nstudent_copy["name"] = "Alex Smith"\nprint("Original:", student["name"])\nprint("Copy:", student_copy["name"])',
    animation: 'bounce'
  },
  {
    id: 5,
    title: 'Looping Through Dictionaries',
    content: `# Iterating Through Dictionaries

You can use a for loop to iterate through a dictionary:

\`\`\`python
student = {
    "name": "Alex",
    "age": 15,
    "grade": 9
}

# Loop through keys (default)
for key in student:
    print(key)  # Prints each key

# Loop through keys explicitly
for key in student.keys():
    print(key)  # Prints each key

# Loop through values
for value in student.values():
    print(value)  # Prints each value

# Loop through both keys and values
for key, value in student.items():
    print(f"{key}: {value}")  # Prints each key-value pair
\`\`\`

Let's practice looping through dictionaries:`,
    type: 'code',
    codeTemplate: 'student = {\n    "name": "Alex",\n    "age": 15,\n    "grade": 9,\n    "subjects": ["Math", "Science", "History"]\n}\n\n# Print all key-value pairs in a readable format\nprint("Student Information:")\nfor key, value in student.items():\n    print(f"{key}: {value}")\n\n# Print all subject names from the subjects list\nprint("\\nSubjects:")\nfor subject in student["subjects"]:\n    print(f"- {subject}")',
    animation: 'fade-in'
  },
  {
    id: 6,
    title: 'Nested Dictionaries',
    content: `# Dictionaries Within Dictionaries

Dictionaries can contain other dictionaries, allowing you to create complex data structures:

\`\`\`python
contacts = {
    "Alex": {
        "phone": "555-1234",
        "email": "alex@example.com"
    },
    "Sam": {
        "phone": "555-5678",
        "email": "sam@example.com",
        "address": "123 Main St"
    }
}

# Access nested data
print(contacts["Alex"]["phone"])  # Prints "555-1234"
print(contacts["Sam"]["address"])  # Prints "123 Main St"
\`\`\`

This is how many real-world data structures are organized, like JSON data from web APIs.

Let's practice with nested dictionaries:`,
    type: 'code',
    codeTemplate: 'school = {\n    "students": {\n        "Alex": {\n            "grade": 9,\n            "subjects": ["Math", "Science", "History"]\n        },\n        "Sam": {\n            "grade": 10,\n            "subjects": ["Physics", "Chemistry", "Literature"]\n        }\n    },\n    "teachers": {\n        "Ms. Johnson": {\n            "subject": "Math",\n            "room": "101"\n        },\n        "Mr. Davis": {\n            "subject": "Science",\n            "room": "102"\n        }\n    }\n}\n\n# Print Alex\'s grade\nprint(f"Alex\'s grade: {school[\'students\'][\'Alex\'][\'grade\']}")\n\n# Print Sam\'s subjects\nprint(f"Sam\'s subjects: {school[\'students\'][\'Sam\'][\'subjects\']}")\n\n# Print Mr. Davis\'s room number\nprint(f"Mr. Davis\'s room: {school[\'teachers\'][\'Mr. Davis\'][\'room\']}")',
    animation: 'slide-in-left'
  },
  {
    id: 7,
    title: 'Contact Book Challenge',
    content: `# Contact Book Challenge

Create a simple contact book program that:
1. Starts with an empty dictionary
2. Allows the user to add a contact (name, phone, email)
3. Allows the user to look up a contact by name
4. Allows the user to delete a contact
5. Allows the user to list all contacts
6. Quits when the user types "exit"

For example:
- 'add John 555-1234 john@example.com' adds a new contact
- 'lookup John' displays John's contact information
- 'delete John' removes John's contact
- 'list' shows all contacts
- 'exit' ends the program`,
    type: 'challenge',
    codeTemplate: '# Create an empty contacts dictionary\n\n# Start the main loop\n\n# Handle user commands',
    solution: 'contacts = {}\n\nwhile True:\n    command = input("\\nEnter command (add/lookup/delete/list/exit): ").split()\n    \n    if len(command) == 0:\n        continue\n        \n    if command[0] == "exit":\n        print("Goodbye!")\n        break\n        \n    elif command[0] == "list":\n        if contacts:\n            print("\\nContacts:")\n            for name, info in contacts.items():\n                print(f"{name}: {info[\'phone\']}, {info[\'email\']}")\n        else:\n            print("No contacts found.")\n            \n    elif command[0] == "lookup" and len(command) > 1:\n        name = command[1]\n        if name in contacts:\n            info = contacts[name]\n            print(f"\\nName: {name}")\n            print(f"Phone: {info[\'phone\']}")\n            print(f"Email: {info[\'email\']}")\n        else:\n            print(f"Contact {name} not found.")\n            \n    elif command[0] == "delete" and len(command) > 1:\n        name = command[1]\n        if name in contacts:\n            del contacts[name]\n            print(f"Contact {name} deleted.")\n        else:\n            print(f"Contact {name} not found.")\n            \n    elif command[0] == "add" and len(command) >= 4:\n        name = command[1]\n        phone = command[2]\n        email = command[3]\n        contacts[name] = {"phone": phone, "email": email}\n        print(f"Contact {name} added.")\n        \n    else:\n        print("Invalid command. Try add/lookup/delete/list/exit.")',
    animation: 'bounce'
  },
  {
    id: 8,
    title: 'Word Counter Challenge',
    content: `# Word Counter Challenge

Create a program that:
1. Asks the user to enter a sentence or paragraph
2. Counts how many times each word appears
3. Displays the results in alphabetical order

For example, if the input is:
"the quick brown fox jumps over the lazy dog"

The output would be:
- brown: 1
- dog: 1
- fox: 1
- jumps: 1
- lazy: 1
- over: 1
- quick: 1
- the: 2

Hint: Use a dictionary to store the words as keys and their counts as values.`,
    type: 'challenge',
    codeTemplate: '# Get the text from the user\n\n# Count the words\n\n# Display the results',
    solution: 'text = input("Enter a sentence or paragraph: ").lower()\n\n# Remove punctuation (simple approach)\nfor char in ".,;:!?":\n    text = text.replace(char, "")\n\n# Split text into words\nwords = text.split()\n\n# Count the words using a dictionary\nword_counts = {}\n\nfor word in words:\n    if word in word_counts:\n        word_counts[word] += 1\n    else:\n        word_counts[word] = 1\n\n# Display the results in alphabetical order\nprint("\\nWord counts:")\nfor word in sorted(word_counts.keys()):\n    print(f"- {word}: {word_counts[word]}")',
    animation: 'slide-in-right'
  },
  {
    id: 9,
    title: 'Dictionaries Quiz',
    content: `# Test Your Knowledge

Let's see what you've learned about dictionaries:`,
    type: 'quiz',
    options: [
      { text: 'Dictionary keys must be unique', correct: true },
      { text: 'You can use dict.get() to provide a default value if a key doesn\'t exist', correct: true },
      { text: 'Dictionaries maintain the order of insertion like lists do', correct: true },
      { text: 'Dictionary keys can be any data type, including lists', correct: false }
    ],
    animation: 'pulse'
  },
  {
    id: 10,
    title: 'Congratulations!',
    content: `# 🎉 Excellent Work!

You've completed the dictionaries lesson! You've learned:
- How to create dictionaries and access values using keys
- How to modify dictionaries by adding, changing, and removing items
- How to use common dictionary methods
- How to loop through dictionary keys, values, and items
- How to work with nested dictionaries

In the next lesson, we'll learn about functions for organizing and reusing code!`,
    type: 'explanation',
    animation: 'bounce'
  }
]
},
{
  id: 10,
  title: 'Functions',
  description: 'Learn how to create and use functions to organize and reuse code',
  module: 'Data Structures',
  moduleId: 3,
  difficulty: 'intermediate',
  duration: 35,
  prerequisites: [4, 5],
  steps: [
    {
      id: 1,
      title: 'Introduction to Functions',
      content: `# Functions in Python

So far, we've been writing code that runs line by line from top to bottom. But as programs get larger, we need a way to organize our code into reusable pieces.

That's where functions come in. A function is a block of code that performs a specific task and can be reused throughout your program.

Here's the basic syntax for defining a function:

\`\`\`python
def function_name(parameters):
    # Function body (code to run)
    # ...
    return result  # Optional return value
\`\`\`

The \`def\` keyword tells Python you're defining a function. The function name should describe what the function does.`,
      type: 'explanation',
      animation: 'slide-in-left'
    },
    {
      id: 2,
      title: 'Creating Simple Functions',
      content: `# Creating Your First Function

Let's create a simple function that greets someone:

\`\`\`python
def greet(name):
    message = f"Hello, {name}!"
    return message

# Call the function
greeting = greet("Alex")
print(greeting)  # Prints "Hello, Alex!"

# Call it again with a different argument
print(greet("Sam"))  # Prints "Hello, Sam!"
\`\`\`

Notice:
1. We define the function with \`def greet(name):\`
2. The function takes one parameter: \`name\`
3. The function returns a message using \`return\`
4. We call the function by writing \`greet("Alex")\`

Let's create some simple functions:`,
      type: 'code',
      codeTemplate: '# Define a function that greets someone\ndef greet(name):\n    message = f"Hello, {name}!"\n    return message\n\n# Call the function with different names\nprint(greet("Alex"))\nprint(greet("Sam"))\n\n# Define a function that squares a number\ndef square(number):\n    return number ** 2\n\n# Call the square function\nprint(square(4))  # Should print 16\nprint(square(5))  # Should print 25',
      animation: 'fade-in'
    },
    {
      id: 3,
      title: 'Function Parameters',
      content: `# Working with Function Parameters

Functions can take multiple parameters (inputs):

\`\`\`python
def add(a, b):
    return a + b

result = add(3, 5)
print(result)  # Prints 8
\`\`\`

You can also provide default values for parameters:

\`\`\`python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alex"))             # Prints "Hello, Alex!"
print(greet("Sam", "Hi there"))  # Prints "Hi there, Sam!"
\`\`\`

Parameters with default values are optional - if you don't provide them, the default is used.

Let's practice creating functions with parameters:`,
      type: 'code',
      codeTemplate: '# Function with multiple parameters\ndef calculate_total(price, tax_rate):\n    tax = price * tax_rate\n    total = price + tax\n    return total\n\n# Call the function\nprint(calculate_total(100, 0.05))  # Price of 100 with 5% tax\n\n# Function with default parameter\ndef greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\n# Call with and without the optional parameter\nprint(greet("Alex"))             # Using default greeting\nprint(greet("Sam", "Hi there"))  # Providing a custom greeting',
      animation: 'slide-in-right'
    },
    {
      id: 4,
      title: 'Return Values',
      content: `# Understanding Return Values

Functions can return values that you can use elsewhere in your code:

\`\`\`python
def multiply(a, b):
    return a * b

result = multiply(4, 5)
print(result)  # Prints 20
print(multiply(3, 7))  # Prints 21
\`\`\`

Functions can return different values based on conditions:

\`\`\`python
def get_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

print(get_grade(85))  # Prints "B"
print(get_grade(72))  # Prints "C"
\`\`\`

A function ends as soon as it hits a \`return\` statement.

Let's practice with return values:`,
      type: 'code',
      codeTemplate: '# Function that returns a value\ndef multiply(a, b):\n    return a * b\n\n# Store the result in a variable\nresult = multiply(4, 5)\nprint(result)\n\n# Function that returns different values based on conditions\ndef get_letter_grade(score):\n    if score >= 90:\n        return "A"\n    elif score >= 80:\n        return "B"\n    elif score >= 70:\n        return "C"\n    elif score >= 60:\n        return "D"\n    else:\n        return "F"\n\n# Test the function\nprint(get_letter_grade(95))  # Should print "A"\nprint(get_letter_grade(81))  # Should print "B"\nprint(get_letter_grade(65))  # Should print "D"',
      animation: 'bounce'
    },
    {
      id: 5,
      title: 'Functions Without Return',
      content: `# Functions That Don't Return Values

Not all functions need to return values. Some functions just perform actions:

\`\`\`python
def print_header(text):
    print("=" * 30)
    print(text)
    print("=" * 30)

print_header("WELCOME")
\`\`\`

This function doesn't return anything—it just prints a formatted header.

If a function doesn't have a \`return\` statement, it implicitly returns \`None\`:

\`\`\`python
def say_hello(name):
    print(f"Hello, {name}!")

result = say_hello("Alex")
print(result)  # Prints None
\`\`\`

Let's create some functions that don't return values:`,
      type: 'code',
      codeTemplate: '# Function that just prints a formatted message\ndef print_header(text):\n    print("=" * 30)\n    print(text.center(30))\n    print("=" * 30)\n\n# Call the function\nprint_header("WELCOME")\nprint_header("PYTHON FUNCTIONS")\n\n# Function that prints a countdown\ndef countdown(n):\n    print("Starting countdown...")\n    for i in range(n, 0, -1):\n        print(i)\n    print("Blast off!")\n\n# Call the function\ncountdown(5)',
      animation: 'fade-in'
    },
    {
      id: 6,
      title: 'Combining Functions',
      content: `# Using Functions with Other Functions

One of the great benefits of functions is that they can use other functions:

\`\`\`python
def get_first_name():
    return input("Enter your first name: ")

def get_last_name():
    return input("Enter your last name: ")

def greet_user():
    first = get_first_name()
    last = get_last_name()
    print(f"Hello, {first} {last}!")

greet_user()
\`\`\`

This makes your code more organized and easier to understand.

Let's practice combining functions:`,
      type: 'code',
      codeTemplate: '# Function to calculate the area of a circle\ndef calculate_area(radius):\n    import math\n    return math.pi * radius ** 2\n\n# Function to calculate the circumference of a circle\ndef calculate_circumference(radius):\n    import math\n    return 2 * math.pi * radius\n\n# Function that uses both functions above\ndef display_circle_info(radius):\n    area = calculate_area(radius)\n    circumference = calculate_circumference(radius)\n    \n    print(f"Circle with radius {radius}:")\n    print(f"Area: {area:.2f} square units")\n    print(f"Circumference: {circumference:.2f} units")\n\n# Call the combined function\ndisplay_circle_info(5)\nprint()\ndisplay_circle_info(7.5)',
      animation: 'slide-in-left'
    },
    {
      id: 7,
      title: 'Temperature Converter Challenge',
      content: `# Temperature Converter Functions Challenge

Create three functions:
1. \`celsius_to_fahrenheit(celsius)\` - converts Celsius to Fahrenheit
2. \`fahrenheit_to_celsius(fahrenheit)\` - converts Fahrenheit to Celsius
3. \`temperature_converter()\` - main function that:
   - Asks the user which conversion they want to do
   - Gets the temperature value
   - Calls the appropriate conversion function
   - Displays the result

Remember:
- C to F: F = C * 9/5 + 32
- F to C: C = (F - 32) * 5/9`,
      type: 'challenge',
      codeTemplate: '# Define the celsius_to_fahrenheit function\n\n# Define the fahrenheit_to_celsius function\n\n# Define the main temperature_converter function\n\n# Call the main function',
      solution: 'def celsius_to_fahrenheit(celsius):\n    fahrenheit = celsius * 9/5 + 32\n    return fahrenheit\n\ndef fahrenheit_to_celsius(fahrenheit):\n    celsius = (fahrenheit - 32) * 5/9\n    return celsius\n\ndef temperature_converter():\n    print("Temperature Converter")\n    print("1. Celsius to Fahrenheit")\n    print("2. Fahrenheit to Celsius")\n    \n    choice = input("Enter your choice (1/2): ")\n    \n    if choice == "1":\n        celsius = float(input("Enter temperature in Celsius: "))\n        fahrenheit = celsius_to_fahrenheit(celsius)\n        print(f"{celsius}°C is equal to {fahrenheit:.2f}°F")\n    elif choice == "2":\n        fahrenheit = float(input("Enter temperature in Fahrenheit: "))\n        celsius = fahrenheit_to_celsius(fahrenheit)\n        print(f"{fahrenheit}°F is equal to {celsius:.2f}°C")\n    else:\n        print("Invalid choice.")\n\n# Call the main function\ntemperature_converter()',
      animation: 'bounce'
    },
    {
      id: 8,
      title: 'Calculator Function Challenge',
      content: `# Calculator Function Challenge

Create a calculator program using functions:
1. Create separate functions for:
   - \`add(a, b)\` - returns a + b
   - \`subtract(a, b)\` - returns a - b
   - \`multiply(a, b)\` - returns a * b
   - \`divide(a, b)\` - returns a / b (handle division by zero)
2. Create a main \`calculator()\` function that:
   - Asks the user for two numbers
   - Asks the user for an operation (+, -, *, /)
   - Calls the appropriate function
   - Displays the result
3. Allow the user to perform multiple calculations until they choose to quit`,
      type: 'challenge',
      codeTemplate: '# Define the basic math functions\n\n# Define the main calculator function\n\n# Call the main function',
      solution: 'def add(a, b):\n    return a + b\n\ndef subtract(a, b):\n    return a - b\n\ndef multiply(a, b):\n    return a * b\n\ndef divide(a, b):\n    if b == 0:\n        return "Error: Division by zero"\n    return a / b\n\ndef calculator():\n    while True:\n        print("\\nCalculator")\n        print("Enter \'q\' to quit")\n        \n        # Get first number or quit\n        num1 = input("\\nEnter first number: ")\n        if num1.lower() == \'q\':\n            break\n            \n        try:\n            num1 = float(num1)\n        except ValueError:\n            print("Invalid number. Try again.")\n            continue\n            \n        # Get second number\n        try:\n            num2 = float(input("Enter second number: "))\n        except ValueError:\n            print("Invalid number. Try again.")\n            continue\n            \n        # Get operation\n        operation = input("Enter operation (+, -, *, /): ")\n        \n        # Perform calculation\n        if operation == \'+\':\n            result = add(num1, num2)\n        elif operation == \'-\':\n            result = subtract(num1, num2)\n        elif operation == \'*\':\n            result = multiply(num1, num2)\n        elif operation == \'/\':\n            result = divide(num1, num2)\n        else:\n            print("Invalid operation. Try again.")\n            continue\n            \n        print(f"Result: {num1} {operation} {num2} = {result}")\n    \n    print("Goodbye!")\n\n# Call the main function\ncalculator()',
      animation: 'slide-in-right'
    },
    {
      id: 9,
      title: 'Functions Quiz',
      content: `# Test Your Knowledge

Let's see what you've learned about functions:`,
      type: 'quiz',
      options: [
        { text: 'Functions are defined using the def keyword', correct: true },
        { text: 'Functions can call other functions', correct: true },
        { text: 'A function without a return statement implicitly returns None', correct: true },
        { text: 'You must always provide all parameters when calling a function', correct: false }
      ],
      animation: 'pulse'
    },
    {
      id: 10,
      title: 'Congratulations!',
      content: `# 🎉 Outstanding Work!

You've completed the functions lesson and the entire Python Basics course! You've learned:
- How to create and call functions
- How to use parameters with and without default values
- How to return values from functions
- How to create functions that work together
- How to organize code into reusable pieces

Functions are one of the most important concepts in programming because they help you organize your code, avoid repetition, and make your programs easier to understand and maintain.

Keep practicing by creating your own functions to solve problems. The more you use them, the more comfortable you'll become!`,
      type: 'explanation',
      animation: 'bounce'
    }
  ]
}]