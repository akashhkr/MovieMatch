import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { CreateRoom } from './components/CreateRoom';
import { JoinRoom } from './components/JoinRoom';
import { MovieSwiper } from './components/MovieSwiper';
import { MatchModal } from './components/MatchModal';

export type Screen = 'home' | 'create-room' | 'join-room' | 'movie-swiper';

export interface User {
  id: string;
  name: string;
  joinedAt: number;
}

export interface Room {
  pin: string;
  users: User[];
  currentMovieIndex: number;
  userLikes: Record<string, boolean[]>;
  matches: string[];
  createdAt: number;
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string;
  poster: string;
  description: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [matchedMovie, setMatchedMovie] = useState<Movie | null>(null);

  const handleRoomCreated = (room: Room, user: User) => {
    setCurrentRoom(room);
    setCurrentUser(user);
    setCurrentScreen('movie-swiper');
  };

  const handleRoomJoined = (room: Room, user: User) => {
    setCurrentRoom(room);
    setCurrentUser(user);
    setCurrentScreen('movie-swiper');
  };

  const handleMatch = (movie: Movie) => {
    setMatchedMovie(movie);
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setCurrentUser(null);
    setCurrentRoom(null);
    setMatchedMovie(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === 'home' && (
        <HomePage 
          onCreateRoom={() => setCurrentScreen('create-room')}
          onJoinRoom={() => setCurrentScreen('join-room')}
        />
      )}
      
      {currentScreen === 'create-room' && (
        <CreateRoom 
          onRoomCreated={handleRoomCreated}
          onBack={() => setCurrentScreen('home')}
        />
      )}
      
      {currentScreen === 'join-room' && (
        <JoinRoom 
          onRoomJoined={handleRoomJoined}
          onBack={() => setCurrentScreen('home')}
        />
      )}
      
      {currentScreen === 'movie-swiper' && currentRoom && currentUser && (
        <MovieSwiper 
          room={currentRoom}
          user={currentUser}
          onMatch={handleMatch}
          onBack={handleBackToHome}
          updateRoom={setCurrentRoom}
        />
      )}

      {matchedMovie && (
        <MatchModal 
          movie={matchedMovie}
          onClose={() => setMatchedMovie(null)}
        />
      )}
    </div>
  );
}