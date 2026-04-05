import React, { useMemo } from 'react';
import Tranlist from './tranlist';
import { useStore } from '../context/StoreContext';
import { ArrowDownRight, ArrowUpRight, CheckCircle } from 'lucide-react';

export default function Tranpg() {
  const { transactions } = useStore();

  const { totalIn, totalOut, totalCount } = useMemo(() => {
    let inc = 0;
    let exp = 0;
    const valid = Array.isArray(transactions) ? transactions : [];
    valid.forEach(t => {
      if (t.type === 'Income') inc += Number(t.amount);
      if (t.type === 'Expense') exp += Number(t.amount);
    });
    return { totalIn: inc, totalOut: exp, totalCount: valid.length };
  }, [transactions]);

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-300 space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-card-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
          <div className="flex items-center space-x-2 text-gray-600 mb-2">
            <CheckCircle size={18} className="text-[#9da2fa]" />
            <span className="text-sm font-medium">Processed</span>
          </div>
          <span className="text-3xl font-bold dark:text-white">{totalCount} <span className="text-lg text-gray-600 font-normal">Entries</span></span>
        </div>

        <div className="bg-white dark:bg-card-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
          <div className="flex items-center space-x-2 text-[#3a5a41] dark:text-[#b2d7b6] mb-2">
            <ArrowUpRight size={18} />
            <span className="text-sm font-medium">Total Earned</span>
          </div>
          <span className="text-3xl font-bold dark:text-white">₹{totalIn.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
        </div>

        <div className="bg-white dark:bg-card-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
          <div className="flex items-center space-x-2 text-red-500 mb-2">
            <ArrowDownRight size={18} />
            <span className="text-sm font-medium">Total Spent</span>
          </div>
          <span className="text-3xl font-bold dark:text-white">₹{totalOut.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-card-dark p-6 py-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
        <Tranlist />
      </div>
    </div>
  );
}
