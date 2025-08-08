import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Heart,
  X,
  ArrowLeft,
  Users,
  Clock,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useMovieRoom } from "../hooks/useMovieRoom";
import { POSTER_CONFIG } from "./poster-config";
import type { Movie, Room, User } from "../App";

// Movie data with reliable poster URLs that work without CORS issues
const MOVIES: Movie[] = [
  {
    id: "1",
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    id: "2",
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
  },
  {
    id: "3",
    title: "Pulp Fiction",
    year: 1994,
    genre: "Crime",
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
  },
  {
    id: "4",
    title: "Forrest Gump",
    year: 1994,
    genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    description:
      "The presidencies of Kennedy and Johnson through the eyes of an Alabama man with an IQ of 75.",
  },
  {
    id: "5",
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    poster: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
  },
  {
    id: "6",
    title: "The Matrix",
    year: 1999,
    genre: "Sci-Fi",
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality.",
  },
  {
    id: "7",
    title: "Goodfellas",
    year: 1990,
    genre: "Crime",
    poster: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    description:
      "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill.",
  },
  {
    id: "8",
    title: "The Godfather",
    year: 1972,
    genre: "Crime",
    poster: "https://image.tmdb.org/t/p/w500/eEslKSwcqmiNS6va24Pbxf2UKmJ.jpg",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
  {
    id: "9",
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: "10",
    title: "The Avengers",
    year: 2012,
    genre: "Action",
    poster: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    description:
      "Earth's mightiest heroes must come together and learn to fight as a team to stop an alien invasion.",
  },
  {
    id: "11",
    title: "Titanic",
    year: 1997,
    genre: "Romance",
    poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    description:
      "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
  },
  {
    id: "12",
    title: "Jurassic Park",
    year: 1993,
    genre: "Adventure",
    poster: "https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg",
    description:
      "During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.",
  },
];

interface MovieSwiperProps {
  room: Room;
  user: User;
  onMatch: (movie: Movie) => void;
  onBack: () => void;
  updateRoom: (room: Room) => void;
}

export function MovieSwiper({
  room,
  user,
  onMatch,
  onBack,
  updateRoom,
}: MovieSwiperProps) {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [currentMovie, setCurrentMovie] =
    useState<Movie | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const { swipeMovie, getRoom, error } = useMovieRoom();

  // Find the next movie this user needs to swipe on
  useEffect(() => {
    const userLikes = room.userLikes[user.id] || [];
    let nextIndex = 0;

    // Find first movie that user hasn't swiped on yet
    while (
      nextIndex < MOVIES.length &&
      userLikes[nextIndex] !== undefined
    ) {
      nextIndex++;
    }

    setCurrentMovieIndex(nextIndex);

    if (nextIndex < MOVIES.length) {
      setCurrentMovie(MOVIES[nextIndex]);
    } else {
      setCurrentMovie(null);
    }
  }, [room.userLikes, user.id]);

  // Poll for room updates every 1 second for real-time experience
  useEffect(() => {
    const interval = setInterval(async () => {
      const updatedRoom = await getRoom(room.pin);
      if (updatedRoom) {
        // Check if we got new matches while polling
        const newMatches = updatedRoom.matches.filter(
          (match) => !room.matches.includes(match),
        );
        if (newMatches.length > 0 && currentMovie) {
          // Check if current movie is a new match
          const currentMovieMatch = newMatches.find(
            (matchIndex) =>
              parseInt(matchIndex) === currentMovieIndex,
          );
          if (currentMovieMatch) {
            setTimeout(() => onMatch(currentMovie), 100);
          }
        }
        updateRoom(updatedRoom);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    room.pin,
    room.matches,
    getRoom,
    updateRoom,
    currentMovie,
    currentMovieIndex,
    onMatch,
  ]);

  const handleSwipe = async (liked: boolean) => {
    if (!currentMovie || isAnimating) return;

    setIsAnimating(true);

    const result = await swipeMovie(
      room.pin,
      user.id,
      currentMovieIndex,
      liked,
    );

    if (result) {
      updateRoom(result.room);

      if (result.isMatch) {
        // Show match immediately
        setTimeout(() => {
          onMatch(currentMovie);
          setIsAnimating(false);
        }, 500);
      } else {
        // Continue to next movie immediately
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      }
    } else {
      setIsAnimating(false);
    }
  };

  // Calculate user progress
  const userSwipeCount = (room.userLikes[user.id] || []).filter(
    (like) => like !== undefined,
  ).length;

  if (!currentMovie) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-6">
            <h2 className="mb-3">All Done!</h2>
            <p className="text-muted-foreground text-sm mb-4">
              You've swiped through all {MOVIES.length} movies.
            </p>
            <div className="mb-4">
              <div className="text-center space-y-2">
                <p className="text-lg">🎬</p>
                <p className="text-sm text-muted-foreground">
                  Total matches found:{" "}
                  <span className="text-green-600">
                    {room.matches.length}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  You can keep this room open for others to
                  finish swiping
                </p>
              </div>
            </div>
            <Button onClick={onBack} size="sm">Back to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted p-3 relative">
      {/* Header - Fixed at top */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <Button variant="ghost" onClick={onBack} size="sm">
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4" />
          <span className="text-sm">
            {room.users.length} users
          </span>
          <Badge variant="secondary" className="text-xs">{room.pin}</Badge>
        </div>
      </div>

      {/* Movie Card - Takes available space */}
      <div className="flex-1 flex flex-col justify-center items-center min-h-0">
        <div className="w-full max-w-sm">
          <Card
            className={`relative overflow-hidden transition-transform duration-300 ${
              isAnimating
                ? "scale-95 opacity-50"
                : "scale-100 opacity-100"
            }`}
          >
            <div className="aspect-[2/3] relative w-full">
              <ImageWithFallback
                src={currentMovie.poster}
                alt={currentMovie.title}
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover' }}
                loading="eager"
                crossOrigin="anonymous"
              />
            </div>
            
            {/* Movie Info Below Poster */}
            <div className="p-[14px] m-[0px] px-[14px] py-[0px] mx-[0px] my-[14px] mt-[0px] mr-[0px] mb-[14px] ml-[0px]">
              <h2 className="text-lg mb-[8px] leading-tight mt-[0px] mr-[0px] ml-[0px] text-[20px] font-normal">
                {currentMovie.title}
              </h2>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  {currentMovie.year}
                </Badge>
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  {currentMovie.genre}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {currentMovie.description}
              </p>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-6 mt-4">
            <Button
              variant="outline"
              size="lg"
              className="h-14 w-14 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => handleSwipe(false)}
              disabled={isAnimating}
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-14 w-14 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              onClick={() => handleSwipe(true)}
              disabled={isAnimating}
            >
              <Heart className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Info Section - Fixed at bottom */}
      <div className="flex-shrink-0 space-y-3">
        {/* Progress */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Progress: {userSwipeCount} of {MOVIES.length} movies
          </p>
          <div className="w-full bg-muted rounded-full h-1.5 mt-1">
            <div
              className="bg-primary rounded-full h-1.5 transition-all duration-300"
              style={{
                width: `${(userSwipeCount / MOVIES.length) * 100}%`,
              }}
            />
          </div>

          {room.matches.length > 0 && (
            <p className="text-xs text-green-600 mt-1">
              {room.matches.length} match
              {room.matches.length !== 1 ? "es" : ""} found!
            </p>
          )}
        </div>

        {/* Users status */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">
            Room members:
          </p>
          <div className="flex justify-center space-x-1 flex-wrap">
            {room.users.map((roomUser) => {
              const userProgress = (
                room.userLikes[roomUser.id] || []
              ).filter((like) => like !== undefined).length;
              return (
                <div
                  key={roomUser.id}
                  className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground"
                >
                  {roomUser.name} ({userProgress}/{MOVIES.length})
                </div>
              );
            })}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-2 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-xs text-destructive text-center">
              {error}
            </p>
          </div>
        )}
      </div>

      {/* Status indicator - Fixed at bottom center */}
      {isAnimating && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <Card className="bg-blue-50 border-blue-200 shadow-lg">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center space-x-2 text-blue-600">
                <Clock className="h-4 w-4 animate-spin" />
                <span className="text-sm">
                  Processing...
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}