pythonchik/
├── .env
├── app/
│   ├── (home)/
│   │   └── page.tsx
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── lessons/
│   │   │   ├── [lessonId]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── playground/
│   │   │   └── page.tsx
│   │   └── profile/
│   │       └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── lessons/
│   │   │   └── route.ts
│   │   └── code-execution/
│   │       └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── lessons/
│   │   ├── LessonCard.tsx
│   │   └── LessonsList.tsx
│   ├── playground/
│   │   └── CodeEditor.tsx
│   └── ui/
│       └── Button.tsx
├── lib/
│   ├── db.ts
│   └── auth.ts
├── public/
│   └── images/
└── tailwind.config.js