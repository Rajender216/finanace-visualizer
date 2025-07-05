import { connectDB } from "@/lib/db";
import { Transaction } from "@/models/transaction";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    // Correct way to access params in API routes
    const id = params.id;
    await Transaction.findByIdAndDelete(id);

    return NextResponse.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json(
      { message: "Failed to delete transaction" },
      { status: 500 }
    );
  }
}
