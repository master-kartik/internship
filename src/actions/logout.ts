"use server";

import { supabaseServerClient } from "@/supabase/supabaseServer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

export default async function logout() {
  const supabase = (await supabaseServerClient()).auth;
  console.log("logut clickes");
  const { error } = await supabase.signOut();

  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect("/");
}
