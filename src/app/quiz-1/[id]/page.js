"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../lib/supabase/client.js";
import { useRouter } from "next/navigation";

export default function Home() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState({});
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState("");
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [answerC, setAnswerC] = useState("");
  const [answerD, setAnswerD] = useState("");
  const [correct, setCorrect] = useState("");
  const [show, setShow] = useState(false); //syntax zaaval ene shig
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [datas, setDatas] = useState([]);

  async function getQuizById() {
    try {
      const { data, error } = await supabase
        .from("quiz-1")
        .select("*")
        .eq("id", id)
        .single();

      if (!data) {
        router.push("/quiz-1/errorpage");
      }

      if (error) throw error;
      setQuiz(data);
    } catch (error) {
      console.log("Error loading data", error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleReturn() {
    router.push("/quiz-1/");
  }

  function handleAddQuestion() {
    setShow(true);
  }

  async function handleAddDone() {
    setShow(true);
    if (
      questions.trim() === "" ||
      answerA.trim() === "" ||
      answerB.trim() === "" ||
      answerC.trim() === "" ||
      answerD.trim() === "" ||
      correct === ""
    ) {
      alert("hoosn bj bolkushdeee");
      return;
    }
    supabase.from("quizzes").select("id, ");
    // setIsSubmitted(true);
    setShow(false);

    const { data, error } = await supabase.from("quizzes").insert({
      question: questions,
      answers: [answerA, answerB, answerC, answerD],
      correct_answer: correct,
      quiz_id: id,
    });

    if (error) {
      console.log("database error", error);
    }

    getDatas();
  }

  async function getDatas() {
    const { data, error } = await supabase.from("quizzes").select("*");
    setDatas(data);
  }

  useEffect(() => {
    getQuizById();
    getDatas();
  }, []);

  if (loading) {
    return <p className="m-auto">Loading data from Supabase...</p>;
  }

  console.log(show);

  console.log({ id });

  return (
    <div className="h-200 w-420 overflow-hidden bg-slate-100 rounded-xl text-black p-4 space-y-3 m-auto">
      <button
        onClick={handleReturn}
        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Back
      </button>
      {quiz.title}
      <button
        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={handleAddQuestion}
      >
        Add Question
      </button>
      {show && (
        <input
          onChange={(event) => setQuestions(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="Enter your question..."
        />
      )}
      {show && (
        <input
          onChange={(event) => setAnswerA(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="Enter answerA..."
        />
      )}
      {show && (
        <input
          onChange={(event) => setAnswerB(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="Enter answerB..."
        />
      )}
      {show && (
        <input
          onChange={(event) => setAnswerC(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="Enter answerC..."
        />
      )}
      {show && (
        <input
          onChange={(event) => setAnswerD(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="Enter answerD..."
        />
      )}
      {show && (
        <div className="w-full mt-2">
          <select
            value={correct}
            onChange={(event) => setCorrect(event.target.value)}
            className="mt-1 block w-full rounded-md px-3 py-2 border-2 border-black"
          >
            <option value="">choose correct</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>
      )}
      {show && (
        <button
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={handleAddDone}
        >
          Done
        </button>
      )}
      <div>
        {datas.length > 0 ? (
          <div className="border border-zinc-200/60 rounded-xl p-6 bg-white shadow-sm">
            {datas.map((data) => {
              return (
                <div key={data.id} className="mt-3 flex items-center gap-3">
                  <p>{data.question}</p>
                  <p>{data.answers}</p>
                  <p>{data.correct_answer}</p>
                  <button
                    onClick={() => handle(data.id)}
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Change
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No questions added.</p>
        )}
      </div>
    </div>
  );
}
