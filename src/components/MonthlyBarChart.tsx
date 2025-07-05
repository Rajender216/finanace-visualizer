"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Transaction = {
  amount: number;
  date: string;
};

export default function MonthlyBarChart({ refresh }: { refresh: number }) {
  const [data, setData] = useState<{ month: string; total: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/transactions");
      const transactions: Transaction[] = await res.json();

      // Group by month
      const grouped: { [key: string]: number } = {};
      for (let txn of transactions) {
        const month = new Date(txn.date).toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        grouped[month] = (grouped[month] || 0) + txn.amount;
      }

      const chartData = Object.entries(grouped).map(([month, total]) => ({
        month,
        total,
      }));
      
      setData(chartData);
    };
    fetchData();
  }, [refresh]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#1959AC" />
      </BarChart>
    </ResponsiveContainer>
  );
}
