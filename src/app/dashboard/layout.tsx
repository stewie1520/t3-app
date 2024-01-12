import { getServerAuthSession } from "@/server/auth/auth";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";

export default async function DashboardLayout({
  children
}: {
  children: ReactNode
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect('/auth/sign-in?returnUrl=/dashboard/members')
  }

  return (
    <div>
      <div>Sidebar</div>
      {children}
    </div>
  )
}