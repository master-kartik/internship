"use client"
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ['latin'] })
import { supabaseBrowserClient } from "@/supabase/supabaseClient";
import { Provider } from '@supabase/supabase-js';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
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
        return router.push('/');
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
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    setAuthenticating(false);
  }
  if (!isMounted) return null;
  return (
    <>
    <div className={`flex flex-col h-screen items-center justify-center text-center text-black ${inter.className}`}>
      AuthPage
    <button 
    onClick={()=>socialAuth('google')}
    disabled={authenticating} className=' bg-[#FAFAFA] px-4 py-2 w-[20vw] rounded-full font-semibold text-[16px] text-black'>Sign in with google</button>

      </div>
    </>
  )
}

export default AuthPage;