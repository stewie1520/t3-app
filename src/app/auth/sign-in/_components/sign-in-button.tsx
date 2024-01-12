"use client"

import { signIn, type ClientSafeProvider } from "next-auth/react"
import { type FC } from "react"
import { GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons"

interface ISignInButtonProps {
  provider: ClientSafeProvider
}

const overrideStyles = { boxShadow: 'none' }

export const SignInButton: FC<ISignInButtonProps> = ({ provider }) => {
  switch (provider.id) {
    case "google": 
      return <GoogleLoginButton style={overrideStyles} onClick={() => signIn("google", {  })}/>
    case "github":
      return <GithubLoginButton style={overrideStyles} onClick={() => signIn("github")}/>
  }

  return <button>Sign in with {provider.name}</button>
}