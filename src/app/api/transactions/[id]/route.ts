import { connectDB } from "@/lib/db";
import { Transaction } from "@/models/transaction";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = await context.params;
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
