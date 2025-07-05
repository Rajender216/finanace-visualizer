import { connectDB } from "@/lib/db";
import { Transaction } from "@/models/transaction";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const transaction = await Transaction.findById(params.id);
    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(transaction);
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
