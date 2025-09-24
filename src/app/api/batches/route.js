import { NextResponse } from "next/server";
import Batch from "@/models/batch";
import { connectMongoDB } from "@/lib/mongodb";

// Utility to check overlap between two time ranges
function isOverlap(start1, end1, start2, end2) {
  return start1 < end2 && start2 < end1;
}

export async function POST(req) {
  try {
    await connectMongoDB();
    const { batchName, topic, location, startTime, endTime, lecturer } = await req.json();

    if (!batchName || !topic || !location || !startTime || !endTime || !lecturer) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    if (startTime >= endTime) {
      return NextResponse.json(
        { success: false, error: "End time must be later than start time" },
        { status: 400 }
      );
    }

    // ✅ Check for conflicts
    const batches = await Batch.find();
    for (const b of batches) {
      if (isOverlap(startTime, endTime, b.startTime, b.endTime)) {
        return NextResponse.json(
          {
            success: false,
            error: `Conflict: Another batch (${b.batchName}) is scheduled from ${b.startTime}–${b.endTime}`,
          },
          { status: 400 }
        );
      }
    }

    // ✅ Create new batch
    const newBatch = await Batch.create({
      batchName,
      topic,
      location,
      startTime,
      endTime,
      lecturer,
    });

    return NextResponse.json({ success: true, batch: newBatch }, { status: 201 });
  } catch (err) {
    console.error("❌ Error creating batch:", err);
    return NextResponse.json(
      { success: false, error: "Failed to add batch" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();

    // ✅ Sorted by startTime (earliest → latest)
    const batches = await Batch.find().sort({ startTime: 1 });
    return NextResponse.json({ success: true, batches });
  } catch (err) {
    console.error("❌ Error fetching batches:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch batches" },
      { status: 500 }
    );
  }
}
