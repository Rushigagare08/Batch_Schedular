"use client";
import Link from "next/link";
import "./register.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const { data: session, status } = useSession();

  // 🚀 If already logged in, redirect to dashboard
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/user-info");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("All fields are necessary");
      return;
    }

    try {
      // Check if user already exists
      const resUserExits = await fetch("/api/userExists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExits.json();
      if (user) {
        setError("User already exists");
        return;
      }

      // Register new user
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        setSuccess("Registration successful! You can login now.");
        e.target.reset();
        router.push("/login");
      } else {
        const { message } = await res.json();
        setError(message || "User registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  if (status === "loading") {
    return <p>Checking authentication...</p>;
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Register</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="input"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="input"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="input"
          />
          <button className="button">Register</button>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
          <Link className="link" href="/login">
            Already have an account? <span>Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
