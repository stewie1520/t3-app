import { getServerAuthSession } from "@/server/auth/auth"
import { getProviders } from "next-auth/react"
import { redirect } from "next/navigation"
import { SignInButton } from "./components/sign-in-button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const mapErrorToMessage = (error: string) => {
  switch (error) {
    case "OAuthAccountNotLinked":
      return "This account is already linked to another user"
  }

  return ""
}

export default async function SignIn({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const session = await getServerAuthSession()

  if (session) {
    const returnUrl = searchParams?.returnUrl as string
    redirect(returnUrl ? returnUrl : "/" )
  }

  const errorMsg = mapErrorToMessage(searchParams?.error as string)
  const providers = (await getProviders())?? []

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="w-full max-w-[400px] p-6 bg-background rounded-lg border flex flex-col gap-3">
          {errorMsg && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {errorMsg}
              </AlertDescription>
            </Alert>
          )}

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

