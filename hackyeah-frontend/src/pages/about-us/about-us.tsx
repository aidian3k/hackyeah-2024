import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Share2, Users } from 'lucide-react';
import TopBar from '@/features/top-bar/top-bar.tsx';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@/router/Routes.types.ts';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <main className="flex-grow">
        {/* Sekcja Hero */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-6">Dziel się wiedzą, zaliczaj studia na 5!</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Uzyskaj dostęp i dziel się notatkami z innymi studentami. Poszerz swoją wiedzę w interesujących Cię dziedzinach.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" onClick={() => navigate(RoutePaths.REGISTER)}>
                  Zacznij teraz
                </Button>
                <Button size="lg" variant="outline">
                  Dowiedz się więcej
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Sekcja Funkcje */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Dlaczego nasza platforma?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<BookOpen className="h-10 w-10" />}
                title="Dostęp do wysokiej jakości notatek"
                description="Uzyskaj dostęp do szerokiej gamy wysokiej jakości notatek od swoich rówieśników z różnych przedmiotów."
              />
              <FeatureCard
                icon={<Share2 className="h-10 w-10" />}
                title="Łatwe udostępnianie"
                description="Dziel się swoimi notatkami bez wysiłku i pomagaj innym, jednocześnie utrwalając swoją wiedzę."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10" />}
                title="Nauka w grupie"
                description="Połącz się z innymi studentami o podobnych zainteresowaniach i uczcie się razem efektywniej."
              />
            </div>
          </div>
        </section>

        {/* Sekcja CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Gotowy, aby poprawić swoje wyniki?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Dołącz do naszej społeczności uczniów i zacznij dzielić się wiedzą już dziś!
            </p>
            <Button size="lg" onClick={() => navigate(RoutePaths.REGISTER)}>
              Zarejestruj się
            </Button>
          </div>
        </section>

        {/* Sekcja Newsletter */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Bądź na bieżąco</h2>
              <p className="text-muted-foreground mb-6">
                Zapisz się do naszego newslettera, aby otrzymywać najnowsze funkcje i porady do nauki.
              </p>
              <form className="flex gap-2">
                <Input type="email" placeholder="Wpisz swój e-mail" className="flex-grow" />
                <Button type="submit">Subskrybuj</Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Aplikacja do dzielenia się notatkami. Wszelkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-background p-6 rounded-lg shadow-md text-center">
      <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
