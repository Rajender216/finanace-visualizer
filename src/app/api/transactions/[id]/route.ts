// src/app/api/transactions/[id]/route.ts

import { connectDB } from '@/lib/db'
import { Transaction } from '@/models/transaction'
import { NextResponse } from 'next/server'

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    await Transaction.findByIdAndDelete(params.id)
    return NextResponse.json({ message: 'Transaction deleted successfully' })
  } catch (err) {
    console.error('DELETE error:', err)
    return NextResponse.json({ message: 'Failed to delete transaction' }, { status: 500 })
  }
}
