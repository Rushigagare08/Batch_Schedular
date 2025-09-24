"use client";
import "./userinfo.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if logged out
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // while checking session
  }

  return (
    <div className="container">
      <div className="card">
        <div className="info">
          Name: {session?.user?.name}
        </div>
        <div className="info">
          Email: {session?.user?.email}
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="button"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
