# Upskill — Full Stack Learning Management System

A production-ready online learning platform built with Next.js, Node.js, TypeScript, and MongoDB. Upskill allows instructors to create and sell courses, and students to browse, purchase, and learn at their own pace.

---

## Features

### Student
- Browse and search courses by category or keyword
- View course details, curriculum, and demo video
- Purchase courses securely via Stripe
- Access enrolled courses with video streaming (VdoCipher DRM)
- Leave reviews and ask questions per lecture
- Manage profile, avatar, and password
- Social login via Google and GitHub

### Admin
- Full dashboard with analytics (users, orders, revenue)
- Create, edit, and delete courses with multi-step form
- Manage users, roles, and team members
- Real-time notifications via Socket.io
- Manage course categories
- View all orders and invoices

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Next.js 13 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Redux Toolkit + RTK Query | State management and API calls |
| NextAuth.js | Google and GitHub OAuth |
| Stripe.js | Payment UI |
| Socket.io Client | Real-time notifications |
| Recharts | Analytics charts |
| Material UI | Data grids |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| TypeScript | Type safety |
| MongoDB + Mongoose | Database |
| Redis (ioredis) | Session caching |
| JWT | Authentication with access/refresh tokens |
| Cloudinary | Image storage |
| VdoCipher | DRM-protected video streaming |
| Stripe | Payment processing |
| Nodemailer | Transactional emails |
| Socket.io | Real-time notifications |
| node-cron | Scheduled tasks |

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Redis (local or Upstash)
- Cloudinary account
- Stripe account

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/upskill.git
cd upskill
```

### 2. Install dependencies

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server` folder:

```env
PORT=8000
ORIGIN=http://localhost:3000
NODE_ENV=development

# Database
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/upskill

# Redis
REDIS_URL=redis://127.0.0.1:6379

# JWT
ACCESS_TOKEN=your_access_token_secret
REFRESH_TOKEN=your_refresh_token_secret
ACTIVATION_SECRET=your_activation_secret
ACCESS_TOKEN_EXPIRE=5
REFRESH_TOKEN_EXPIRE=3

# Cloudinary
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_SECRET_KEY=your_secret_key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SERVICE=gmail
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# VdoCipher
VDOCIPHER_API_SECRET=your_vdocipher_secret
```

Create a `.env.local` file inside the `client` folder:

```env
NEXT_PUBLIC_SERVER_URI=http://localhost:8000/api/v1/
NEXT_PUBLIC_SOCKET_SERVER_URI=http://localhost:8000/

NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 4. Run the app

Open two terminals:

**Terminal 1 — Server:**
```bash
cd server
npm run dev
```

**Terminal 2 — Client:**
```bash
cd client
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## Project Structure

```
upskill/
├── client/                   # Next.js frontend
│   ├── app/
│   │   ├── components/       # UI components
│   │   │   ├── Admin/        # Admin dashboard components
│   │   │   ├── Auth/         # Login, Signup, Verification
│   │   │   ├── Course/       # Course detail, card, player
│   │   │   ├── Profile/      # User profile
│   │   │   └── Route/        # Homepage sections
│   │   ├── about/            # About page
│   │   ├── courses/          # Courses listing page
│   │   ├── course/[id]/      # Course detail page
│   │   ├── course-access/    # Course player page
│   │   ├── admin/            # Admin pages
│   │   └── profile/          # Profile page
│   ├── redux/                # Redux store and API slices
│   └── public/               # Static assets
│
└── server/                   # Express backend
    ├── controllers/          # Route handlers
    ├── models/               # Mongoose schemas
    ├── routes/               # API routes
    ├── middleware/           # Auth, error handling
    ├── services/             # Business logic
    └── utils/                # Helpers (JWT, Redis, email)
```

---

## API Routes

### Auth
| Method | Route | Description |
|---|---|---|
| POST | `/api/v1/registration` | Register new user |
| POST | `/api/v1/activate-user` | Verify email |
| POST | `/api/v1/login` | Login |
| GET | `/api/v1/logout` | Logout |
| GET | `/api/v1/refresh` | Refresh access token |
| POST | `/api/v1/social-auth` | Social login |

### Courses
| Method | Route | Description |
|---|---|---|
| GET | `/api/v1/get-courses` | Get all courses (public) |
| GET | `/api/v1/get-course/:id` | Get single course |
| GET | `/api/v1/get-course-content/:id` | Get course content (enrolled) |
| POST | `/api/v1/create-course` | Create course (admin) |
| PUT | `/api/v1/edit-course/:id` | Edit course (admin) |
| DELETE | `/api/v1/delete-course/:id` | Delete course (admin) |

### Orders
| Method | Route | Description |
|---|---|---|
| POST | `/api/v1/create-order` | Create order |
| GET | `/api/v1/get-orders` | Get all orders (admin) |
| GET | `/api/v1/payment/stripepublishablekey` | Get Stripe key |
| POST | `/api/v1/payment` | Create payment intent |

### Analytics
| Method | Route | Description |
|---|---|---|
| GET | `/api/v1/get-users-analytics` | Users analytics (admin) |
| GET | `/api/v1/get-courses-analytics` | Courses analytics (admin) |
| GET | `/api/v1/get-orders-analytics` | Orders analytics (admin) |

---

## Deployment

### Server
The server is configured for deployment on **Heroku** (see `Procfile`). It can also be deployed on **Railway** or **Render**.

```bash
cd server
npm run build
```

### Client
Deploy the Next.js frontend on **Vercel**:

```bash
cd client
npm run build
```

---

## Environment Notes

- Use **Upstash** for managed Redis in production
- Use **MongoDB Atlas** for managed MongoDB in production
- Set `NODE_ENV=production` in server `.env` for production builds
- Make sure to whitelist your production domain in MongoDB Atlas Network Access

---

## License

MIT License — feel free to use this project for learning or as a base for your own platform.

---

## Author

Built and designed by **Harika Purma**
