# ClosetIQ Development Guide

## Project Structure

```
closetiq/
├── frontend/                 # React + Vite frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Redux store configuration
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   ├── styles/          # Global styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/              # Static assets
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .env.example
│
├── backend/                  # Node.js + Express backend
│   ├── src/
│   │   ├── models/          # Mongoose models
│   │   ├── controllers/     # Route controllers
│   │   ├── routes/          # Express routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── config/          # Configuration files
│   │   ├── utils/           # Utility functions
│   │   └── server.js        # Express app entry point
│   ├── package.json
│   └── .env.example
│
├── SETUP.md                  # Setup instructions
├── ARCHITECTURE.md           # Architecture documentation
├── README.md                 # Project overview
└── .editorconfig            # Editor configuration
```

## Development Workflow

### 1. Starting the Application

**Terminal 1 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
npm install
npm run dev
```

### 2. Making Changes

#### Frontend Changes
- Components: `src/components/`
- Pages: `src/pages/`
- Styles: `src/styles/` or use Tailwind CSS classes
- State: Update Redux slices in `src/store/slices/`
- API: Update services in `src/services/`

#### Backend Changes
- Routes: Add/modify in `src/routes/`
- Controllers: Add/modify in `src/controllers/`
- Models: Add/modify in `src/models/`
- Middleware: Add/modify in `src/middleware/`

### 3. Code Style

Follow these conventions:
- **Variables**: camelCase
- **Classes**: PascalCase
- **Constants**: UPPER_SNAKE_CASE
- **Files**: kebab-case.js or PascalCase.jsx

### 4. Component Conventions

```jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

// Import components after React imports
import Card from '@/components/common/Card';

export default function MyComponent() {
  // Hooks at the top
  const [state, setState] = useState(null);

  // Functions in the middle
  const handleClick = () => {};

  // JSX at the bottom
  return (
    <motion.div>
      <Card>
        {/* Component content */}
      </Card>
    </motion.div>
  );
}
```

### 5. API Integration

```javascript
// In services/services.js
export const exampleService = {
  getExample: () => api.get('/example'),
  createExample: (data) => api.post('/example', data),
};

// In component
import { useAsyncForm } from '@/hooks/useFetch';
import { exampleService } from '@/services/services';

const { data, loading, execute } = useFetch(exampleService.getExample);
```

### 6. Redux State Management

```javascript
// Dispatch action
import { setUser } from '@/store/slices/authSlice';
dispatch(setUser(userData));

// Use selector
import { useAuth } from '@/hooks/useRedux';
const { user, isAuthenticated } = useAuth();
```

## Common Tasks

### Adding a New Page

1. Create component in `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/common/Navbar.jsx`

### Adding a New API Endpoint

1. Create model in `backend/src/models/Model.js`
2. Create controller in `backend/src/controllers/modelController.js`
3. Create route in `backend/src/routes/model.js`
4. Add route import in `backend/src/server.js`
5. Create service in `frontend/src/services/services.js`

### Styling Components

Use Tailwind CSS classes:
```jsx
<div className="flex items-center justify-between px-4 py-2 bg-primary-50 rounded-lg hover:shadow-soft transition">
  {/* Content */}
</div>
```

### Adding Animations

Use Framer Motion:
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {/* Animated content */}
</motion.div>
```

## Debugging

### Frontend Debugging

1. Open DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for API calls
4. Use Redux DevTools extension
5. Add console.log for debugging

### Backend Debugging

1. Check terminal output for errors
2. Use `console.log()` for debugging
3. Check MongoDB Atlas for data
4. Use Postman to test API
5. Check .env file for configuration

## Testing Checklist

Before pushing code:
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Responsive on mobile/tablet/desktop
- [ ] All links working
- [ ] Forms validating properly
- [ ] API calls working
- [ ] State management working
- [ ] No hardcoded values
- [ ] Code formatted properly
- [ ] Comments where needed

## Performance Tips

1. **Images**: Use Cloudinary transforms
2. **Components**: Use React.memo() for static components
3. **Lists**: Add key prop to list items
4. **API calls**: Implement pagination
5. **State**: Use selectors for Redux
6. **Build**: Check bundle size with `npm run build`

## Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning
- `refactor`: Code change without feature change
- `perf`: Performance improvement
- `test`: Adding tests

Example:
```
feat: add wardrobe gap analysis feature

- Analyze wardrobe items by category
- Calculate percentage of each category
- Show recommendations for missing items

Closes #123
```

## Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Framer Motion Guide](https://www.framer.com/motion)
- [Redux Toolkit Guide](https://redux-toolkit.js.org)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)

## Getting Help

1. Check existing code for examples
2. Read documentation
3. Search GitHub issues
4. Ask in team chat
5. Create detailed issue with reproduction steps

---

**Happy developing! 🚀**
