import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Heart, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { POSTER_CONFIG } from './poster-config';
import type { Movie } from '../App';

interface MatchModalProps {
  movie: Movie;
  onClose: () => void;
}

export function MatchModal({ movie, onClose }: MatchModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-sm text-center animate-in zoom-in-95 duration-300">
        <CardContent className="p-6">
          {/* Celebration Header */}
          <div className="mb-4">
            <div className="flex justify-center items-center mb-3">
              <div className="relative">
                <Heart className="h-12 w-12 text-red-500 animate-pulse" fill="currentColor" />
                <Sparkles className="h-6 w-6 text-yellow-400 absolute -top-1 -right-1 animate-spin" />
              </div>
            </div>
            <h2 className="text-2xl text-primary mb-1">It's a Match!</h2>
            <p className="text-muted-foreground text-sm">
              You both loved this movie!
            </p>
          </div>

          {/* Movie Info */}
          <div className="mb-4">
            <div className="aspect-[2/3] mx-auto mb-3 rounded-lg overflow-hidden w-24">
              <ImageWithFallback
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg mb-1">{movie.title}</h3>
            <p className="text-sm text-muted-foreground">
              {movie.year} • {movie.genre}
            </p>
          </div>

          {/* Action Button */}
          <Button onClick={onClose} className="w-full">
            Continue Swiping
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}