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

interface LoggedUserSidebarProps {
  username: string;
  tokenCount: number;
}

export default function LoggedUserSidebar({ username = "John Doe", tokenCount = 100 }: LoggedUserSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const NavItem: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({ icon, children }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
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
    <div className={`flex flex-col h-screen bg-gray-100 text-gray-800 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
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
            <NavItem icon={<GraduationCap className="h-4 w-4" />}>Uczelnia Wyższa</NavItem>
            <NavItem icon={<School className="h-4 w-4" />}>Szkoła średnia</NavItem>
            <NavItem icon={<Briefcase className="h-4 w-4" />}>Inne</NavItem>
          </div>
        </div>
        <hr />
        <NavItem icon={<PlusCircle className="h-4 w-4" />}>Dodaj materiał</NavItem>
        <hr />
        <div
          className={`flex items-center space-x-2 px-4 py-2 rounded-md bg-gray-200 ${isCollapsed ? "justify-center" : ""}`}>
          <Coins className="h-4 w-4" />
          {!isCollapsed && <span>Tokeny: {tokenCount}</span>}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <NavItem icon={<User className="h-4 w-4" />}>Profil</NavItem>
        <NavItem icon={<Settings className="h-4 w-4" />}>Ustawienia</NavItem>
        <NavItem icon={<LogOut className="h-4 w-4" />}>Wyloguj</NavItem>
      </div>
    </div>
  )
}