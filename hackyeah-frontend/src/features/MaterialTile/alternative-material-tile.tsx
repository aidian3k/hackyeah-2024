import {FileText, Image, ShoppingCart, Star, Users, Video} from 'lucide-react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

interface PackageProps {
  author: {
    name: string;
    avatarUrl: string;
  };
  title: string;
  lastUpdated: string;
  rating: number;
  downloads: number;
  description: string;
  fileComposition: {
    video: number;
    image: number;
    text: number;
  };
  meetingScheduled?: string;
}

export default function AlternativeMaterialTile({
  author,
  title,
  lastUpdated,
  rating,
  downloads,
  description,
  fileComposition,
}: PackageProps) {

  const handleBuy = () => {
    // Implement buy functionality here
    console.log('Package purchased!');
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex flex-row justify-between items-start">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={author.avatarUrl} alt={author.name} />
              <AvatarFallback>
                {author.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>Sieci komputerowe</CardDescription>
              <CardDescription className="flex items-center">
                <span className="mr-2">{author.name}</span>
                <span className="text-xs text-muted-foreground">• Zaaktualizowano: {lastUpdated}</span>
              </CardDescription>
            </div>
          </div>

          <Badge variant="secondary" className="text-green-700 text-sm px-2 py-1">
            {rating.toFixed(1)} <Star className="w-3 h-3 ml-1 inline" />
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          {/*<div className="flex items-center">*/}
          {/*  {[...Array(5)].map((_, i) => (*/}
          {/*    <Star*/}
          {/*      key={i}*/}
          {/*      className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted stroke-muted-foreground'}`}*/}
          {/*    />*/}
          {/*  ))}*/}
          {/*  <span className="ml-2 text-sm text-muted-foreground">{rating.toFixed(1)}</span>*/}
          {/*</div>*/}
          <div className="text-xs text-muted-foreground">
            <span className="flex items-center">
              <Users className="w-3 h-3 mr-1" /> {downloads} użyć
            </span>
          </div>
        </div>
        <p className="text-sm text-foreground">{description}</p>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Zawartość:</h4>
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-primary" />
            <Progress value={fileComposition.video} className="flex-grow" />
            <span className="text-sm text-muted-foreground">{fileComposition.video}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image className="w-4 h-4 text-primary" />
            <Progress value={fileComposition.image} className="flex-grow" />
            <span className="text-sm text-muted-foreground">{fileComposition.image}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <Progress value={fileComposition.text} className="flex-grow" />
            <span className="text-sm text-muted-foreground">{fileComposition.text}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleBuy} className="w-full">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Kup za 1 żeton
        </Button>
      </CardFooter>
    </Card>
  );
}
