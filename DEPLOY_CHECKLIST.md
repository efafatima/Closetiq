# ClosetIQ Deploy Checklist

Use this before deploying the project.

## 1. Accounts you need to create

- MongoDB Atlas database
- Cloudinary account for wardrobe/product image URLs or uploads
- Vercel/Netlify account for frontend
- Render/Railway account for backend

Optional later:

- Stripe account for card payments
- Email/SMTP account for real password reset emails
- Google OAuth app for Google login

## 2. Backend environment variables

Create these in your backend hosting dashboard:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=make_this_long_random_and_private
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Do not use `closetiq-dev-secret` in production.

## 3. Frontend environment variables

Create this in your frontend hosting dashboard:

```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

## 4. Backend deploy settings

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Health check URL: `https://your-backend-domain.com/api/health`

## 5. Frontend deploy settings

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`

## 6. Pre-deploy checks

Run locally:

```bash
cd frontend
npm run lint
npm run build

cd ../backend
npm run check
```

## 7. What is still optional/future work

- Real Google OAuth login
- Stripe/card payment
- Real AI model integration
- Email-based password reset tokens
- Full admin management screens
- Automated tests
