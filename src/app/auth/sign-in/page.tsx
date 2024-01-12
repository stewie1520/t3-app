import { getServerAuthSession } from "@/server/auth/auth"
import { getProviders } from "next-auth/react"
import { redirect } from "next/navigation"
import { SignInButton } from "./_components/sign-in-button"

export default async function SignIn({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const session = await getServerAuthSession()

  if (session) {
    const returnUrl = searchParams?.returnUrl as string
    redirect(returnUrl ? returnUrl : "/" )
  }

  const providers = (await getProviders())?? []

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#191A23] text-white">
        <div className="w-full max-w-[400px] p-6 bg-[#21232E] rounded-lg border border-[#2C2D3C] flex flex-col gap-1">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <SignInButton provider={provider}/>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

