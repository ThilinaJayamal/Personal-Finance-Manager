import React, { useState, useEffect } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { useAppContext } from '../contexts/AppProvider';
import TransactionCard from '../components/TransactionCard';


function TransactionHistory() {
  const { transactions,search,setSearch } = useAppContext();
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Date');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    let temp = [...transactions];

    // Filter by type
    if (typeFilter !== 'All') {
      temp = temp.filter((t) => t.type.toLowerCase() === typeFilter.toLowerCase());
    }

    // Search by description
    if (search) {
      temp = temp.filter((t) =>
        t.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'Date') {
      temp.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'Amount') {
      temp.sort((a, b) => b.amount - a.amount);
    }

    setFiltered(temp);
  }, [search, typeFilter, sortBy, transactions]);

  return (
    <div className="w-full">

      <div className="rounded-xl bg-white p-6 border border-gray-200 mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <ArrowDownUp className="text-blue-500" size={20} /> Filter Transactions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Types</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Date">Date</option>
            <option value="Amount">Amount</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 border border-gray-200">
        <h3 className="text-2xl font-semibold mb-4">
          Transaction History
        </h3>

        <div className="flex flex-col gap-4">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500">No transactions found.</p>
          ) : (
            filtered.map((item, index) => (
              <TransactionCard item={item} key={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;
