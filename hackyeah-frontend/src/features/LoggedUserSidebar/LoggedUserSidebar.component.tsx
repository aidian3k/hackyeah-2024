import React, {useState} from 'react';
import {
    Briefcase,
    ChevronLeft,
    ChevronRight,
    Coins,
    GraduationCap,
    LogOut,
    PlusCircle,
    School,
    Settings,
    User
} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {useNavigate} from 'react-router-dom';
import {RoutePaths} from '@/router/Routes.types.ts';

import delfinLogo from '@/assets/delfin.svg';
import {logout} from "@/store/user/user.slice.ts";
import {useDispatch} from "react-redux";

interface LoggedUserSidebarProps {
    username: string;
    tokenCount: number;
}

const Logo = () => (
    <div className="flex items-center justify-center h-16 w-16">
        {' '}
        <img src={delfinLogo} alt="Delfin logo" className="h-full w-full"/>
    </div>
);

export default function LoggedUserSidebar({username, tokenCount}: LoggedUserSidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOptionClick = (option: string, path?: string) => {
        setSelectedOption(option);
        if (path) {
            navigate(path);
        }
    };

    const NavItem: React.FC<{
        icon: React.ReactNode;
        children: React.ReactNode;
        option: string;
        path?: string,
        onClick?: () => void
    }> = ({
              icon,
              children,
              option,
              path,
              onClick
          }) => (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        onClick={() => {onClick(); handleOptionClick(option, path);}}
                        className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} hover:bg-primary transition-colors ${
                            selectedOption === option ? 'bg-primary-foreground' : ''
                        }`}
                    >
                        {icon}
                        {!isCollapsed && <span className="ml-2">{children}</span>}
                    </Button>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">{children}</TooltipContent>}
            </Tooltip>
        </TooltipProvider>
    );

    const SectionTitle: React.FC<{ children: React.ReactNode }> = ({children}) => (
        <h3 className={`text-sm font-semibold ${isCollapsed ? 'sr-only' : 'mb-2'}`}>{children}</h3>
    );

    return (
        <div
            className={`flex flex-col h-screen bg-background transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <a href="/" className="text-2xl font-bold text-primary">
                <div className="flex items-center space-x-2">
                    <Logo/>
                    {!isCollapsed && <span className="font-bold text-lg">Dolphinder</span>}
                </div>
            </a>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                {!isCollapsed && <span className="font-semibold">{username}</span>}
                <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="ml-auto">
                    {isCollapsed ? <ChevronRight className="h-4 w-4"/> : <ChevronLeft className="h-4 w-4"/>}
                </Button>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <div>
                    <NavItem icon={<PlusCircle className="h-4 w-4"/>} option="dashboard" path={RoutePaths.DASHBOARD}>
                        Dashboard
                    </NavItem>
                </div>
                <div>
                    <SectionTitle>Szukaj</SectionTitle>
                    <div className="space-y-1">
                        <NavItem icon={<GraduationCap className="h-4 w-4"/>} option="university"
                                 path={RoutePaths.MAIN_PAGE}>
                            Uczelnia Wyższa
                        </NavItem>
                        <NavItem icon={<School className="h-4 w-4"/>} option="highSchool" path={RoutePaths.MAIN_PAGE}>
                            Szkoła średnia
                        </NavItem>
                        <NavItem icon={<Briefcase className="h-4 w-4"/>} option="other" path={RoutePaths.MAIN_PAGE}>
                            Inne
                        </NavItem>
                    </div>
                </div>
                <hr/>
                <div>
                    <NavItem icon={<PlusCircle className="h-4 w-4"/>} option="addMaterial"
                             path={RoutePaths.ADD_MATERIAL}>
                        Dodaj materiał
                    </NavItem>
                </div>
                <hr/>
                <div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md bg-gray-200 ${isCollapsed ? 'justify-center' : ''}`}>
                    <Coins className="h-4 w-4"/>
                    {!isCollapsed && <span>Tokeny: {tokenCount}</span>}
                </div>
            </nav>

            <div className="p-4 border-t border-gray-200">
                <NavItem icon={<Coins className="h-4 w-4"/>} option="tokens">
                    <span>Tokeny: {tokenCount}</span>
                </NavItem>
            </div>
            <div className="p-4 border-t border-gray-200">
                <NavItem icon={<User className="h-4 w-4"/>} option="profile">
                    Profil
                </NavItem>
                <NavItem icon={<Settings className="h-4 w-4"/>} option="settings">
                    Ustawienia
                </NavItem>
                <NavItem onClick={() => {dispatch(logout())}} icon={<LogOut className="h-4 w-4"/>} option="logout" path={RoutePaths.LOGIN}>
                    Wyloguj
                </NavItem>
            </div>
        </div>
    );
}
