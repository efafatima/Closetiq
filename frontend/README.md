# ClosetIQ Frontend

A modern React + Vite frontend for the ClosetIQ AI Fashion Stylist Platform.

## Tech Stack

- **React 18** - UI Library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Axios** - HTTP client

## Features

- Virtual Wardrobe Management
- AI Stylist Chat Interface
- Outfit Generator
- Smart Color Matching
- Product Browsing & Shopping
- Cart & Wishlist
- Order Management
- User Dashboard
- Admin Panel

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update environment variables in `.env`:
```
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
```

### Development

```bash
npm run dev
```

The app will run on `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── common/          # Shared components (Navbar, Footer, etc)
│   ├── auth/            # Auth components
│   ├── wardrobe/        # Wardrobe features
│   ├── stylist/         # AI Stylist components
│   ├── ecommerce/       # Shopping components
│   └── admin/           # Admin components
├── pages/               # Page components
├── store/               # Redux store and slices
├── services/            # API services
├── hooks/               # Custom hooks
├── utils/               # Helper functions
├── styles/              # Global styles
└── App.jsx              # Root component
```

## Color Palette

- **Primary**: #F8EDEB, #F9F5F2
- **Secondary**: #EAD7D1, #D8B4A0
- **Accent**: #C67B5C, #B35C44
- **Text**: #2D2D2D, #4A4A4A

## Contributing

Please follow the existing code style and commit message format.

## License

ISC
