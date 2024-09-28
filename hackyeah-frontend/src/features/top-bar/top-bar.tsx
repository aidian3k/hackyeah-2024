import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle.tsx';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { RoutePaths } from '@/router/Routes.types.ts';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store.ts';
import { UserState } from '@/store/user/user.slice.ts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import AvatarWithName, { DropdownForAvatar } from '@/components/avatar-with-name.tsx';

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user: UserState = useSelector((state: RootState) => state.user);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navigate = useNavigate();

  return (
    <header className="w-full py-4 px-6 bg-background shadow-sm">
      <div className="container mx-auto grid grid-cols-2 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center justify-between">
        {/* Left side - Logo */}
        <div className="flex-shrink-0 justify-self-start">
          <a href="/" className="text-2xl font-bold text-primary">
            Logo
          </a>
        </div>

        {/* Center - Navigation as (hidden on mobile) */}
        <nav className="hidden lg:flex space-x-12 justify-self-center">
          <a href="/dodaj-notatke" className="text-foreground hover:text-primary duration-200 transition-colors">
            Dodaj notatkę
          </a>
          <Link to={RoutePaths.ABOUT} className="text-foreground hover:text-primary duration-200 transition-colors">
            O nas
          </Link>
          <a href="/kontakt" className="text-foreground hover:text-primary duration-200 transition-colors">
            Kontakt
          </a>
          <a href="/faq" className="text-foreground hover:text-primary duration-200 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Right side - Auth buttons and mobile menu button */}
        {user.authenticated ? (
          <div className="flex items-center space-x-4 justify-self-end">
            <ModeToggle />
            <DropdownForAvatar
              name={'Cristiano'}
              surname={'Ronaldo'}
              email={'ronaldo@gmail.com'}
              pictureUrl={'https://www.aljazeera.com/wp-content/uploads/2022/08/GettyImages-83985994.jpg'}
            />
          </div>
        ) : (
          <div className="flex items-center space-x-4 justify-self-end">
            <ModeToggle />
            <div className="hidden md:flex space-x-4">
              <Button variant="outline" onClick={() => navigate(RoutePaths.LOGIN)}>
                Zaloguj się
              </Button>
              <Button onClick={() => navigate(RoutePaths.REGISTER)}>Zarejestruj się</Button>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        )}
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
            <Button variant="outline" className="w-full" onClick={() => navigate(RoutePaths.LOGIN)}>
              Zaloguj się
            </Button>
            <Button className="w-full" onClick={() => navigate(RoutePaths.REGISTER)}>
              Zarejestruj się
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
