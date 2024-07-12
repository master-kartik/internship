"use client";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { supabaseBrowserClient } from "@/supabase/supabaseClient";
import { Provider } from "@supabase/supabase-js";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
const AuthPage = () => {
  const [authenticating, setAuthenticating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getCurrUser = async () => {
      const {
        data: { session },
      } = await supabaseBrowserClient.auth.getSession();

      if (session) {
        return router.push("/");
      }
    };

    getCurrUser();
    setIsMounted(true);
  }, [router]);

  async function socialAuth(provider: Provider) {
    setAuthenticating(true);
    await supabaseBrowserClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `https://1811-labs-pickup-git-master-master-kartiks-projects.vercel.app/auth/callback`,
      },
    });
    setAuthenticating(false);
  }
  if (!isMounted) return null;
  return (
    <>
      <div
        className={`flex flex-col h-screen items-center justify-center text-center bg-white text-black ${inter.className}`}
      >
        <div className="flex flex-col gap-4 items-center justify-center">
          <Image
            src="/assets/heart.png"
            width={43}
            height={43}
            alt="google logo"
          />
          <h2 className="text-[24px] tracking-tighter text-[#212121] font-semibold">
            Pickup line generator
          </h2>
          <p className="tracking-tight text-[16px] -mt-3 mb-4 text-[#212121] font-medium opacity-50">
            Generate pickup line for your crush now!
          </p>
        </div>

        <button
          onClick={() => socialAuth("google")}
          disabled={authenticating}
          className="flex items-center tracking-tight justify-center bg-[#FAFAFA] px-4 py-2  w-[80vw] lg:w-[20vw] rounded-full font-semibold text-[16px] text-black"
        >
          <Image
            src="/assets/google.webp"
            width={25}
            height={25}
            alt="google logo"
          />
          Sign Up with Google
        </button>

        <p className="absolute bottom-6 tracking-tight text-[14px] text-[#212121] font-medium opacity-50">
          By signing up, you agree to the 
          <span className="underline">Terms of Use,</span> {" "}
          <span className="underline">Privacy Notice</span>
        </p>
      </div>
    </>
  );
};

export default AuthPage;
