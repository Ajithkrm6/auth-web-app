"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/user/login", user);
      console.log("login sucess", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>Login Page</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-700 text-black"
        type="text"
        value={user.email}
        placeholder="Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-700  text-black"
        type="text"
        value={user.password}
        placeholder="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        onClick={onLogin}
        className=" p-2 border border-cyan-300 border-spacing-1 rounded-lg"
      >
        Login
      </button>
      <p>Not having an Account Yet?</p>
      <Link href="/signup">Signup here</Link>
    </div>
  );
};

export default LoginPage;
