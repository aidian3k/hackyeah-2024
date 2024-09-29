import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useActuatorExampeQuery } from '@/api/query/actuatorExampleQuery.ts';
import { useToast } from '@/hooks/use-toast.ts';
import TopBar from '@/features/top-bar/top-bar.tsx';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Footer from '@/features/footer/footer.tsx';
import MainPageFilters from './main-page-filters/main-page-filters.component';
import AlternativeMaterialTile from '@/features/MaterialTile/alternative-material-tile.tsx';

interface CarouselText {
  title: string;
  subtitle: string;
}

const alternativeMaterialMock = {
  author: {
    name: 'Cezary Skorupski',
    avatarUrl:
      'https://media.licdn.com/dms/image/v2/D4D03AQHRyjS_ulUnbQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1698778439429?e=1733356800&v=beta&t=jeyB5fH9ZQhxYSAkmoGVflCJ2wMzssESOQ4NutWha4E'
  },
  title: 'Uprawnienia w systemach operacyjnych',
  lastUpdated: '03.2024',
  rating: 3,
  downloads: 3000,
  description:
    'Notatki z sieci komputerowych zawierające najważniejsze informacje z wykładów i ćwiczeń. Przygotowane przez studentów informatyki.',
  fileComposition: {
    video: 5,
    image: 1,
    text: 30
  }
};

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
import MaterialTile from '@/features/MaterialTile/MaterialTile.component';
import { FormProvider, useForm } from 'react-hook-form';
import { LearningResourcesFilterInputs } from '@/ts/interface/LearningResource';
import { useGetLearningMaterials } from '@/api/query/learningResourceQuery';

const materialMock = [
  {
    title: 'Algorytmy kompresji',
    subject: 'Języki i metody programowania',
    author: 'Basia Gąsiewska',
    date: '03.2024',
    grade: 3.5,
    used: 1762,
    descr:
      'Aby zrobić te materiały chodziłam na wszystkie wykłady. Zawiera wszystkie informacje, które były warte zapamiętania według jstara.',
    dataTypes: {
      video: 2,
      pdf: 3,
      written: 4,
      call: 0
    }
  },
  {
    title: 'siema',
    subject: 'siema',
    author: 'siema siema',
    date: '03.2024',
    grade: 3.5,
    used: 1762,
    descr: 'bla bla bla',
    dataTypes: {
      video: 2,
      pdf: 3,
      written: 4,
      call: 0
    }
  },
  {
    title: 'siema',
    subject: 'siema',
    author: 'siema siema',
    date: '03.2024',
    grade: 3.5,
    used: 1762,
    descr: 'bla bla bla',
    dataTypes: {
      video: 2,
      pdf: 3,
      written: 4,
      call: 0
    }
  }
];

const bgImagesPrefix: string = '/images/home-page/note';

const carouselTexts: CarouselText[] = [
  {
    title: 'Znajdź notatki i zalicz każdy egzamin!',
    subtitle: 'Przeglądaj i udostępniaj materiały ze swojej uczelni.'
  },
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
  const [activeCategory, setActiveCategory] = useState('Studia');
  const { toast } = useToast();
  const formMethods = useForm<LearningResourcesFilterInputs>();

  const { data: learningResources, isLoading, isSuccess } = useGetLearningMaterials({ 
    institutionId: formMethods.getValues('institutionId'),
    unitId: formMethods.getValues('unitId'),
    studyId: formMethods.getValues('studyId'),
    subject: formMethods.getValues('subject')
  });

  const onSubmit = (data: LearningResourcesFilterInputs) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <TopBar />
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
          <div className="absolute inset-x-0 bottom-[200px] flex flex-col gap-10 justify-center items-center">
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
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
              <div className={'flex h-fit w-fit shadow-2xl shadow-black'}>
                <Input
                  size={300}
                  className="rounded-r-none w-full max-w-2xl bg-background backdrop-blur rounded-tl-none h-16"
                  placeholder="Wpisz wyszukiwaną frazę..."
                  {...formMethods.register('subject')}
                />
                <Button className={'rounded-l-none h-16 group'} size={'lg'} type="submit">
                  <MagnifyingGlassIcon className="mr-2 size-4 group-hover:size-5 transition-all duration-200" />
                  Szukaj
                </Button>
              </div>
            </div>
            <div className="mx-auto min-w-[320px] px-5">
              <MainPageFilters />
            </div>
            </form>
      </FormProvider>
          </div>
        </div>
        <div className="container mx-auto pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5">
            {/*{materialMock.map(elem => (*/}
            {/*  <MaterialTile material={elem} />*/}
            {/*))}*/}
            <AlternativeMaterialTile {...alternativeMaterialMock} />
            <AlternativeMaterialTile {...alternativeMaterialMock} />
            <AlternativeMaterialTile {...alternativeMaterialMock} />
            <AlternativeMaterialTile {...alternativeMaterialMock} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
