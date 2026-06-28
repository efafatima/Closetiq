# ClosetIQ Setup Guide

## Prerequisites

- Node.js 16+ 
- MongoDB Atlas account
- Cloudinary account
- Google OAuth credentials (optional)
- Git

## Initial Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd closetiq
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your credentials
# VITE_API_URL=http://localhost:5000/api
# VITE_GOOGLE_CLIENT_ID=your_google_client_id
# VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

### 3. Backend Setup

```bash
cd ../backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your credentials:
# MongoDB URI
# JWT_SECRET
# Cloudinary credentials
# etc.

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

## Database Setup

### MongoDB Atlas

1. Create MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create a database user
4. Get connection string
5. Add to `.env` as `MONGODB_URI`

### Database Initialization

The database will auto-create collections when you first use the API.

To seed sample data:
```bash
cd backend
npm run seed
```

## Environment Variables

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
```

### Backend (.env)

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/closetiq
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Cloudinary Setup

1. Go to https://cloudinary.com and create account
2. Get your Cloud Name, API Key, and API Secret
3. Add to backend .env file

## Running the Application

### Development Mode

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

**Backend:**
```bash
cd backend
npm start
```

## API Testing

Use Postman or similar tool to test API:

1. Import API collection from `postman_collection.json`
2. Set base URL to `http://localhost:5000/api`
3. Test endpoints

### Sample API Call

**POST /auth/signup**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

## Troubleshooting

### Port Already in Use
```bash
# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Error
- Verify MongoDB URI in .env
- Check IP whitelist in MongoDB Atlas
- Ensure network access is enabled

### Cloudinary Upload Error
- Verify Cloudinary credentials
- Check file size limits
- Ensure proper folder permissions

### Vite Build Error
```bash
cd frontend
rm -rf node_modules dist
npm install
npm run build
```

## Debugging

### Enable Debug Logs

**Backend:**
```bash
DEBUG=closetiq:* npm run dev
```

**Frontend:**
- Check browser console (F12)
- Check Redux DevTools extension
- Check network tab

## Security Checklist

- [ ] JWT secret is strong and unique
- [ ] Environment variables are not committed
- [ ] CORS is properly configured
- [ ] API endpoints are authenticated
- [ ] Passwords are hashed
- [ ] Rate limiting is implemented
- [ ] Input validation is in place
- [ ] XSS protection is enabled

## Performance Optimization

1. Image Optimization
   - Use Cloudinary transforms
   - Lazy load images
   - Use WebP format

2. Code Splitting
   - Enable React lazy loading
   - Code splitting in Webpack/Vite

3. Database
   - Add indexes to frequently queried fields
   - Implement pagination
   - Cache responses

4. Frontend
   - Minify CSS/JS
   - Compress assets
   - Use CDN

## Deployment

### Frontend Deployment (Vercel/Netlify)

```bash
cd frontend
npm run build
# Deploy 'dist' folder
```

### Backend Deployment (Heroku/Railway)

```bash
cd backend
# Create Procfile
echo "web: npm start" > Procfile
# Push to service
```

## Support

For issues or questions, refer to:
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [GitHub Issues](https://github.com/...)

## Next Steps

1. Set up authentication flow
2. Add sample products
3. Test wardrobe features
4. Set up payment processing
5. Deploy to production

---

**Happy coding! 🚀**
