import { connectDB } from "@/lib/db";
import { Transaction } from "@/models/transaction";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    // Direct access without destructuring to avoid the await warning
    const { id } = await params;
    const result = await Transaction.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Transaction deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
