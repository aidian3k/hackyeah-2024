"use client"

import React, { useState } from 'react'
import {
  User,
  PlusCircle,
  Coins,
  Settings,
  LogOut,
  GraduationCap,
  School,
  Briefcase,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const Logo = () => (
  <div className="flex items-center justify-center h-8 w-8 bg-blue-500 text-white rounded-full">
    D
  </div>
);
interface LoggedUserSidebarProps {
  username: string;
  tokenCount: number;
}

export default function LoggedUserSidebar({ username, tokenCount }: LoggedUserSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const NavItem: React.FC<{ icon: React.ReactNode; children: React.ReactNode; option: string }> = ({ icon, children, option }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={() => handleOptionClick(option)}
            className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} hover:bg-gray-200 transition-colors ${selectedOption === option ? 'bg-blue-100' : ''}`}
          >
            {icon}
            {!isCollapsed && <span className="ml-2">{children}</span>}
          </Button>
        </TooltipTrigger>
        {isCollapsed && <TooltipContent side="right">{children}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  )

  const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className={`text-sm font-semibold text-gray-500 ${isCollapsed ? 'sr-only' : 'mb-2'}`}>{children}</h3>
  )

  return (
    <div
      className={`flex flex-col h-screen bg-gray-100 text-gray-800 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Logo />
          {!isCollapsed && <span className="font-bold text-lg">Dolphinder</span>}
        </div>
      </div>
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        {!isCollapsed && <span className="font-semibold">{username}</span>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <div>
          <SectionTitle>Szukaj</SectionTitle>
          <div className="space-y-1">
            <NavItem icon={<GraduationCap className="h-4 w-4" />} option="college">Uczelnia Wyższa</NavItem>
            <NavItem icon={<School className="h-4 w-4" />} option="school">Szkoła średnia</NavItem>
            <NavItem icon={<Briefcase className="h-4 w-4" />} option="other">Inne</NavItem>
          </div>
        </div>
        <hr />
        <div>
          <NavItem icon={<PlusCircle className="h-4 w-4" />} option="addMaterial">Dodaj materiał</NavItem>
        </div>
        <hr />
      </nav>

      <div className="p-4 border-t border-gray-200">
        <NavItem icon={<Coins className="h-4 w-4" />}><span>Tokeny: {tokenCount}</span></NavItem>
      </div>
      <div className="p-4 border-t border-gray-200">
        <NavItem icon={<User className="h-4 w-4" />} option="profile">Profil</NavItem>
        <NavItem icon={<Settings className="h-4 w-4" />} option="settings">Ustawienia</NavItem>
        <NavItem icon={<LogOut className="h-4 w-4" />} option="logout">Wyloguj</NavItem>
      </div>
    </div>
  )
}