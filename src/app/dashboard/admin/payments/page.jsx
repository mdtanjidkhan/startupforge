"use client";

import { useEffect, useState } from "react";
import { Card, Chip } from "@heroui/react";
import toast from "react-hot-toast";
import { 
  HiOutlineCreditCard, 
  HiOutlineMagnifyingGlass,
  HiOutlineArrowPath
} from "react-icons/hi2";

export default function ManageTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_SITE_URL}/api/admin/transactions`);
      const data = await res.json();
      if (data.success) {
        setTransactions(data.transactions);
      } else {
        toast.error("Failed to load transactions");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  
  const filteredTransactions = transactions.filter(tx =>
    tx.userEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.transactionId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    if (status?.toLowerCase() === "completed" || status?.toLowerCase() === "succeeded") return "success";
    if (status?.toLowerCase() === "failed") return "danger";
    return "warning"; 
  };

  return (
    <div className="w-full px-2 sm:px-4 md:p-8 space-y-6 mt-20 md:mt-0 max-w-full">
      

      <div className="w-full flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 dark:border-slate-800 pb-5 px-1">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <HiOutlineCreditCard className="size-8 text-indigo-600 dark:text-indigo-400" />
            Transactions
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            Monitor incoming platform revenue, user subscriptions, and payment logs.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64 md:w-80">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
            <input
              type="text"
              placeholder="Search email or TxID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 font-medium"
            />
          </div>
          <button
            onClick={fetchTransactions}
            disabled={loading}
            className="p-3 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-gray-200 dark:border-slate-700 rounded-xl transition-all shadow-sm active:scale-95 text-gray-700 dark:text-slate-200 shrink-0"
          >
            <HiOutlineArrowPath className={`size-5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden w-full">
        {loading ? (
          <p className="text-center text-sm text-gray-400 py-6 col-span-full">Loading ledger...</p>
        ) : filteredTransactions.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-6 col-span-full">No records found.</p>
        ) : (
          filteredTransactions.map((tx) => (
            <Card key={tx.id} className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800 rounded-2xl p-4 space-y-3 shadow-sm w-full">
              <div className="flex justify-between items-start gap-2">
                <div className="truncate min-w-0">
                  <p className="text-xs text-gray-400 font-medium">User Account</p>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{tx.userEmail}</h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base font-black text-indigo-600 dark:text-indigo-400">${tx.amount}</span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-slate-900/40 p-2.5 rounded-xl space-y-1 text-xs font-medium text-gray-500 dark:text-slate-400">
                <p className="truncate"><strong className="text-gray-400">TxID:</strong> <span className="font-mono">{tx.transactionId}</span></p>
                <p><strong className="text-gray-400">Date:</strong> {tx.paidAt}</p>
              </div>

              <div className="flex justify-end pt-1">
                <Chip size="sm" variant="flat" color={getStatusColor(tx.status)} className="font-black capitalize">
                  {tx.status}
                </Chip>
              </div>
            </Card>
          ))
        )}
      </div>
      <div className="hidden lg:block w-full overflow-hidden bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/40 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">User Email</th>
              <th className="py-4 px-6">Transaction ID</th>
              <th className="py-4 px-6">Amount</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60 text-sm font-medium text-gray-700 dark:text-slate-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">Loading payment ledger...</td>
              </tr>
            ) : filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">No transactions available.</td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/40 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="py-4 px-6 font-bold text-gray-900 dark:text-white">{tx.userEmail}</td>
                  <td className="py-4 px-6 text-xs text-gray-400 font-mono select-all">{tx.transactionId}</td>
                  <td className="py-4 px-6 text-base font-black text-indigo-600 dark:text-indigo-400">${tx.amount}</td>
                  <td className="py-4 px-6 text-xs text-gray-500 dark:text-slate-400 font-medium">{tx.paidAt}</td>
                  <td className="py-4 px-6 text-right">
                    <Chip 
                      size="sm" 
                      variant="flat" 
                      color={getStatusColor(tx.status)}
                      className="font-black px-3 capitalize"
                    >
                      {tx.status}
                    </Chip>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}