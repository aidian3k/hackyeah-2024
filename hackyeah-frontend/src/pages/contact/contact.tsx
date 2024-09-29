import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast.ts';
import TopBar from '@/features/top-bar/top-bar.tsx';
import Footer from '@/features/footer/footer.tsx';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [viewState, setViewState] = useState({
    latitude: 52.237049,
    longitude: 21.017532,
    zoom: 13
  });

  const formFields = [
    { name: 'name', label: 'Imię', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'message', label: 'Wiadomość', type: 'textarea' }
  ];

  const contactInfo = [
    { icon: MapPin, text: 'Tauron Arena 18, Kraków, Polska' },
    { icon: Phone, text: '+48 123 456 789' },
    { icon: Mail, text: 'dolphiner@gmail.com' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setIsSubmitting(false);
    toast({
      title: 'Wiadomość wysłana',
      description: 'Otrzymaliśmy Twoją wiadomość i wkrótce się odezwiemy.'
    });
  };

  return (
    <>
      <TopBar />
      <div className="min-h-screen bg-background p-8">
        <motion.h1
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Skontaktuj się z nami
        </motion.h1>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle>Kontakt z Obsługą Klienta</CardTitle>
                <CardDescription>Wypełnij poniższy formularz, aby skontaktować się z naszym zespołem wsparcia.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Imię</Label>
                    <Input id="name" value={name} onChange={e => setName(e.target.value)} required placeholder="Twoje imię" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="twój.email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Temat</Label>
                    <Select value={subject} onValueChange={setSubject} required>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Wybierz temat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Zapytanie ogólne</SelectItem>
                        <SelectItem value="technical">Wsparcie techniczne</SelectItem>
                        <SelectItem value="billing">Pytanie dotyczące płatności</SelectItem>
                        <SelectItem value="feedback">Opinia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Wiadomość</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      required
                      placeholder="Opisz swój problem lub pytanie"
                      className="min-h-[100px]"
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Informacje kontaktowe</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      >
                        <info.icon className="h-5 w-5 text-green-500" />
                        <span>{info.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
