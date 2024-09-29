import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  Star,
  Download,
  Clock,
  User,
  Book,
  FileText,
  Video,
  Image as ImageIcon,
  Paperclip,
  ChevronDown,
  ChevronUp,
  Lock
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import TopBar from '@/features/top-bar/top-bar.tsx';

interface Media {
  id: number;
  type: 'PDF' | 'VIDEO' | 'IMAGE' | 'OTHER';
  url: string;
  title: string;
}

interface User {
  id: number;
  name: string;
  avatarUrl: string;
}

interface Subject {
  id: number;
  name: string;
}

interface Review {
  id: number;
  rating: number;
  comment: string;
  author: User;
  createdAt: string;
}

interface LearningResource {
  id: number;
  title: string;
  description: string;
  media: Media[];
  author: User;
  subject: Subject;
  reviews: Review[];
  numberOfDownloads: number;
  creationDate: string;
  updateDate: string;
}

const MediaItem: React.FC<{ media: Media }> = ({ media }) => {
  // This function returns an appropriate icon based on the type of media
  const getIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-6 h-6" />;
      case 'VIDEO':
        return <Video className="w-6 h-6" />;
      case 'IMAGE':
        return <ImageIcon className="w-6 h-6" />;
      default:
        return <Paperclip className="w-6 h-6" />;
    }
  };

  return (
    <a
      href={media.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
    >
      {/* Display the media type icon */}
      {getIcon(media.type)}
      {/* Display the media title */}
      <span className="ml-2 text-sm font-medium truncate">{media.title}</span>
    </a>
  );
};

const LearningResourceDetailView: React.FC = () => {
  const [hasAccess, setHasAccess] = React.useState(true);

  const resource: LearningResource = {
    id: 1,
    title: 'Wprowadzenie do fizyki kwantowej',
    description:
      'Kompleksowy przewodnik po podstawach fizyki kwantowej, obejmujący dualizm korpuskularno-falowy, splątanie kwantowe i zasady nieoznaczoności.',
    media: [
      {
        id: 1,
        type: 'PDF',
        url: 'https://example.com/quantum-physics-guide.pdf',
        title: 'Przewodnik po fizyce kwantowej PDF'
      },
      {
        id: 2,
        type: 'VIDEO',
        url: 'https://example.com/quantum-lecture.mp4',
        title: 'Wykład z fizyki kwantowej Video'
      },
      {
        id: 3,
        type: 'IMAGE',
        url: 'https://example.com/quantum-diagram.png',
        title: 'Diagram fizyki kwantowej'
      },
      {
        id: 4,
        type: 'OTHER',
        url: 'https://example.com/quantum-simulation.zip',
        title: 'Pliki symulacji kwantowej'
      }
    ],
    author: {
      id: 101,
      name: 'Dr John Doe',
      avatarUrl: 'https://example.com/avatar-johndoe.jpg'
    },
    subject: {
      id: 201,
      name: 'Fizyka'
    },
    reviews: [
      {
        id: 301,
        rating: 5,
        comment: 'Świetne źródło zarówno dla początkujących, jak i zaawansowanych. Gorąco polecam!',
        author: {
          id: 102,
          name: 'Alice Smith',
          avatarUrl: 'https://example.com/avatar-alicesmith.jpg'
        },
        createdAt: '2023-06-01T12:00:00Z'
      },
      {
        id: 302,
        rating: 4,
        comment: 'Świetne wyjaśnienia, ale mogłoby być więcej szczegółowych diagramów.',
        author: {
          id: 103,
          name: 'Bob Johnson',
          avatarUrl: 'https://example.com/avatar-bobjohnson.jpg'
        },
        createdAt: '2023-06-15T10:30:00Z'
      },
      {
        id: 303,
        rating: 3,
        comment: 'Dobre źródło, ale niektóre sekcje były trudne do zrozumienia.',
        author: {
          id: 104,
          name: 'Charlie Brown',
          avatarUrl: 'https://example.com/avatar-charliebrown.jpg'
        },
        createdAt: '2023-07-02T14:45:00Z'
      }
    ],
    numberOfDownloads: 1250,
    creationDate: '2023-05-01T09:00:00Z',
    updateDate: '2023-08-01T12:00:00Z'
  };

  const averageRating = resource.reviews.reduce((acc, review) => acc + review.rating, 0) / resource.reviews.length;

  const mediaByType = resource.media.reduce(
    (acc, media) => {
      if (!acc[media.type]) {
        acc[media.type] = [];
      }
      acc[media.type].push(media);
      return acc;
    },
    {} as Record<string, Media[]>
  );

  return (
    <>
      <TopBar />
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="w-full overflow-hidden">
            <CardHeader className="relative">
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={resource.author.avatarUrl} alt={resource.author.name} />
                      <AvatarFallback>{resource.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl font-bold">{resource.title}</CardTitle>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <User className="w-4 h-4 mr-1" />
                        {resource.author.name}
                        <Separator className="mx-2 h-4" orientation="vertical" />
                        <Book className="w-4 h-4 mr-1" />
                        {resource.subject.name}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {averageRating.toFixed(1)} <Star className="w-4 h-4 ml-1 inline fill-current" />
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Zaktualizowano {format(new Date(resource.updateDate), 'PPP')}
                </div>
                <div className="flex items-center">
                  <Download className="w-4 h-4 mr-1" />
                  {resource.numberOfDownloads} pobrań
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-2">Opis</h3>
                <p className="text-muted-foreground">{resource.description}</p>
              </div>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">Wszystkie</TabsTrigger>
                  <TabsTrigger value="pdf">PDF</TabsTrigger>
                  <TabsTrigger value="video">Wideo</TabsTrigger>
                  <TabsTrigger value="image">Obraz</TabsTrigger>
                  <TabsTrigger value="other">Inne</TabsTrigger>
                </TabsList>
                {['all', 'pdf', 'video', 'image', 'other'].map(type => (
                  <TabsContent key={type} value={type} className="mt-4">
                    {hasAccess ? (
                      <div className="grid grid-cols-2 gap-4">
                        {type === 'all'
                          ? resource.media.map(item => <MediaItem key={item.id} media={item} />)
                          : mediaByType[type.toUpperCase()]?.map(item => <MediaItem key={item.id} media={item} />)}
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="grid grid-cols-2 gap-4 filter blur-sm">
                          {type === 'all'
                            ? resource.media.map(item => <MediaItem key={item.id} media={item} />)
                            : mediaByType[type.toUpperCase()]?.map(item => <MediaItem key={item.id} media={item} />)}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Download className="w-4 h-4 mr-2" />
                <p>{hasAccess ? 'Pobierz zasób' : 'Kup dostęp za 1 żeton'}</p>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle>Recenzje</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {resource.reviews.map(review => (
                  <AccordionItem key={review.id} value={`review-${review.id}`}>
                    <AccordionTrigger>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={review.author.avatarUrl} alt={review.author.name} />
                            <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{review.author.name}</span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground mb-2">{review.comment}</p>
                      <p className="text-xs text-muted-foreground">Opublikowano: {format(new Date(review.createdAt), 'PPP')}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default LearningResourceDetailView;
