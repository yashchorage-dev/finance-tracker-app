import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import "./Reports.css"; 

function Reports() {
  const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "transactions"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(data);
    });

    return () => unsubscribe();
  }, [user]);

  // ✅ Summary calculations
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // ✅ Chart data
  const pieData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
  ];

  const COLORS = ["#4CAF50", "#F44336"];

  const lineData = transactions
    .filter((t) => t.createdAt?.seconds)
    .map((t) => ({
      date: new Date(t.createdAt.seconds * 1000).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      income: t.type === "income" ? t.amount : 0,
      expense: t.type === "expense" ? t.amount : 0,
    }));

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>📊 Financial Reports</h1>
        <p>Visual overview of your income, expenses, and trends.</p>
      </div>

      {/* ✅ Summary Cards */}
      <div className="summary-grid">
        <div className="summary-card">
          <h3>Total Income</h3>
          <h2 style={{ color: "#4CAF50" }}>
            ₹{totalIncome.toLocaleString("en-IN")}
          </h2>
        </div>
        <div className="summary-card">
          <h3>Total Expenses</h3>
          <h2 style={{ color: "#F44336" }}>
            ₹{totalExpense.toLocaleString("en-IN")}
          </h2>
        </div>
        <div className="summary-card">
          <h3>Balance</h3>
          <h2 style={{ color: balance >= 0 ? "green" : "red" }}>
            ₹{balance.toLocaleString("en-IN")}
          </h2>
        </div>
      </div>

      {/* ✅ Pie Chart */}
      <div className="chart-section">
        <h2>Income vs Expense</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ₹${value}`}
              outerRadius={120}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/*  Line Chart */}
      <div className="chart-section">
        <h2>Income & Expense Over Time</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#4CAF50"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#F44336"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Reports;
