import { useState, useCallback } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import type { Room, User } from '../App';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface SwipeResponse {
  room: Room;
  isMatch: boolean;
  allUsersSwiped: boolean;
}

export function useMovieRoom() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiCall = useCallback(async function<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      setError(null);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1bcdc59b${endpoint}`,
        {
          ...options,
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
            ...options.headers,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      return { data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('API Error:', errorMessage);
      return { error: errorMessage };
    }
  }, []);

  const createRoom = useCallback(async (userName: string): Promise<{ room: Room; user: User } | null> => {
    setIsLoading(true);
    
    const response = await apiCall<{ room: Room; user: User }>('/rooms', {
      method: 'POST',
      body: JSON.stringify({ userName }),
    });

    setIsLoading(false);
    
    if (response.error) {
      return null;
    }

    return response.data || null;
  }, [apiCall]);

  const joinRoom = useCallback(async (pin: string, userName: string): Promise<{ room: Room; user: User } | null> => {
    setIsLoading(true);
    
    const response = await apiCall<{ room: Room; user: User }>(`/rooms/${pin}/join`, {
      method: 'POST',
      body: JSON.stringify({ userName }),
    });

    setIsLoading(false);
    
    if (response.error) {
      return null;
    }

    return response.data || null;
  }, [apiCall]);

  const getRoom = useCallback(async (pin: string): Promise<Room | null> => {
    const response = await apiCall<{ room: Room }>(`/rooms/${pin}`);
    
    if (response.error) {
      return null;
    }

    return response.data?.room || null;
  }, [apiCall]);

  const swipeMovie = useCallback(async (
    pin: string,
    userId: string,
    movieIndex: number,
    liked: boolean
  ): Promise<SwipeResponse | null> => {
    const response = await apiCall<SwipeResponse>(`/rooms/${pin}/swipe`, {
      method: 'POST',
      body: JSON.stringify({
        userId,
        movieIndex,
        liked,
      }),
    });

    if (response.error) {
      return null;
    }

    return response.data || null;
  }, [apiCall]);

  return {
    createRoom,
    joinRoom,
    getRoom,
    swipeMovie,
    isLoading,
    error,
  };
}