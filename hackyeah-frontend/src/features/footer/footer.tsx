import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-600 py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center">
                            <img src="/placeholder.svg" alt="Logo firmy" width={40} height={40} className="mr-2" />
                            <span className="text-xl font-bold">NoteShare</span>
                        </Link>
                        <p className="text-sm">Krótki opis firmy lub slogan może być tutaj umieszczony.</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Nawigacja</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-gray-900">Strona główna</Link></li>
                            <li><Link to="/o-nas" className="hover:text-gray-900">O nas</Link></li>
                            <li><Link to="/zalozyciele" className="hover:text-gray-900">Założyciele</Link></li>
                            <li><Link to="/kontakt" className="hover:text-gray-900">Kontakt</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Użytkownik</h3>
                        <ul className="space-y-2">
                            <li><Link to="/zaloguj" className="hover:text-gray-900">Zaloguj</Link></li>
                            <li><Link to="/zarejestruj" className="hover:text-gray-900">Zarejestruj</Link></li>
                            <li><Link to="/dodaj-notatke" className="hover:text-gray-900">Dodaj notatkę</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Informacje prawne</h3>
                        <ul className="space-y-2">
                            <li><Link to="/polityka-prywatnosci" className="hover:text-gray-900">Polityka prywatności</Link></li>
                            <li><Link to="/regulamin" className="hover:text-gray-900">Regulamin</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm">
                    © {new Date().getFullYear()} Nazwa Firmy. Wszelkie prawa zastrzeżone.
                </div>
            </div>
        </footer>
    )
}