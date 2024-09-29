import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import TopBar from '@/features/top-bar/top-bar.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';

export default function FAQView() {
  return (
    <>
      <TopBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">FAQ</h1>
        <Card>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Jak działa system dzielenia się notatkami?</AccordionTrigger>
                <AccordionContent>
                  Nasza platforma umożliwia użytkownikom dzielenie się notatkami ze studiów, szkół wyższych oraz innych dziedzin. Każdy
                  użytkownik może przesłać swoje notatki, które będą dostępne dla innych użytkowników.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Jak mogę uzyskać dostęp do notatek innych użytkowników?</AccordionTrigger>
                <AccordionContent>
                  Aby uzyskać dostęp do notatek, musisz zdobyć tokeny. Każdy raz, gdy ktoś pobierze Twoje notatki, otrzymujesz 1 token,
                  który możesz wykorzystać na pobranie notatek innego użytkownika.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Jak zdobyć tokeny?</AccordionTrigger>
                <AccordionContent>
                  Tokeny zdobywasz, kiedy ktoś inny pobiera Twoje notatki. Za każdą transakcję otrzymujesz 1 token, który możesz wykorzystać
                  na dostęp do notatek innych użytkowników.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Czy mogę kupić tokeny?</AccordionTrigger>
                <AccordionContent>
                  Aktualnie tokeny można zdobywać wyłącznie poprzez dzielenie się swoimi notatkami. Nie ma możliwości zakupu tokenów.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Czy notatki są weryfikowane przed udostępnieniem?</AccordionTrigger>
                <AccordionContent>
                  Tak, każda notatka przechodzi weryfikację pod kątem jakości, aby upewnić się, że treść jest wartościowa i spełnia
                  standardy platformy.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>Czy mogę usunąć swoje notatki z platformy?</AccordionTrigger>
                <AccordionContent>
                  Tak, możesz usunąć swoje notatki w dowolnym momencie. Jeśli jednak ktoś już pobrał Twoje notatki, nadal będą one dostępne
                  dla tej osoby.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>Czy moje notatki mogą być używane przez innych bez mojej zgody?</AccordionTrigger>
                <AccordionContent>
                  Notatki są dostępne dla innych użytkowników, ale tylko za Twoją zgodą, kiedy je udostępniasz. Każde pobranie jest
                  zarejestrowane, a Ty otrzymujesz token za każdą transakcję.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>Jak mogę przesłać notatki na platformę?</AccordionTrigger>
                <AccordionContent>
                  Po zarejestrowaniu się na platformie, przejdź do sekcji „Dodaj notatki", wybierz pliki, które chcesz udostępnić, i
                  wypełnij niezbędne informacje o notatkach, takie jak temat, przedmiot i kategoria.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger>Czy mogę edytować notatki po ich dodaniu?</AccordionTrigger>
                <AccordionContent>
                  Tak, możesz edytować swoje notatki w dowolnym momencie. Wystarczy przejść do swojego profilu i wybrać notatki, które
                  chcesz zaktualizować.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger>Co się stanie, jeśli ktoś zgłosi moje notatki jako niewłaściwe?</AccordionTrigger>
                <AccordionContent>
                  Jeśli Twoje notatki zostaną zgłoszone, zespół weryfikacyjny oceni zgłoszenie. Jeśli okaże się, że notatki naruszają zasady
                  platformy, mogą zostać usunięte, a Twój dostęp do platformy może być czasowo lub permanentnie zablokowany.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-11">
                <AccordionTrigger>Czy mogę udostępniać notatki w językach innych niż polski?</AccordionTrigger>
                <AccordionContent>
                  Tak, platforma obsługuje notatki w różnych językach. W trakcie przesyłania notatek zaznacz, w jakim języku są one
                  napisane.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-12">
                <AccordionTrigger>Jak mogę skontaktować się z obsługą klienta?</AccordionTrigger>
                <AccordionContent>
                  Możesz skontaktować się z nami za pośrednictwem formularza kontaktowego dostępnego w sekcji "Kontakt" lub wysłać wiadomość
                  bezpośrednio na nasz adres e-mail.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
