"use client";

import { Dialog } from "@/components/ui";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { useAuth } from "../auth-context";

export function AuthModal() {
  const { view, closeAuth } = useAuth();

  return (
    <Dialog open={view !== null} onClose={closeAuth} title={view === "signUp" ? "Sign Up" : "Sign In"}>
      {view === "signUp" ? <SignUpForm /> : <SignInForm />}
    </Dialog>
  );
}
