# 🎬 MovieSwipe - Collaborative Movie Selection App

A Tinder-like movie selector designed for groups who can't decide what to watch together. Create or join rooms with friends, swipe through movies, and discover what everyone wants to watch through real-time collaborative matching.

## 🎯 What is MovieSwipe?

MovieSwipe solves the age-old problem of "What should we watch tonight?" by gamifying the movie selection process. Instead of endless debates and indecision, users swipe through movie options in a fun, Tinder-style interface until they find films that everyone likes.

## 🤔 Why MovieSwipe?

### The Problem
- **Decision Fatigue**: Scrolling through hundreds of movies on streaming platforms
- **Group Indecision**: Different people have different tastes and preferences  
- **Time Wasted**: Spending more time choosing than actually watching
- **Compromise Issues**: Someone always ends up unhappy with the final choice

### The Solution
- **Democratic Selection**: Everyone gets equal input through swiping
- **Real-time Matching**: Instant notifications when the group agrees on a movie
- **Mobile-Optimized**: Perfect for in-person gatherings where everyone uses their phone
- **No Registration**: Quick PIN-based rooms get you started immediately

## 🚀 How It Works

### 1. **Room Creation**
- One person creates a room and gets a unique 4-digit PIN
- The room creator's name becomes the room identifier
- Room is instantly available for others to join

### 2. **Joining & Collaboration** 
- Friends join using the PIN and their names
- Everyone sees the same curated set of movies
- Real-time synchronization keeps everyone in sync

### 3. **Swiping Interface**
- **Swipe Right (❤️)**: Like the movie
- **Swipe Left (❌)**: Pass on the movie  
- Touch-optimized gestures for mobile devices
- Smooth animations provide satisfying feedback

### 4. **Matching & Discovery**
- When all users in a room like the same movie, it's a **MATCH!**
- Instant modal celebration shows the winning movie
- Movies include title, year, genre, and description for informed decisions

## ✨ Current Features

### 🏠 **Home Screen**
- Clean, intuitive interface with two main options
- **Create Room**: Start a new movie selection session
- **Join Room**: Enter an existing session with a PIN

### 🎭 **Movie Database**  
- Curated collection of popular movies across various genres
- Rich movie metadata including:
  - Title, year, and genre information
  - High-quality poster images
  - Detailed plot descriptions
  - Movie ratings and popularity scores

### 👥 **Room Management**
- **PIN-Based System**: 4-digit codes for easy sharing
- **Real-time Sync**: All users see updates instantly  
- **User Tracking**: See who's in your room
- **Session Persistence**: Rooms stay active during the selection process

### 📱 **Mobile-First Design**
- **Responsive Interface**: Optimized for phone screens
- **Touch Gestures**: Natural swipe interactions
- **Progressive Web App**: Works great on mobile browsers
- **Portrait Orientation**: Designed for how people hold phones

### 🎯 **Matching System**
- **Unanimous Agreement**: All users must like a movie for it to match
- **Instant Feedback**: Real-time match notifications
- **Visual Celebrations**: Engaging match reveal modals
- **Movie Details**: Full information about matched films

### 🔄 **Real-time Synchronization**
- **Live Updates**: See other users' activity in real-time
- **Supabase Backend**: Reliable real-time database synchronization
- **Automatic Polling**: Seamless background updates
- **Connection Recovery**: Handles network interruptions gracefully

## 🛠️ Technical Architecture

### Frontend
- **React 18**: Modern component-based architecture
- **TypeScript**: Type-safe development experience
- **Tailwind CSS v4**: Utility-first styling with custom design tokens
- **shadcn/ui**: High-quality, accessible component library

### Backend & Data
- **Supabase**: Real-time database and backend services
- **Edge Functions**: Server-side logic for room management
- **Key-Value Store**: Efficient data persistence and retrieval
- **Real-time Subscriptions**: Live data synchronization

### State Management
- **React Hooks**: Custom hooks for room and movie management
- **Local State**: Efficient component-level state handling
- **Real-time Updates**: Automatic synchronization across devices

### User Experience
- **Mobile-Optimized**: Touch-first interaction design
- **Responsive Layout**: Works on all screen sizes
- **Smooth Animations**: Engaging swipe and transition effects
- **Loading States**: Clear feedback during data operations

## 🎮 User Flow

1. **Start**: Choose to create or join a room
2. **Setup**: Enter your name (and get/enter a PIN)  
3. **Connect**: Wait for friends to join your room
4. **Swipe**: Go through movies, liking or passing
5. **Match**: Get excited when everyone agrees!
6. **Decide**: Use the matched movie for your viewing session

## 🌟 Perfect For

- **Movie Nights**: Friend groups deciding what to watch
- **Date Planning**: Couples finding common movie interests  
- **Family Time**: Getting everyone to agree on a film
- **Party Planning**: Pre-selecting movies for events
- **Remote Friends**: Synchronized movie selection across distances

## 💫 The Experience

MovieSwipe transforms the frustrating process of group movie selection into an engaging, social activity. The familiar swipe interface makes it fun and intuitive, while the real-time collaboration creates shared excitement when matches are found. No more endless scrolling or disappointing compromises - just quick, democratic decisions that get you to the couch faster.

---

*Built with modern web technologies for a smooth, reliable, and enjoyable movie selection experience.*