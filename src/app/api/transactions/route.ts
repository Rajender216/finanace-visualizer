import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Transaction } from "@/models/transaction";

export async function GET() {
  await connectDB();
  const data = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { amount, date, description } = body;
    if (!amount || !date || !description) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }
    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { message: "Amount must be a positive number" },
        { status: 400 }
      );
    }
    const newTransaction = await Transaction.create(body);
    return NextResponse.json(newTransaction);
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
