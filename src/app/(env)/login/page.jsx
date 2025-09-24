"use client";

import Link from "next/link";
import "./login.css"; // Import the CSS file
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const Router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email, password, redirect: false,
      });

      if (res.error) {
        setError("Invalid Credntials");
        return;
      }
      Router.replace("/user-info");


    } catch (error) {
      console.log(error);
      setError("Something went wwrong");

    }
  }
  return (
    <div className="container">
      <div className="card">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <input onChange={e => setEmail(e.target.value)} type="text" placeholder="Email" />
          <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
          <button>Login</button>
          {error && (
            <div className="error-message">{error}</div>

          )}



          <Link className="register-link" href={"/register"}>
            Don't have an account? <span>Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
