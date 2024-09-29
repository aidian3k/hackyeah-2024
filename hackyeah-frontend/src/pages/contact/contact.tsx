import {useState} from 'react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useToast} from "@/hooks/use-toast.ts";
import TopBar from "@/features/top-bar/top-bar.tsx";
import Footer from "@/features/footer/footer.tsx";

export default function Contact() {
    const {toast} = useToast();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        await new Promise(resolve => setTimeout(resolve, 1000))

        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
        setIsSubmitting(false)
        toast({
            title: "Message Sent",
            description: "We've received your message and will get back to you soon.",
        })
    }

    return (
        <>
            <TopBar/>
            <Card className="w-full max-w-2xl my-10 mx-auto">
                <CardHeader>
                    <CardTitle>Kontakt z Obsługą Klienta</CardTitle>
                    <CardDescription>Wypełnij poniższy formularz, aby skontaktować się z naszym zespołem
                        wsparcia.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Imię</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Twoje imię"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="twój.email@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Select value={subject} onValueChange={setSubject} required>
                                <SelectTrigger id="subject">
                                    <SelectValue placeholder="Wybierz temat"/>
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
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                placeholder="Proszę opisz swój problem lub pytanie"
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
            <Footer/>
        </>
    )
}