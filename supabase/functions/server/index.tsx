import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Types
interface Room {
  pin: string;
  users: User[];
  currentMovieIndex: number;
  userLikes: Record<string, boolean[]>;
  matches: string[];
  createdAt: number;
}

interface User {
  id: string;
  name: string;
  joinedAt: number;
}

// Generate room PIN
function generatePin(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Create room endpoint
app.post('/make-server-1bcdc59b/rooms', async (c) => {
  try {
    const { userName } = await c.req.json();
    
    if (!userName || userName.trim().length === 0) {
      return c.json({ error: 'User name is required' }, 400);
    }

    const pin = generatePin();
    const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    
    const user: User = {
      id: userId,
      name: userName.trim(),
      joinedAt: Date.now()
    };

    const room: Room = {
      pin,
      users: [user],
      currentMovieIndex: 0,
      userLikes: {
        [userId]: []
      },
      matches: [],
      createdAt: Date.now()
    };

    await kv.set(`room:${pin}`, room);
    
    return c.json({ room, user });
  } catch (error) {
    console.log('Error creating room:', error);
    return c.json({ error: 'Failed to create room' }, 500);
  }
});

// Join room endpoint
app.post('/make-server-1bcdc59b/rooms/:pin/join', async (c) => {
  try {
    const pin = c.req.param('pin').toUpperCase();
    const { userName } = await c.req.json();
    
    if (!userName || userName.trim().length === 0) {
      return c.json({ error: 'User name is required' }, 400);
    }

    const room = await kv.get<Room>(`room:${pin}`);
    if (!room) {
      return c.json({ error: 'Room not found' }, 404);
    }

    const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    
    const user: User = {
      id: userId,
      name: userName.trim(),
      joinedAt: Date.now()
    };

    // Add user to room
    room.users.push(user);
    room.userLikes[userId] = [];

    await kv.set(`room:${pin}`, room);
    
    return c.json({ room, user });
  } catch (error) {
    console.log('Error joining room:', error);
    return c.json({ error: 'Failed to join room' }, 500);
  }
});

// Get room endpoint
app.get('/make-server-1bcdc59b/rooms/:pin', async (c) => {
  try {
    const pin = c.req.param('pin').toUpperCase();
    const room = await kv.get<Room>(`room:${pin}`);
    
    if (!room) {
      return c.json({ error: 'Room not found' }, 404);
    }
    
    return c.json({ room });
  } catch (error) {
    console.log('Error getting room:', error);
    return c.json({ error: 'Failed to get room' }, 500);
  }
});

// Swipe movie endpoint
app.post('/make-server-1bcdc59b/rooms/:pin/swipe', async (c) => {
  try {
    const pin = c.req.param('pin').toUpperCase();
    const { userId, movieIndex, liked } = await c.req.json();
    
    const room = await kv.get<Room>(`room:${pin}`);
    if (!room) {
      return c.json({ error: 'Room not found' }, 404);
    }

    // Validate user is in room
    const user = room.users.find(u => u.id === userId);
    if (!user) {
      return c.json({ error: 'User not in room' }, 403);
    }

    // Check if user has already swiped on this movie
    if (room.userLikes[userId] && room.userLikes[userId][movieIndex] !== undefined) {
      return c.json({ error: 'User has already swiped on this movie' }, 400);
    }

    // Update user's like for this movie
    if (!room.userLikes[userId]) {
      room.userLikes[userId] = [];
    }
    room.userLikes[userId][movieIndex] = liked;

    let isMatch = false;
    
    // Check for immediate match if user liked the movie and there are other users
    if (liked && room.users.length >= 2) {
      // Check if any other user has also liked this movie
      const otherUsersWhoLiked = room.users.filter(roomUser => 
        roomUser.id !== userId &&
        room.userLikes[roomUser.id] && 
        room.userLikes[roomUser.id][movieIndex] === true
      );

      if (otherUsersWhoLiked.length > 0) {
        isMatch = true;
        // Only add to matches if not already there
        if (!room.matches.includes(movieIndex.toString())) {
          room.matches.push(movieIndex.toString());
        }
      }
    }

    // Update current movie index to allow users to move forward independently
    // Each user can progress at their own pace
    const userMaxIndex = Math.max(
      ...(room.userLikes[userId] || []).map((_, index) => 
        room.userLikes[userId][index] !== undefined ? index : -1
      ),
      movieIndex
    );
    
    // Update room's current index to be the maximum any user has reached
    room.currentMovieIndex = Math.max(room.currentMovieIndex, userMaxIndex + 1);

    await kv.set(`room:${pin}`, room);
    
    return c.json({ 
      room, 
      isMatch,
      allUsersSwiped: false // Users can always continue swiping
    });
  } catch (error) {
    console.log('Error processing swipe:', error);
    return c.json({ error: 'Failed to process swipe' }, 500);
  }
});

// Health check
app.get('/make-server-1bcdc59b/health', (c) => {
  return c.json({ status: 'OK', timestamp: Date.now() });
});

Deno.serve(app.fetch);