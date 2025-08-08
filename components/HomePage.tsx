import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Film, Users } from 'lucide-react';

interface HomePageProps {
  onCreateRoom: () => void;
  onJoinRoom: () => void;
}

export function HomePage({ onCreateRoom, onJoinRoom }: HomePageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <Film className="h-10 w-10 text-primary mr-2" />
            <h1 className="text-3xl">MovieMatch</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Swipe through movies with friends and find your perfect match!
          </p>
        </div>

        <Card className="w-full">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Get Started</CardTitle>
            <CardDescription className="text-sm">
              Create a new room or join an existing one
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={onCreateRoom}
              className="w-full h-11"
              size="lg"
            >
              <Users className="mr-2 h-4 w-4" />
              Create Room
            </Button>
            
            <Button 
              onClick={onJoinRoom}
              variant="outline"
              className="w-full h-11"
              size="lg"
            >
              Join Room
            </Button>
            
            <div className="text-center pt-2">
              <p className="text-xs text-muted-foreground">
                💡 To test with multiple users, open this page in multiple browser windows
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}