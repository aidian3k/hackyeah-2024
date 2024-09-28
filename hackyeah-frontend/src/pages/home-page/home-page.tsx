import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useActuatorExampeQuery } from '@/api/query/actuatorExampleQuery.ts';
import { useToast } from '@/hooks/use-toast.ts';
import UnauthorizedTopBar from '@/features/top-bar/unauthorized-top-bar.tsx';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

interface CarouselText {
  title: string;
  subtitle: string;
}
import UniversitiesAutocomplete from '@/features/common/UniversitiesAutocomplete/UniversitiesAutocomplete.component';
import MainPageFilters from './main-page-filters/main-page-filters.component';

const universities = [
  'Harvard University',
  'Stanford University',
  'Massachusetts Institute of Technology',
  'University of Cambridge',
  'University of Oxford',
  'California Institute of Technology',
  'ETH Zurich',
  'University College London',
  'Imperial College London',
  'University of Chicago',
  'National University of Singapore',
  'Peking University'
];

const bgImagesPrefix: string = '/images/home-page/note';

const carouselTexts: CarouselText[] = [
  { title: 'Znajdź notatki i zalicz każdy egzamin!', subtitle: 'Przeglądaj i udostępniaj materiały ze swojej uczelni.' },
  {
    title: 'Wspólnie budujemy bazę wiedzy!',
    subtitle: 'Dołącz do społeczności, gdzie studenci dzielą się notatkami i wspierają się w nauce.'
  },
  {
    title: 'Wymieniaj notatki na tokeny i korzystaj z wiedzy innych!',
    subtitle: 'Za każdą udostępnioną notatkę otrzymujesz jeden token, który pozwala Ci przeglądać i korzystać z notatek innych studentów.'
  }
];

export default function HomePage() {
  const { data, isError, error } = useActuatorExampeQuery({});
  const [activeCategory, setActiveCategory] = useState('Studia');
  const { toast } = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Niedostępność serwera',
        description: error?.message
      });
    }
  }, [isError]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <UnauthorizedTopBar />
      </header>
      <main className="w-full">
        <div className="relative mb-8">
          <Carousel className="w-full h-full">
            <CarouselContent>
              {[1, 2, 3].map((_, index) => (
                <CarouselItem key={index}>
                  <div className="relative min-h-screen w-full overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${bgImagesPrefix}-${index + 1}.jpg)`
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-x-0 top-[20%] md:top-1/3 flex flex-col gap-3 items-center justify-center">
                      <h2 className="text-5xl font-bold text-white text-center">{carouselTexts[index].title}</h2>
                      <h2 className="text-xl text-white text-center">{carouselTexts[index].subtitle}</h2>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
          <div className="absolute inset-x-0 bottom-1/3 flex flex-col justify-center items-center">
            <div className="mx-auto min-w-[320px] px-5">
              <Tabs defaultValue="Studia" onValueChange={setActiveCategory}>
                <TabsList className="rounded-b-none h-fit">
                  <TabsTrigger className={'py-2 px-4'} value="Studia">
                    Studia
                  </TabsTrigger>
                  <TabsTrigger className={'py-2 px-4'} value="Szkoła średnia">
                    Szkoła średnia
                  </TabsTrigger>
                  <TabsTrigger className={'py-2 px-4'} value="Inne">
                    Inne
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className={'flex h-fit shadow-2xl shadow-black'}>
                <Input
                  size={300}
                  className="rounded-r-none w-full max-w-2xl bg-background backdrop-blur rounded-tl-none h-16"
                  placeholder="Wpisz wyszukiwaną frazę..."
                />
                <Button className={'rounded-l-none h-16 group'} size={'lg'}>
                  <MagnifyingGlassIcon className="mr-2 size-4 group-hover:size-5 transition-all duration-200" />
                  Szukaj
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-1/3 flex flex-col justify-center items-center">
          <MainPageFilters />
        </div>
        <div className="container mx-auto px-4 py-8 relative -top-56">
          <Card className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-5">
            {universities.map((university, index) => (
              <Card key={index}>
                <CardContent className="flex items-center justify-between p-4">
                  <span className="text-lg font-medium">{university}</span>
                  <Button variant="outline">View</Button>
                </CardContent>
              </Card>
            ))}
          </Card>
        </div>
      </main>
    </div>
  );
}
