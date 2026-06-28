# ClosetIQ Backend

A Node.js/Express backend for the ClosetIQ AI Fashion Stylist Platform.

## Tech Stack

- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Cloudinary** - Image hosting

## Features

- User Authentication (JWT, Google OAuth)
- Wardrobe Management
- Product Catalog
- Order Management
- User Profiles
- Admin Capabilities
- Gap Analysis
- Styling Recommendations

## Getting Started

### Prerequisites

- Node.js 16+
- MongoDB Atlas account
- Cloudinary account (for image uploads)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update environment variables:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/closetiq
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Development

```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Production

```bash
npm start
```

## API Endpoints

### Authentication
- `POST /auth/signup` - Sign up new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user

### Wardrobe
- `GET /wardrobe` - Get user's wardrobe items
- `POST /wardrobe` - Add wardrobe item
- `PUT /wardrobe/:id` - Update wardrobe item
- `DELETE /wardrobe/:id` - Delete wardrobe item
- `GET /wardrobe/analysis/gaps` - Get gap analysis

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product details
- `POST /products` - Create product (admin)
- `PUT /products/:id` - Update product (admin)
- `DELETE /products/:id` - Delete product (admin)

### Orders
- `GET /orders` - Get user's orders
- `POST /orders` - Create order
- `GET /orders/:id` - Get order details
- `PUT /orders/:id` - Update order status

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update profile
- `GET /users/wardrobe-stats` - Get wardrobe stats
- `GET /users/style-score` - Get style score

## Project Structure

```
src/
├── models/              # Mongoose schemas
├── controllers/         # Route controllers
├── routes/              # Express routes
├── middleware/          # Custom middleware
├── config/              # Configuration files
├── utils/               # Helper functions
└── server.js            # Entry point
```

## Database Schema

- **User** - User accounts and profiles
- **WardrobeItem** - User's clothing items
- **Product** - Catalog products
- **Order** - User orders
- **Wishlist** - User wishlist items

## Error Handling

All endpoints return JSON with appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not found
- `500` - Server error

## Contributing

Please follow the existing code style and commit message format.

## License

ISC
