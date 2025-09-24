"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./schedule.css";

export default function SchedulePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Only fetch if authenticated
  useEffect(() => {
    if (status === "authenticated") {
      const fetchBatches = async () => {
        try {
          const res = await fetch("/api/batches");
          const data = await res.json();
          if (data.success) {
            setBatches(data.batches);
          }
        } catch (error) {
          console.error("Error fetching batches:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBatches();
    }
  }, [status]);

  // ✅ Show nothing until NextAuth decides
  if (status === "loading") {
    return <p className="loading-text">Checking authentication...</p>;
  }

  // ✅ Redirect immediately if logged out
  if (status === "unauthenticated") {
    router.replace("/login"); 
    return null;
  }

  // ⏰ Format "09:00" → "9:00 AM"
  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":");
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="schedule-container">
      <h1 className="schedule-title">📅 Lecture Schedule</h1>

      {loading ? (
        <p className="loading-text">Loading batches...</p>
      ) : batches.length === 0 ? (
        <p className="no-batches">No batches scheduled yet.</p>
      ) : (
        <div className="schedule-grid">
          {batches.map((batch) => (
            <div key={batch._id} className="schedule-card">
              <div className="card-header">
                <h2>{batch.batchName}</h2>
              </div>
              <div className="card-body">
                <p><strong>Topic:</strong> {batch.topic}</p>
                <p><strong>Location:</strong> {batch.location}</p>
                <p>
                  <strong>Time:</strong>{" "}
                  {formatTime(batch.startTime)} → {formatTime(batch.endTime)}
                </p>
                <p><strong>Lecturer:</strong> {batch.lecturer}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
