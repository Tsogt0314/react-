"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Home() {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    async function getDatas() {
      const { data, error } = await supabase.from("quizzes").select("*");
    }
    getDatas();
  }, []);

  return (
    <div className="h-200 w-420 overflow-hidden bg-slate-100 rounded-xl text-black p-4 space-y-3 m-auto"></div>
  );
}
