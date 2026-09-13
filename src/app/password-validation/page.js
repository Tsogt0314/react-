"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { supabase } from "./supabaseClient";

export default function Home() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, SetComfirmPassword] = useState("");

  const isUsernameLengthValid = username.length >= 8;
  console.log("isUsernameLengthValid:", isUsernameLengthValid);
  const isPassLengthValid = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isEmailValid = /[@ && a-z]/.test(email);

  // const [isDisabled, setIsDisabled] = useState(true);

  const passwordMatch = () => {
    if (password == comfirmPassword && password !== "") {
      return true;
    } else {
      return false;
    }
  };
  const isFormValid =
    isUsernameLengthValid &&
    isPassLengthValid &&
    hasUpper &&
    hasNumber &&
    hasSpecialChar &&
    isEmailValid &&
    passwordMatch();

  const handleClick = () => {
    // if (!disabled) {
    //   alert("Signed up successfully!");
    // } else {
    //   alert("error");
    // }

    router.push("/user-page");
  };

  return (
    <div className="m-auto p-5 bg-gray-800 shadow flex-col gap-y-5">
      <p className="text-gray-400 opacity-70">Username: </p>
      <input
        className="border w-full max-w-sm px-2 py-1"
        placeholder="Enter Username"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <p className={isUsernameLengthValid ? "text-green-500" : "text-red-500"}>
        Must be atleast 8 characters
      </p>
      <p className="text-gray-400 opacity-70">Email: </p>
      <input
        className="border w-full max-w-sm px-2 py-1"
        placeholder="Email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <p className={isEmailValid ? "text-green-500" : "text-red-500"}>
        Must be valid email
      </p>
      <p className="text-gray-400 opacity-70">Password: </p>
      <input
        type="password"
        className="border w-full max-w-sm px-2 py-1"
        placeholder="Password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <p className={isPassLengthValid ? "text-green-500" : "text-red-500"}>
        Must be atleast 8 characters
      </p>
      <p className={hasUpper ? "text-green-500" : "text-red-500"}>
        Must contain at least one capital letter
      </p>
      <p className={hasLower ? "text-green-500" : "text-red-500"}>
        Must contain at least one lowercase letter
      </p>
      <p className={hasSpecialChar ? "text-green-500" : "text-red-500"}>
        Must contain at least one special character
      </p>
      <p className={hasNumber ? "text-green-500" : "text-red-500"}>
        Must contain atleast one number
      </p>
      <p className="text-gray-400 opacity-70">Comfirm Password: </p>
      <input
        type="password"
        className="border w-full max-w-sm px-2 py-1"
        placeholder="Comfirm Password: "
        value={comfirmPassword}
        onChange={(event) => {
          SetComfirmPassword(event.target.value);
        }}
      />
      <p className={passwordMatch() ? "text-green-500" : "text-red-500"}>
        Password must match
      </p>
      <button
        className="rounded-lg bg-indigo-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-offset-2 transition-colors duration-200"
        onClick={handleClick}
        disabled={!isFormValid}
      >
        Sign Up
      </button>
    </div>
  );
}
