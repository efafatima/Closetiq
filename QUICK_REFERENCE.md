# ClosetIQ - Quick Reference Guide

## 🚀 Getting Started (First Time)

```bash
# 1. Backend Setup
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev

# 2. Frontend Setup (New Terminal)
cd frontend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

## 📋 Common Commands

### Frontend Commands

```bash
# Development
npm run dev              # Start dev server (port 5173)
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint

# Dependencies
npm install              # Install dependencies
npm update               # Update dependencies
npm install package-name # Add new package
```

### Backend Commands

```bash
# Development
npm run dev              # Start dev server with nodemon
npm start                # Start production server
npm test                 # Run tests (when configured)

# Dependencies
npm install              # Install dependencies
npm update               # Update dependencies
npm install package-name # Add new package
```

## 🔧 Project Structure Reference

```
src/
├── components/          # Reusable React components
├── pages/               # Full page components
├── store/               # Redux store configuration
├── services/            # API service methods
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
└── styles/              # CSS files
```

## 🎨 Styling

### Tailwind Classes (Common)

```jsx
// Layout
<div className="flex items-center justify-between">

// Spacing
className="px-4 py-2 mb-4"

// Colors
className="bg-accent-600 text-white"

// Sizing
className="w-full h-64"

// Responsive
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Effects
className="rounded-lg shadow-soft hover:shadow-premium transition"
```

### Custom Tailwind Colors

```
Primary:   bg-primary-50, bg-primary-100
Secondary: bg-secondary-100, bg-secondary-200
Accent:    bg-accent-600, bg-accent-700
Text:      text-text-primary, text-text-secondary
```

## 🔐 Authentication

### Login Flow

```javascript
// In component
import { authService } from '@/services/services';

const { loading, handleSubmit } = useAsyncForm(async (data) => {
  const res = await authService.login(data.email, data.password);
  localStorage.setItem('token', res.data.token);
  navigate('/dashboard');
});
```

### Protected Routes

```javascript
// In App.jsx
import { useAuth } from '@/hooks/useRedux';

<Route 
  path="/dashboard" 
  element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
/>
```

## 📦 API Integration

### Service Method Template

```javascript
// In src/services/services.js
export const exampleService = {
  getAll: () => api.get('/example'),
  getById: (id) => api.get(`/example/${id}`),
  create: (data) => api.post('/example', data),
  update: (id, data) => api.put(`/example/${id}`, data),
  delete: (id) => api.delete(`/example/${id}`),
};
```

### Using Services in Components

```jsx
import { useFetch } from '@/hooks/useFetch';
import { exampleService } from '@/services/services';

export default function MyComponent() {
  const { data, loading, error, execute } = useFetch(exampleService.getAll);

  useEffect(() => {
    execute();
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (error) return <div>{error}</div>;

  return <div>{/* render data */}</div>;
}
```

## 🎬 Animations

### Framer Motion Basics

```jsx
import { motion } from 'framer-motion';

// Simple animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// On view animation
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Hover animation
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

## 🗂️ Redux State

### Using Redux

```jsx
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/store/slices/authSlice';

export default function MyComponent() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const handleLogin = () => {
    dispatch(setUser(userData));
  };

  return <div>{user?.name}</div>;
}
```

### Custom Hooks

```javascript
import { useAuth } from '@/hooks/useRedux';

const { user, isAuthenticated, dispatch } = useAuth();
```

## 🐛 Debugging

### Frontend

```javascript
// Log Redux state
import { useSelector } from 'react-redux';
console.log(useSelector(state => state));

// Log component render
console.log('Component rendered');

// Log API response
api.interceptors.response.use(
  response => {
    console.log('API Response:', response.data);
    return response;
  }
);
```

### Backend

```javascript
// Log middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Log database operations
mongoose.set('debug', true);
```

## 📱 Responsive Design

### Mobile First Classes

```jsx
// Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Mobile: flex column, Desktop: flex row
<div className="flex flex-col md:flex-row">

// Hide on mobile, show on tablet+
<div className="hidden md:block">

// Show on mobile, hide on tablet+
<div className="block md:hidden">
```

## 🔗 API Endpoints Quick Reference

### Auth
- POST `/auth/signup` - Register
- POST `/auth/login` - Login
- GET `/auth/me` - Current user

### Wardrobe
- GET `/wardrobe` - List items
- POST `/wardrobe` - Add item
- PUT `/wardrobe/:id` - Update
- DELETE `/wardrobe/:id` - Delete

### Products
- GET `/products` - List all
- GET `/products/:id` - Get one
- POST `/products` - Create
- PUT `/products/:id` - Update
- DELETE `/products/:id` - Delete

### Orders
- GET `/orders` - List
- POST `/orders` - Create
- GET `/orders/:id` - Get one
- PUT `/orders/:id` - Update

## 💾 localStorage Usage

```javascript
import { storage } from '@/utils';

// Get
const user = storage.get('user');

// Set
storage.set('user', userData);

// Remove
storage.remove('user');
```

## 🎯 Common Patterns

### Loading State

```jsx
import LoadingSkeleton from '@/components/common/LoadingSkeleton';

if (loading) return <LoadingSkeleton count={6} type="card" />;
```

### Error Handling

```jsx
import toast from 'react-hot-toast';

try {
  await apiCall();
  toast.success('Success!');
} catch (error) {
  toast.error(error.message);
}
```

### Empty State

```jsx
import EmptyState from '@/components/common/EmptyState';
import { FiPlus } from 'react-icons/fi';

<EmptyState
  title="No items"
  description="Add your first item"
  icon={FiPlus}
  action={{ label: 'Add Item', onClick: () => {} }}
/>
```

### Form Validation

```javascript
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8;
};
```

## 📈 Performance Tips

1. **Use React.memo()** for static components
2. **Lazy load images** with native lazy attribute
3. **Paginate API results** for large datasets
4. **Memoize Redux selectors** for expensive computations
5. **Use useCallback()** for event handlers
6. **Code split** with React.lazy() for routes
7. **Compress images** with Cloudinary transforms
8. **Monitor bundle size** with webpack analyzer

## 🚢 Deployment Checklist

Frontend:
- [ ] Update .env for production
- [ ] Run `npm run build`
- [ ] Test production build
- [ ] Deploy to Vercel/Netlify

Backend:
- [ ] Update .env for production
- [ ] Set DATABASE_URL
- [ ] Deploy to Heroku/Railway
- [ ] Run database migrations
- [ ] Enable HTTPS

## 🎓 File Location Reference

| Feature | Location |
|---------|----------|
| Auth Logic | `backend/src/controllers/authController.js` |
| Wardrobe | `frontend/src/pages/MyWardrobe.jsx` |
| AI Chat | `frontend/src/pages/AIStylist.jsx` |
| Products | `frontend/src/pages/Products.jsx` |
| Admin | `frontend/src/pages/admin/Dashboard.jsx` |
| Styles | `frontend/tailwind.config.js` |
| API | `frontend/src/services/services.js` |
| Redux | `frontend/src/store/` |

## 📞 Quick Links

- [React Docs](https://react.dev)
- [Tailwind Docs](https://tailwindcss.com)
- [Redux Docs](https://redux.js.org)
- [Express Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)

---

**Save this for quick reference! 📌**
