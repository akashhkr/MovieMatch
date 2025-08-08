# 🛠️ Local Development Setup

This guide will help you set up and run the MovieSwipe app on your local machine for development.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0.0 or higher)
- **npm** (comes with Node.js) or **yarn** package manager
- **Git** for version control
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## 🚀 Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd movieswipe
```

### 2. Install Dependencies

The project uses several key packages that need to be installed:

```bash
npm install
# or if you prefer yarn
yarn install
```

### Core Dependencies

The app relies on these main packages:

#### **Frontend Framework**
- `react` (^18.0.0) - Core React library
- `react-dom` (^18.0.0) - React DOM rendering
- `typescript` - Type safety and development experience

#### **Styling & UI**
- `tailwindcss` (v4.0) - Utility-first CSS framework
- `@tailwindcss/typography` - Typography plugin
- `lucide-react` - Icon library
- `class-variance-authority` - Component variant management
- `clsx` - Conditional class name utility
- `tailwind-merge` - Tailwind class merging utility

#### **Backend & Data**
- `@supabase/supabase-js` - Supabase client library
- `@supabase/auth-helpers-react` - Authentication helpers

#### **Development Tools**
- `@types/react` - React TypeScript definitions
- `@types/react-dom` - React DOM TypeScript definitions
- `@vitejs/plugin-react` - Vite React plugin (if using Vite)
- `eslint` - Code linting
- `prettier` - Code formatting

### 3. Install Additional UI Dependencies

The app uses shadcn/ui components which may require additional dependencies:

```bash
# Install shadcn/ui dependencies
npm install @radix-ui/react-dialog @radix-ui/react-slot @radix-ui/react-toast
npm install @radix-ui/react-avatar @radix-ui/react-button @radix-ui/react-card
npm install @radix-ui/react-input @radix-ui/react-label @radix-ui/react-separator

# Install additional utilities
npm install date-fns @hookform/resolvers zod react-hook-form@7.55.0
npm install sonner@2.0.3 vaul cmdk
```

## 🔧 Environment Configuration

### 1. Supabase Setup

The app requires a Supabase project for backend functionality:

#### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/in and create a new project
3. Wait for the project to be fully provisioned
4. Navigate to Settings → API to find your keys

#### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Optional: TMDB API (if movie data integration is restored)
TMDB_API_KEY=your_tmdb_api_key_if_needed
```

### 2. Supabase Database Setup

The app uses a key-value store table for data persistence:

1. In your Supabase dashboard, go to the SQL Editor
2. The app expects a `kv_store_1bcdc59b` table (this should be automatically created by the server functions)
3. The Supabase functions in `/supabase/functions/server/` handle the database setup

### 3. Deploy Supabase Functions

Deploy the edge functions to your Supabase project:

```bash
# Install Supabase CLI if you haven't already
npm install -g supabase

# Login to Supabase
supabase login

# Link your project (you'll need your project ref ID)
supabase link --project-ref your-project-ref

# Deploy the functions
supabase functions deploy server
```

## 🏃‍♀️ Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:3000` (or the next available port).

### Production Build

To create a production build:

```bash
npm run build
# or 
yarn build
```

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## 📱 Mobile Development

The app is optimized for mobile devices. For the best development experience:

1. **Chrome DevTools**: Use device emulation to test mobile interfaces
2. **Local Network Testing**: Access your dev server from mobile devices on the same network
3. **Responsive Design**: The app uses Tailwind's responsive utilities for different screen sizes

## 🔍 Development Scripts

Common development commands:

```bash
# Start development server
npm run dev

# Build for production  
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Type checking
npm run type-check
```

## 🧪 Testing the Setup

After setup, verify everything works:

1. **Start the dev server**: `npm run dev`
2. **Open in browser**: Navigate to `http://localhost:3000`
3. **Test basic functionality**:
   - Click "Create Room" - should generate a PIN
   - Click "Join Room" - should allow entering a PIN
   - Check browser console for any errors

### Expected Behavior
- Clean interface with "Create Room" and "Join Room" options
- No console errors related to missing dependencies
- Smooth navigation between screens
- Mobile-responsive design

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Find and kill process using port 3000
lsof -ti:3000 | xargs kill -9
# Or use a different port
npm run dev -- --port 3001
```

**Supabase Connection Issues**
- Verify your `.env.local` file has correct Supabase credentials
- Check that your Supabase project is running
- Ensure the edge functions are deployed successfully

**Package Installation Problems**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Errors**
```bash
# Run type checking
npm run type-check
# Clear TypeScript cache
rm -rf .next (if using Next.js) or restart your IDE
```

### Getting Help

If you encounter issues:

1. Check the browser console for error messages
2. Verify all environment variables are set correctly
3. Ensure your Supabase project is properly configured
4. Check that all dependencies are installed with correct versions

## 🏗️ Project Structure

Understanding the codebase structure:

```
├── App.tsx                 # Main application entry point
├── components/             # React components
│   ├── HomePage.tsx        # Landing page component  
│   ├── CreateRoom.tsx      # Room creation interface
│   ├── JoinRoom.tsx        # Room joining interface
│   ├── MovieSwiper.tsx     # Main swiping interface
│   ├── MatchModal.tsx      # Match celebration modal
│   └── ui/                 # shadcn/ui components
├── hooks/                  # Custom React hooks
│   └── useMovieRoom.tsx    # Room management logic
├── supabase/functions/     # Supabase edge functions
│   └── server/             # Backend API endpoints
├── utils/                  # Utility functions
│   └── supabase/           # Supabase client setup
└── styles/                 # Global CSS and Tailwind config
    └── globals.css         # Tailwind v4 configuration
```

## 🌟 Next Steps

Once you have the app running locally:

1. **Explore the code**: Start with `App.tsx` to understand the main flow
2. **Test room functionality**: Create and join rooms to see real-time sync
3. **Customize movie data**: Modify the movie dataset or API integration
4. **Enhance UI**: Experiment with the Tailwind styling and components
5. **Add features**: Use the existing architecture to add new functionality

---

*Happy coding! 🎬✨*