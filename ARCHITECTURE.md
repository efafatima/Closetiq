# ClosetIQ Architecture

## System Overview

ClosetIQ is built with a modern MERN stack (MongoDB, Express, React, Node.js) with a clean separation of concerns and scalable architecture.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)              │
│  ┌─────────────────────────────────────────────────────┐│
│  │  Components (Auth, Wardrobe, Stylist, Shop)        ││
│  │  ├─ Common (Navbar, Footer, Card, etc)             ││
│  │  ├─ Auth (Login, Signup, ForgotPassword)           ││
│  │  ├─ Wardrobe (MyWardrobe, OutfitGenerator)         ││
│  │  ├─ Stylist (AIStylist Chat)                       ││
│  │  └─ Ecommerce (Products, Cart, Checkout)           ││
│  ├─ Redux Store (Auth, Wardrobe, Products, Cart, Orders)
│  ├─ Services (API calls, Authentication)              ││
│  ├─ Hooks (Custom hooks for data fetching)            ││
│  ├─ Utils (Helpers, Constants, Storage)               ││
│  └─ Styles (Tailwind CSS, Global CSS)                 ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
                           │
                    HTTP/REST API
                           │
┌─────────────────────────────────────────────────────────┐
│               Backend (Node.js + Express)               │
│  ┌─────────────────────────────────────────────────────┐│
│  │  Routes                                            ││
│  │  ├─ /auth (signup, login, getCurrentUser)          ││
│  │  ├─ /wardrobe (CRUD, gap analysis)                 ││
│  │  ├─ /products (CRUD, search, filter)               ││
│  │  ├─ /orders (CRUD, status updates)                 ││
│  │  └─ /users (profile, stats, scores)                ││
│  ├─ Controllers (Business Logic)                       ││
│  ├─ Models (MongoDB Schemas)                           ││
│  │  ├─ User                                            ││
│  │  ├─ WardrobeItem                                    ││
│  │  ├─ Product                                         ││
│  │  ├─ Order                                           ││
│  │  └─ Wishlist                                        ││
│  ├─ Middleware (Auth, Validation)                      ││
│  └─ Config (Database, Cloudinary)                      ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
                           │
         ┌────────────────┬┴────────────────┐
         │                │                │
    ┌────────────┐  ┌──────────────┐  ┌─────────────┐
    │  MongoDB   │  │  Cloudinary  │  │   External  │
    │   Atlas    │  │  (Images)    │  │   Services  │
    └────────────┘  └──────────────┘  └─────────────┘
```

## Frontend Architecture

### Components Structure

```
components/
├── common/
│   ├── Navbar.jsx           - Navigation bar
│   ├── Footer.jsx           - Footer
│   ├── Card.jsx             - Reusable card component
│   ├── LoadingSkeleton.jsx   - Loading states
│   └── EmptyState.jsx        - Empty state UI
├── auth/
│   ├── LoginForm.jsx
│   ├── SignupForm.jsx
│   └── ProtectedRoute.jsx
├── wardrobe/
│   ├── WardrobeGrid.jsx
│   ├── ItemUpload.jsx
│   └── CategoryFilter.jsx
├── stylist/
│   ├── ChatInterface.jsx
│   ├── MessageBubble.jsx
│   └── StylistRecommendations.jsx
├── ecommerce/
│   ├── ProductCard.jsx
│   ├── ProductFilter.jsx
│   ├── CartItem.jsx
│   └── CheckoutForm.jsx
└── admin/
    ├── ProductManagement.jsx
    ├── UserManagement.jsx
    └── Analytics.jsx
```

### State Management (Redux)

```
store/
├── slices/
│   ├── authSlice.js       - User authentication state
│   ├── wardrobeSlice.js   - Wardrobe items state
│   ├── productSlice.js    - Products and filters state
│   ├── cartSlice.js       - Shopping cart state
│   └── orderSlice.js      - Orders state
└── index.js               - Store configuration
```

### Data Flow

1. User interacts with component
2. Component dispatches Redux action
3. Action updates Redux store
4. Component subscribes to store updates
5. Component re-renders with new data
6. API calls made via services when needed

## Backend Architecture

### Database Schema Relationships

```
User (1) ──── (Many) WardrobeItem
  │
  ├──── (1) Wishlist ──── (Many) Product
  │
  └──── (Many) Order

Product (Many) ──── (Many) Order
```

### Request Flow

1. Client sends HTTP request
2. Middleware authenticates request (if required)
3. Route handler maps to controller
4. Controller processes business logic
5. Model interacts with database
6. Response returned to client

### Authentication Flow

```
Client                          Server
   │                              │
   ├─────────POST /auth/login────>│
   │                        Check credentials
   │                        Generate JWT
   │<─────token + user data───────┤
   │
   │ (Store token in localStorage)
   │
   │─────GET /wardrobe────────────>│
   │ (with Authorization header)   Verify JWT
   │                        Get user wardrobe
   │<─────wardrobe items──────────┤
```

## API Design

### RESTful Principles

- **GET** - Retrieve resources
- **POST** - Create new resources
- **PUT** - Update existing resources
- **DELETE** - Remove resources

### Response Format

```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "error": null
}
```

### Error Handling

```json
{
  "success": false,
  "data": null,
  "message": "Error message",
  "error": {
    "code": "ERROR_CODE",
    "details": "Additional details"
  }
}
```

## Security Architecture

### Authentication
- JWT tokens stored in localStorage
- Token sent in Authorization header
- Server validates token for protected routes

### Authorization
- Role-based access control (RBAC)
- Admin-only endpoints
- User-specific data isolation

### Data Protection
- Passwords hashed with bcryptjs
- Sensitive data not exposed in responses
- CORS enabled for frontend only
- Input validation on server-side

## Performance Architecture

### Frontend Optimization
1. Code splitting with React.lazy()
2. Image lazy loading
3. Memoization with React.memo()
4. Redux selector optimization
5. Tailwind CSS purging

### Backend Optimization
1. Database indexing on frequently queried fields
2. Pagination for large data sets
3. Response caching headers
4. Cloudinary image transformation
5. Connection pooling for MongoDB

### Caching Strategy
- Browser cache for static assets
- LocalStorage for user preferences
- Redux store for application state
- Database query results (optional)

## Scalability Considerations

### Horizontal Scaling
- Stateless backend servers
- Database replication
- Load balancing
- CDN for static assets

### Vertical Scaling
- Database optimization
- Query optimization
- Memory management
- Server resources

### Feature Scaling
- Modular component structure
- Service-oriented API design
- Database schema normalization
- Microservices-ready architecture

## Deployment Architecture

### Frontend Deployment
- Build: Vite bundle optimization
- Hosting: Vercel, Netlify, or CloudFlare Pages
- CDN: Global content delivery
- SSL: HTTPS enabled

### Backend Deployment
- Runtime: Node.js on cloud platform
- Database: MongoDB Atlas (managed)
- File Storage: Cloudinary (managed)
- Monitoring: Error tracking, logging
- CI/CD: Automated deployments

## Technologies at Each Layer

### Frontend Layer
- React 18 (UI framework)
- Vite (bundler)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Redux (state)
- Axios (HTTP)

### API Layer
- Express.js (web framework)
- JWT (authentication)
- CORS (cross-origin)
- Middleware (validation)

### Data Layer
- MongoDB (NoSQL database)
- Mongoose (ODM)
- Cloudinary (file storage)

### Infrastructure
- Node.js (runtime)
- npm (package manager)
- Git (version control)

## File Size & Performance Targets

- Frontend bundle: < 500KB gzipped
- Initial load time: < 3s
- API response time: < 200ms
- Database query time: < 100ms

## Testing Architecture

### Unit Tests
- Component testing with React Testing Library
- Controller testing with Jest
- Model testing with MongoDB memory server

### Integration Tests
- API endpoint testing
- Database integration testing
- Authentication flow testing

### E2E Tests
- User journey testing
- Critical path testing
- Cross-browser testing

## Monitoring & Analytics

### Frontend Monitoring
- Google Analytics
- Error tracking (Sentry)
- Performance monitoring

### Backend Monitoring
- API request logging
- Error logging
- Database performance monitoring
- Server health checks

---

This architecture is designed to be scalable, maintainable, and follows industry best practices for modern web applications.
