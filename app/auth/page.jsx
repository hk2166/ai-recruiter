"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";

const Login = () => {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://ai-recruiter-azure.vercel.app/dashboard`,
      },
    });

    if (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="flex flex-col items-center justify-center border rounded-2xl p-8 shadow-lg max-w-md w-full">
          <Image
            className="w-[95px]"
            src="/logo.png"
            alt="logo"
            width={95}
            height={95}
          />

          <div className="flex flex-col items-center justify-center mt-6">
            <Image
              className="w-[400px] h-[400px] rounded-2xl object-cover"
              src="/login.png"
              alt="login"
              width={400}
              height={400}
            />
            <h2 className="text-2xl font-bold text-center mt-4">
              Welcome to AIcruiter
            </h2>
            <p className="text-center text-gray-500">
              Login via Google Authentication
            </p>
            <Button onClick={signInWithGoogle} className="w-full mt-7">
              Sign in with Google
            </Button>
          </div>
        </div>
      </div>
  );
};

export default Login;