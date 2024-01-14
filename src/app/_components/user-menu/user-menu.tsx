"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon, ExitIcon } from "@radix-ui/react-icons";
import { LifeBuoy } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { type FC } from "react";

interface IProps {
  className?: string
}

export const UserMenu: FC<IProps> = (props) => {
  const { data: session, status } = useSession()

  return (
    <div className={cn(props.className)}>
      { status === "loading" ? (
        <>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        </>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex flex-row items-center gap-2 cursor-pointer hover:bg-slate-100 rounded-md p-2 transition-all">
              <Avatar>
                <AvatarImage src={session?.user.image ?? ""} />
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold flex items-center gap-2">{session?.user.name} <ChevronDownIcon/> </span>
                <span className="text-xs font-normal text-gray-600">{session?.user.email}</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => signOut()}>
              <ExitIcon className="mr-2 h-4 w-4"/>
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}