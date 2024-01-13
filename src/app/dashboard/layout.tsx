import { getServerAuthSession } from "@/server/auth/auth";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { Menu } from "./components/menu";
import { Sidebar } from "./components/sidebar";
import { playlists } from "./data/playlists";

export default async function DashboardLayout({
  children
}: {
  children: ReactNode
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect('/auth/sign-in')
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <Menu />
        <div className="border-t h-full flex flex-col flex-1">
          <div className="bg-background h-full flex flex-1">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block h-full" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}