import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "./Dashboard.css"; 

function Dashboard() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  //  Firestore Test
  useEffect(() => {
    async function testFirestore() {
      const querySnapshot = await getDocs(collection(db, "test"));
      console.log("Firestore connected ✅");
    }
    testFirestore();
  }, []);

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

  //  Delete Transaction
  async function handleDelete(id) {
    try {
      await deleteDoc(doc(db, "users", user.uid, "transactions", id));
      toast.info("Transaction deleted ");
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
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>📊 Dashboard Overview</h1>
        <p>Get a quick summary of your financial activity.</p>
      </div>

      {/*  Summary Cards */}
      <div className="summary-section">
        <div className="summary-card">
          <h3>💰 Total Income</h3>
          <h2 style={{ color: "green" }}>
            ₹{totalIncome.toLocaleString("en-IN")}
          </h2>
        </div>
        <div className="summary-card">
          <h3>💸 Total Expenses</h3>
          <h2 style={{ color: "red" }}>
            ₹{totalExpense.toLocaleString("en-IN")}
          </h2>
        </div>
        <div className="summary-card">
          <h3>🏦 Balance</h3>
          <h2 style={{ color: balance >= 0 ? "green" : "red" }}>
            ₹{balance.toLocaleString("en-IN")}
          </h2>
        </div>
      </div>

      {/*  Recent Transactions Table */}
      <div className="transactions-section">
        <h2>🧾 Recent Transactions</h2>
        {transactions.length === 0 ? (
          <p>No transactions yet. Go to “Add Transaction” to record one!</p>
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
              {transactions.slice(0, 5).map((t) => (
                <tr key={t.id}>
                  <td>{t.title}</td>
                  <td>₹{t.amount.toLocaleString("en-In")}</td>
                  <td>{t.type}</td>
                  <td>
                    {t.createdAt?.seconds
                      ? new Date(t.createdAt.seconds * 1000).toLocaleString()
                      : "—"}
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(t.id)}
                    >
                      🗑️
                    </button>
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

export default Dashboard;

