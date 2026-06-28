# ClosetIQ - Your Personal AI Fashion Stylist Platform

A modern, premium fashion-tech ecommerce web application combining virtual wardrobe management, AI-powered styling, and smart shopping experiences.

## 🎨 Overview

ClosetIQ is not just another ecommerce platform—it's a personal fashion assistant that helps users:
- Organize and manage their digital wardrobe
- Discover outfit combinations powered by AI
- Identify missing wardrobe essentials
- Shop recommended fashion items with confidence
- Track trends and build their personal style

## 🚀 Features

### Core Features
1. **Virtual Wardrobe** - Upload, organize, and manage clothing items with AI categorization
2. **AI Stylist** - Chat with an AI assistant for personalized outfit recommendations
3. **Outfit Generator** - Create perfect outfits based on occasion and season
4. **Smart Color Matching** - Get automatic color coordination suggestions
5. **Closet Gap Analyzer** - Identify what's missing from your wardrobe
6. **Ecommerce Store** - Browse and shop recommended fashion items
7. **User Dashboard** - Track wardrobe stats and style score
8. **Admin Panel** - Manage products, users, and orders

### Technical Features
- Premium, modern UI with glassmorphism effects
- Smooth animations with Framer Motion
- Responsive design (mobile-first approach)
- Real-time chat interface
- Secure JWT authentication
- Image uploads with Cloudinary
- Advanced product filtering

## 🛠 Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Redux Toolkit** for state management
- **Framer Motion** for animations
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB Atlas** for database
- **Mongoose** for data modeling
- **JWT** for authentication
- **Cloudinary** for image hosting

## 🎯 Design System

### Color Palette
```
Primary:    #F8EDEB, #F9F5F2
Secondary:  #EAD7D1, #D8B4A0
Accent:     #C67B5C, #B35C44
Text:       #2D2D2D, #4A4A4A
```

### Typography
- **Playfair Display** - Headings (elegant, magazine-style)
- **Poppins** - Body text (modern, readable)

### Design Elements
- Glassmorphism effects
- Soft shadows (0 4px 15px rgba(0,0,0,0.08))
- Rounded corners (12-20px)
- Smooth transitions and animations
- Premium micro-interactions

## 📂 Project Structure

```
closetiq/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── server.js
│   ├── package.json
│   └── README.md
│
└── README.md
```

## 🚀 Getting Started

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update environment variables

5. Start development server:
```bash
npm run dev
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update environment variables with:
   - MongoDB URI
   - JWT secret
   - Cloudinary credentials

5. Start development server:
```bash
npm run dev
```

## 📖 API Documentation

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user

### Wardrobe
- `GET /wardrobe` - List user's wardrobe items
- `POST /wardrobe` - Add new item
- `PUT /wardrobe/:id` - Update item
- `DELETE /wardrobe/:id` - Delete item
- `GET /wardrobe/analysis/gaps` - Get gap analysis

### Products
- `GET /products` - List products (with filters)
- `GET /products/:id` - Get product details
- `POST /products` - Create product (admin)
- `PUT /products/:id` - Update product (admin)
- `DELETE /products/:id` - Delete product (admin)

### Orders
- `GET /orders` - List user's orders
- `POST /orders` - Create order
- `GET /orders/:id` - Get order details
- `PUT /orders/:id` - Update order status

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update profile
- `GET /users/wardrobe-stats` - Get wardrobe statistics
- `GET /users/style-score` - Get style score

## 🎨 Pages Overview

1. **Landing Page** - Hero section with features, testimonials, and CTAs
2. **Authentication** - Login, signup, forgot password pages
3. **Dashboard** - User hub with stats and quick actions
4. **My Wardrobe** - Virtual wardrobe with filters and search
5. **AI Stylist** - Chat interface for styling recommendations
6. **Outfit Generator** - Create outfits by occasion/season
7. **Products** - Browse and filter fashion items
8. **Cart & Checkout** - Shopping experience
9. **Orders** - Order history and tracking
10. **Admin Dashboard** - Platform management

## 🔐 Authentication

- JWT-based authentication
- Google OAuth support
- Password hashing with bcryptjs
- Protected routes and endpoints
- Admin role-based access

## 📸 Image Management

- Cloudinary integration for image uploads
- Automatic image optimization
- Support for multiple image formats
- CDN delivery for fast loading

## 💾 Database Models

- **User** - Accounts, profiles, preferences
- **WardrobeItem** - User's clothing collection
- **Product** - Catalog items with variations
- **Order** - Purchase history and tracking
- **Wishlist** - Saved favorite items

## 🎯 Future Enhancements

- AI-powered outfit matching algorithm
- Social features (style sharing, followers)
- Size recommendation engine
- Virtual try-on with AR
- Payment gateway integration
- Email notifications
- Mobile app
- Fashion trend analysis
- Style quiz personality matching

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

ISC

## 📞 Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**ClosetIQ** - Where Fashion Meets AI ✨
