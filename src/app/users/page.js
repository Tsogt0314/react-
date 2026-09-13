"use client";

import { useEffect, useState } from "react";
import { UserCard } from "./_components/UserCard";
import { supabase } from "./supabaseClient";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [isShow, setIsShow] = useState(false);

  async function removeSavedUser(userId) {
    const { error } = await supabase
      .from("saved_users")
      .delete()
      .eq("id", userId);

    if (error) {
      console.error("Error removing user from database:", error);
      return;
    }

    const newUsers = users.map((mapUser) => {
      if (mapUser.id === userId) {
        return { ...mapUser, isSave: false };
      }
      return mapUser;
    });

    setUsers(newUsers);
  }

  useEffect(() => {
    const localUsers = window.localStorage.getItem("users");

    if (localUsers) {
      setUsers(JSON.parse(localUsers));
    } else {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
          const newUsers = data.map((user) => ({
            ...user,
            isSave: false,
          }));
          setUsers(newUsers);
          window.localStorage.setItem("users", JSON.stringify(newUsers));
        });
    }
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      window.localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  const filteredUsers = users.filter((user) => user.isSave);

  function handleOpenModal() {
    setIsShow(!isShow);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-slate-100 px-4 py-8 text-stone-900 sm:px-6 lg:px-10">
      <div className="mx-auto mb-8 flex w-full max-w-7xl items-center justify-between rounded-3xl border border-white/70 bg-white/70 p-5 shadow">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-700">
            Users
          </p>
          <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">
            Saved people dashboard
          </h1>
        </div>
        <button
          className="rounded-2xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-stone-900/20 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-stone-800"
          onClick={handleOpenModal}
        >
          saved users
        </button>
      </div>

      <div className="relative mx-auto mb-10 w-full max-w-7xl">
        <button className="hidden" onClick={handleOpenModal}>
          saved users
        </button>
        {isShow && (
          <div
            className={`absolute right-0 top-0 z-20 w-full max-w-sm rounded-3xl border border-white/70 bg-white/95 p-6 text-stone-900 shadow-[0_30px_80px_rgba(15,23,42,0.18)] backdrop-blur transition-all ${isShow ? "opacity-100" : "opacity-0"}`}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Saved users</h2>
              <button
                className="rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-700 transition hover:bg-stone-200"
                onClick={handleOpenModal}
              >
                close
              </button>
            </div>

            {filteredUsers.map((user) => {
              return (
                <div
                  key={user.id}
                  className="mb-3 flex items-center justify-between gap-3 rounded-2xl bg-stone-50 px-4 py-3"
                >
                  <p className="font-medium">{user.name}</p>
                  <button
                    className="rounded-xl bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-200"
                    onClick={() => removeSavedUser(user.id)}
                  >
                    remove
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {users.map((user) => {
          return (
            <UserCard
              key={user.id}
              user={user}
              setUsers={setUsers}
              users={users}
            />
          );
        })}
      </div>
    </div>
  );
}
