"use client";

import { useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyBarChart from "@/components/MonthlyBarChart";
export default function Home() {
  const [refresh, setRefresh] = useState(0);

  const reload = () => setRefresh((prev) => prev + 1);
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Personal Finance Visualizer</h1>
      <TransactionForm onAdd={reload} />
      <MonthlyBarChart refresh={refresh} />
      <TransactionList refresh={refresh} />
    </div>
  );
}
