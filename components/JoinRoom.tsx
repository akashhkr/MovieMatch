import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft } from 'lucide-react';
import { useMovieRoom } from '../hooks/useMovieRoom';
import type { Room, User } from '../App';

interface JoinRoomProps {
  onRoomJoined: (room: Room, user: User) => void;
  onBack: () => void;
}

export function JoinRoom({ onRoomJoined, onBack }: JoinRoomProps) {
  const [pin, setPin] = useState('');
  const [name, setName] = useState('');

  const { joinRoom, isLoading, error } = useMovieRoom();

  const handleJoinRoom = async () => {
    if (!pin.trim() || !name.trim()) {
      return;
    }

    const result = await joinRoom(pin.trim(), name.trim());
    
    if (result) {
      onRoomJoined(result.room, result.user);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center p-4 bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-sm mx-auto">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
          size="sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Join Room</CardTitle>
            <CardDescription className="text-sm">
              Enter the room PIN and your name to join
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pin">Room PIN</Label>
              <Input
                id="pin"
                placeholder="Enter 6-digit PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value.toUpperCase())}
                maxLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleJoinRoom();
                  }
                }}
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            
            <Button 
              onClick={handleJoinRoom}
              disabled={!pin.trim() || !name.trim() || isLoading}
              className="w-full"
            >
              {isLoading ? 'Joining Room...' : 'Join Room'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}