"use client"

import { signIn, type ClientSafeProvider } from "next-auth/react"
import { type FC } from "react"
import { GithubLoginButton } from "./github-login-button"
import { GoogleLoginButton } from "./google-login-button"

interface ISignInButtonProps {
  provider: ClientSafeProvider
}

export const SignInButton: FC<ISignInButtonProps> = ({ provider }) => {
  switch (provider.id) {
    case "google": 
      return <GoogleLoginButton onClick={() => signIn("google")}/>
    case "github":
      return <GithubLoginButton onClick={() => signIn("github")}/>
  }

  return <button>Sign in with {provider.name}</button>
}