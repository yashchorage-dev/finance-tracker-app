import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import "./Transactions.css"; 

function Transactions() {
  const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);

  //  Real-time listener
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "transactions"),
      orderBy("createdAt", "desc")
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

  // Add Transaction
  async function handleAddTransaction(e) {
    e.preventDefault();
    const title = e.target.title.value.trim();
    const amount = Number(e.target.amount.value.toLocaleString("en-IN"));
    const type = e.target.type.value;

    if (!title || !amount) {
      toast.warning("Please fill all fields!");
      return;
    }

    try {
      await addDoc(collection(db, "users", user.uid, "transactions"), {
        title,
        amount,
        type,
        createdAt: serverTimestamp(),
      });
      toast.success("Transaction added ✅");
      e.target.reset();
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("Failed to add transaction!");
    }
  }

  //  Delete Transaction
  async function handleDelete(id) {
    try {
      await deleteDoc(doc(db, "users", user.uid, "transactions", id));
      toast.info("Transaction deleted 🗑️");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete transaction!");
    }
  }

  //  Summary
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="transactions-container">
      <h1>💸 Add & Manage Transactions</h1>
      <p>Record your incomes and expenses below.</p>

      {/*  Form */}
      <form onSubmit={handleAddTransaction} className="transaction-form">
        <input type="text" name="title" placeholder="Transaction title" />
        <input type="number" name="amount" placeholder="Amount" />
        <select name="type">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit">➕ Add Transaction</button>
      </form>

      {/*  Summary Cards */}
      <div className="summary-section">
        <div className="summary-card">
          <h3>Total Income</h3>
          <h2 style={{ color: "green" }}>
            ₹{totalIncome.toLocaleString("en-IN")}
          </h2>
        </div>
        <div className="summary-card">
          <h3>Total Expenses</h3>
          <h2 style={{ color: "red" }}>
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

      {/* Table */}
      <div className="transactions-table-container">
        <h2 style={{ marginTop: "35px" }}>📋 All Transactions</h2>
        {transactions.length === 0 ? (
          <p>No transactions added yet.</p>
        ) : (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td>{t.title}</td>
                  <td>₹{t.amount.toLocaleString("en-IN")}</td>
                  <td>{t.type}</td>
                  <td>
                    {t.createdAt?.seconds
                      ? new Date(t.createdAt.seconds * 1000).toLocaleString()
                      : "—"}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(t.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Transactions;
