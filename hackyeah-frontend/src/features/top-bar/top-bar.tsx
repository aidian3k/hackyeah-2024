import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'

export default function TopBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <header className="w-full py-4 px-6 bg-white shadow-sm">
            <div className="container mx-auto flex items-center justify-between">
                {/* Left side - Logo */}
                <div className="flex-shrink-0">
                    <a href="/" className="text-2xl font-bold text-primary">
                        Logo
                    </a>
                </div>

                {/* Center - Navigation as (hidden on mobile) */}
                <nav className="hidden md:flex space-x-6">
                    <a href="/dodaj-notatke" className="text-gray-600 hover:text-primary transition-colors">
                        Dodaj notatkę
                    </a>
                    <a href="/o-nas" className="text-gray-600 hover:text-primary transition-colors">
                        O nas
                    </a>
                    <a href="/kontakt" className="text-gray-600 hover:text-primary transition-colors">
                        Kontakt
                    </a>
                    <a href="/faq" className="text-gray-600 hover:text-primary transition-colors">
                        FAQ
                    </a>
                </nav>

                {/* Right side - Auth buttons and mobile menu button */}
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex space-x-4">
                        <Button variant="outline">Zaloguj</Button>
                        <Button>Zarejestruj</Button>
                    </div>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden mt-4">
                    <nav className="flex flex-col space-y-4">
                        <a href="/dodaj-notatke" className="text-gray-600 hover:text-primary transition-colors">
                            Dodaj notatkę
                        </a>
                        <a href="/o-nas" className="text-gray-600 hover:text-primary transition-colors">
                            O nas
                        </a>
                        <a href="/kontakt" className="text-gray-600 hover:text-primary transition-colors">
                            Kontakt
                        </a>
                        <a href="/faq" className="text-gray-600 hover:text-primary transition-colors">
                            FAQ
                        </a>
                        <Button variant="outline" className="w-full">Zaloguj</Button>
                        <Button className="w-full">Zarejestruj</Button>
                    </nav>
                </div>
            )}
        </header>
    )
}