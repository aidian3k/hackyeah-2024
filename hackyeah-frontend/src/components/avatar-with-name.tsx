import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function DropdownForAvatar({
  name,
  surname,
  pictureUrl
}: {
  name: string | undefined;
  surname: string | undefined;
  email: string | undefined;
  pictureUrl: string | undefined;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-10">
            <AvatarImage src={pictureUrl} alt="Profile picture" />
            <AvatarFallback>{name?.at(0) + '' + surname?.at(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Moje konto</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Ustawienia</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsOpen(true)}>Wyloguj się</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
