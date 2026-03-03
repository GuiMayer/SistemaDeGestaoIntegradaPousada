"use client";

import React from 'react';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserNav = () => {
  const initials = "JD"; // Example initials

  return (
    <nav className="bg-zinc-100/50 backdrop-blur-lg p-4 flex items-center justify-end gap-2">
      <Avatar>
        <AvatarImage src="/avatar.png" alt="User Avatar" />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <Button variant="outline" size="icon">
        <Settings />
      </Button>
      <Button variant="outline" size="icon">
        <LogOut />
      </Button>
      <Button variant="outline" size="icon">
        <ChevronDown />
      </Button>
    </nav>
  );
};

export default UserNav;