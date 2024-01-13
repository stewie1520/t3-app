
import { getServerAuthSession } from "@/server/auth/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerAuthSession();
  if (session) {
    redirect("/dashboard/listen-now");
  }

  redirect("/auth/sign-in")
}

