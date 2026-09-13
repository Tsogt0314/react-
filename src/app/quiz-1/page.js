"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase/client.js";
import { useRouter } from "next/navigation";

export default function Home() {
  const [title, setTitle] = useState("");
  const [datas, setDatas] = useState([]);
  const router = useRouter();

  async function handleCreate() {
    if (title.trim() === "") {
      alert("input hoosn bn");
      return;
    }
    const { data, error } = await supabase
      .from("quiz-1")
      .insert({ title: title.trim() });

    if (error) {
      console.log("database error");
    }
    getDatas();
  }

  async function getDatas() {
    const { data, error } = await supabase.from("quiz-1").select("*");
    setDatas(data);
  }

  function handleOpen(id) {
    router.push(`/quiz-1/${id}`);
  }

  function handlePlay(id) {
    router.push(`/quiz-1/${id}/play`);
  }

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div className="h-200 w-420 overflow-hidden bg-slate-100 rounded-xl text-black p-4 space-y-3 m-auto">
      <input
        onChange={(event) => setTitle(event.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
      <button
        onClick={handleCreate}
        className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        CREATE
      </button>
      <div>
        {datas.map((data) => {
          return (
            <div key={data.id} className="mt-3 flex items-center gap-3">
              <p>{data.title}</p>
              <button
                onClick={() => handleOpen(data.id)}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                OPEN
              </button>
              <button
                onClick={() => handlePlay(data.id)}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                START
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
