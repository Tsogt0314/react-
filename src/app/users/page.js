"use client";

import { useEffect, useState } from "react";
import { UserCard } from "./_components/UserCard";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const newUsers = data.map((user) => ({
          ...user,
          isSave: false,
        }));
        setUsers(newUsers);
      });
  }, []);

  function handleOpenModal() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="grid grid-cols-4 gap-10 w-max m-5">
      {users.map((user) => {
        return (
          <UserCard
            key={user.id}
            user={user}
            users={users}
            setUsers={setUsers}
          />
        );
      })}
    </div>
  );
}
