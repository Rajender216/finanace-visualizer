"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

type Transaction = {
  _id: string;
  amount: number;
  date: string;
  description: string;
};

export default function TransactionList({ refresh }: { refresh: number }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    };
    fetchData();
  }, [refresh]);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (!confirmDelete) return;

    const res = await fetch(`/api/transactions/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);
      setTransactions((prev) => prev.filter((txn) => txn._id !== id));
    } else {
      toast.error(data.message || "Failed to delete transaction");
    }
  };

  return (
    <div className="space-y-2">
      {transactions.map((txn) => (
        <div
          key={txn._id}
          className="flex justify-between items-center p-2 border rounded shadow-sm"
        >
          <div>
            <p className="font-semibold">₹{txn.amount}</p>
            <p className="text-sm text-muted-foreground">{txn.description}</p>
          </div>
          <div className="flex gap-3 items-center">
            <p className="text-sm">{new Date(txn.date).toLocaleDateString()}</p>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(txn._id)}
            >
              🗑️
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
