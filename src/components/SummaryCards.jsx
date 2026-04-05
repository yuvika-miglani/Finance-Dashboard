import React, { useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function SummaryCards() {
  const { transactions } = useStore();

  const { income, expenses, balance } = useMemo(() => {
    let inc = 0;
    let exp = 0;
    const validTxs = Array.isArray(transactions) ? transactions : [];
    
    validTxs.forEach(t => {
      if (t.type === 'Income') inc += Number(t.amount);
      if (t.type === 'Expense') exp += Number(t.amount);
    });
    
    return { income: inc, expenses: exp, balance: inc - exp };
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {}
      <div className="bg-card-green p-6 rounded-[24px] relative overflow-hidden shadow-sm flex flex-col justify-between h-[180px] transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer">
        <div className="flex justify-between items-start">
          <span className="text-[#3a5a41] font-medium flex items-center space-x-2">
            <span className="w-6 h-6 rounded-full bg-white/40 flex items-center justify-center text-sm">💰</span>
            <span>Total Balance</span>
          </span>
          <span className="bg-white/40 text-[#2a452f] text-xs font-bold px-2 py-1 rounded-full">+ 4.5%</span>
        </div>
        <div>
          <h2 className="text-[#1a2f1f] text-4xl font-bold mt-2">₹ {balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</h2>
        </div>
      </div>

      {}
      <div className="bg-card-yellow p-6 rounded-[24px] relative overflow-hidden shadow-sm flex flex-col justify-between h-[180px] transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer">
        <div className="flex justify-between items-start">
          <span className="text-[#7c631a] font-medium flex items-center space-x-2">
            <ArrowUpRight size={16} />
            <span>Income</span>
          </span>
          <span className="bg-white/40 text-[#5c4a12] text-xs font-bold px-2 py-1 rounded-full">+ 12%</span>
        </div>
        <div>
          <h2 className="text-[#3c3008] text-4xl font-bold mt-2">₹ {income.toLocaleString(undefined, {minimumFractionDigits: 2})}</h2>
        </div>
      </div>

      {}
      <div className="bg-card-purple p-6 rounded-[24px] relative overflow-hidden shadow-sm flex flex-col justify-between h-[180px] transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer">
         <div className="flex justify-between items-start">
          <span className="text-[#3b3a72] font-medium flex items-center space-x-2">
            <ArrowDownRight size={16} />
            <span>Expenses</span>
          </span>
          <span className="bg-white/40 text-[#2a2a50] text-xs font-bold px-2 py-1 rounded-full">- 2.3%</span>
        </div>
        <div>
          <h2 className="text-[#1a1a3a] text-4xl font-bold mt-2">₹ {expenses.toLocaleString(undefined, {minimumFractionDigits: 2})}</h2>
        </div>
      </div>
    </div>
  );
}
