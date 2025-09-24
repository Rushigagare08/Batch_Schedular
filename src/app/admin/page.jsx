"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import "./admin.css";

const Admin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    batchName: "",
    topic: "",
    location: "",
    startTime: "",
    endTime: "",
    lecturer: "",
  });

  // Redirect if not logged in or not admin
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session.user.role !== "admin") {
      // Not admin, redirect to login or another page
      alert("Access denied! Only admin can access this page.");
      signOut({ callbackUrl: "/login" });
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.startTime >= formData.endTime) {
      alert("End time must be later than start time ❌");
      return;
    }

    try {
      const res = await fetch("/api/batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setFormData({
          batchName: "",
          topic: "",
          location: "",
          startTime: "",
          endTime: "",
          lecturer: "",
        });
        router.push("/schedule");
      } else {
        alert(data.error || "Failed to add batch ❌");
      }
    } catch (error) {
      console.error("Error adding batch:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      <form className="batch-form" onSubmit={handleSubmit}>
        {/* Form fields remain the same */}
        <label>
          Batch Name:
          <input
            type="text"
            name="batchName"
            placeholder="Enter batch name"
            value={formData.batchName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Topic:
          <input
            type="text"
            name="topic"
            placeholder="Enter topic"
            value={formData.topic}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Start Time:
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          End Time:
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Lecturer Name:
          <input
            type="text"
            name="lecturer"
            placeholder="Enter lecturer name"
            value={formData.lecturer}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="submit-btn">
          Add Batch
        </button>
      </form>
    </div>
  );
};

export default Admin;
