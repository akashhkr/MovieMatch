import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { useMovieRoom } from '../hooks/useMovieRoom';
import type { Room, User } from '../App';

interface CreateRoomProps {
  onRoomCreated: (room: Room, user: User) => void;
  onBack: () => void;
}

export function CreateRoom({ onRoomCreated, onBack }: CreateRoomProps) {
  const [name, setName] = useState('');
  const [roomPin, setRoomPin] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [createdRoom, setCreatedRoom] = useState<Room | null>(null);
  const [createdUser, setCreatedUser] = useState<User | null>(null);

  const { createRoom, isLoading, error } = useMovieRoom();

  const handleCreateRoom = async () => {
    if (!name.trim()) return;
    
    const result = await createRoom(name.trim());
    
    if (result) {
      setRoomPin(result.room.pin);
      setCreatedRoom(result.room);
      setCreatedUser(result.user);
    }
  };

  const handleJoinRoom = () => {
    if (createdRoom && createdUser) {
      onRoomCreated(createdRoom, createdUser);
    }
  };

  const copyPin = async () => {
    if (!roomPin) return;
    
    try {
      // Try modern clipboard API first
      await navigator.clipboard.writeText(roomPin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback to older method
      try {
        const textArea = document.createElement('textarea');
        textArea.value = roomPin;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } else {
          // If both methods fail, select the text for manual copying
          selectPinText();
        }
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
        // Select the text for manual copying
        selectPinText();
      }
    }
  };

  const selectPinText = () => {
    const pinElement = document.getElementById('room-pin-text');
    if (pinElement) {
      const range = document.createRange();
      range.selectNodeContents(pinElement);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      
      // Show a message to the user
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center p-4 bg-gradient-to-br from-background to-muted">
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
            <CardTitle className="text-lg">Create Room</CardTitle>
            <CardDescription className="text-sm">
              {roomPin ? 'Share this PIN with your friends' : 'Enter your name to create a new room'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!roomPin ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleCreateRoom();
                      }
                    }}
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
                
                <Button 
                  onClick={handleCreateRoom}
                  disabled={!name.trim() || isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Creating Room...' : 'Create Room'}
                </Button>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="text-2xl tracking-widest bg-muted p-3 rounded-lg mb-3 relative cursor-pointer hover:bg-muted/80 transition-colors" onClick={copyPin}>
                    <span id="room-pin-text" className="select-all">
                      {roomPin}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyPin();
                      }}
                      className="absolute top-1 right-1 h-6 w-6 p-0"
                    >
                      {copied ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Room PIN - Share with friends
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Tap the PIN to copy it
                  </p>
                  {copied && (
                    <p className="text-xs text-green-600 mb-2">
                      PIN copied to clipboard!
                    </p>
                  )}

                </div>

                <Button 
                  onClick={handleJoinRoom}
                  className="w-full"
                >
                  Start Swiping
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}