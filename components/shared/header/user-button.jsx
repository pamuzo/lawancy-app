'use client";';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React from "react";
import { FiBell, FiLogOut, FiSettings, FiUser } from "react-icons/fi";

function Usermenu({ session, signOutUser }) {
  const firstInitial = session.user.name.charAt(0).toUpperCase() ?? "U";
  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center  bg-gray-200  hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-['#00425A'] text-[#00425A] text-lg font-semibold"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-46" align="end" forceMount>
          <DropdownMenuLabel className="foot-normal ">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none text-gray-900">
                {session.user.name}
              </p>
              <p className="text-xs text-muted-foreground leading-none">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className={"p-0 mb-1"}>
            <Button
              className="w-full py-4 px-2 h-4 justify-start text-muted-foreground "
              variant="ghost"
            >
              <FiUser /> Profile
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem className={"p-0 mb-1"}>
            <Button
              className="w-full py-4 px-2 h-4 justify-start text-muted-foreground "
              variant="ghost"
            >
              <FiSettings /> Settings
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem className={"p-0 mb-1"}>
            <Button
              className="w-full py-4 px-2 h-4 justify-start text-muted-foreground "
              variant="ghost"
            >
              <FiBell /> Notifications
            </Button>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0 mb-1">
            <Button
              onClick={signOutUser}
              // formAction={signOutUser}
              className="w-full py-4 px-2 h-4 justify-start text-muted-foreground "
              variant="ghost"
            >
              <FiLogOut /> Sign Out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Usermenu;
