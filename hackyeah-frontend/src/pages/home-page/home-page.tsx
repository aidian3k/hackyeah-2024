import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useActuatorExampeQuery } from '@/api/query/actuatorExampleQuery.ts';
import { useToast } from '@/hooks/use-toast.ts';
import UniversitiesAutocomplete from '@/features/common/UniversitiesAutocomplete/UniversitiesAutocomplete.component';

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
        <div className="container flex h-14 items-center">NAVBAR</div>
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
                        backgroundImage: `url(/images/home-page/note-${index + 1}.jpg)`
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-x-0 top-[20%] md:top-1/3 flex items-center justify-center">
                      <h2 className="text-7xl font-bold text-white text-center">Important Info {index + 1}</h2>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
          <div className="absolute inset-x-0 bottom-1/3 flex flex-col justify-center items-center">
          <UniversitiesAutocomplete />

            <div className="mx-auto min-w-96">
              <Tabs defaultValue="Studia" onValueChange={setActiveCategory}>
                <TabsList className="rounded-b-none">
                  <TabsTrigger value="Studia">Studia</TabsTrigger>
                  <TabsTrigger value="Szkoła średnia">Szkoła średnia</TabsTrigger>
                  <TabsTrigger value="Inne">Inne</TabsTrigger>
                </TabsList>
              </Tabs>
              <Input className="w-full max-w-2xl bg-white/90 backdrop-blur rounded-tl-none" placeholder="Search universities..." />
            </div>
          </div>
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
