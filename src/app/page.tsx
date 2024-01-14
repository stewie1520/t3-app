
import { getServerAuthSession } from "@/server/auth/auth";
import { redirect } from "next/navigation";
import { Onboarding } from "./_components/onboarding/onboarding";
import { UserMenu } from "./_components/user-menu/user-menu";

export default async function PageController() {
  const session = await getServerAuthSession();
  if (session?.user.role) {
    redirect("/dashboard/listen-now");
  }

  if (!session) {
    redirect("/auth/sign-in")
  }

  return (
    <div className="min-h-screen relative bg-background flex items-center justify-center">
      <UserMenu className="absolute top-6 right-6"/>
      <Onboarding/>
    </div>
  )
}

