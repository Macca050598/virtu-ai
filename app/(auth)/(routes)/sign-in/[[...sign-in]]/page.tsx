"use client"
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleSignIn = () => {
    // Redirect to the dashboard after sign-in
    router.push("/dashboard");
  };

  return (
    <div>
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
      />
    </div>
  );
}