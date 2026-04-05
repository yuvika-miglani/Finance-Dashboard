import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';

const DEFAULT_BUDGETS = {
  'Food & Drink': 1000,
  'Groceries': 2000,
  'Transit': 500,
  'Shopping': 1000,
  'Subscriptions': 500,
  'Transfer': 1000
};

export default function Budgets() {
  const { transactions } = useStore();
  
  const [budgetLimits, setBudgetLimits] = useState(() => {
    const saved = localStorage.getItem('zorvyn_budgets_v3');
    if (saved) return JSON.parse(saved);
    return DEFAULT_BUDGETS;
  });

  useEffect(() => {
    localStorage.setItem('zorvyn_budgets_v3', JSON.stringify(budgetLimits));
  }, [budgetLimits]);

  const validTransactions = Array.isArray(transactions) ? transactions : [];

  const spentByCategory = validTransactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount || 0);
      return acc;
    }, {});

  const budgets = Object.entries(budgetLimits).map(([category, limit]) => {
    const spent = spentByCategory[category] || 0;
    const isOver = spent > limit;
    const progress = limit > 0 ? Math.min((spent / limit) * 100, 100) : 100;
    const remaining = limit - spent;
    return { category, limit, spent, isOver, progress, remaining };
  });

  const handleBudgetChange = (category, value) => {
    setBudgetLimits(prev => ({
      ...prev,
      [category]: Number(value) || 0
    }));
  };

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-300 space-y-6">
      <div className="bg-white dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-bold dark:text-white mb-2">Monthly Budgets</h2>
        <p className="text-gray-600 mb-8">Maintain control over your limits. You can edit your budget goals below.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map(b => (
            <div key={b.category} className="relative overflow-hidden p-6 rounded-[24px] shadow-lg border border-gray-100 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-card-dark dark:to-card-darker hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
              
              <div className="absolute opacity-10 -top-6 -right-6 group-hover:scale-110 transition-transform duration-500">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#9da2fa] to-[#e0b0ff]"></div>
              </div>

              <div className="flex justify-between items-center mb-6 relative z-10">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-8 rounded-full ${b.isOver ? 'bg-red-500' : 'bg-gradient-to-b from-[#b2d7b6] to-[#6da773]'}`}></div>
                  <span className="text-lg font-bold text-gray-800 dark:text-white drop-shadow-sm">{b.category}</span>
                </div>
                
                <div className="flex flex-col items-end group-focus-within:ring-2 ring-[#9da2fa]/50 rounded-lg p-1 transition-all">
                   <div className="flex items-center space-x-1 border-b dark:border-gray-600 pb-1 w-24">
                     <span className="text-gray-600 font-bold">₹</span>
                     <input 
                       type="number" 
                       value={b.limit}
                       onChange={(e) => handleBudgetChange(b.category, e.target.value)}
                       className="w-full bg-transparent text-right font-bold text-lg dark:text-white outline-none cursor-text"
                     />
                   </div>
                   <span className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider mt-1">Goal Limit</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mb-3 mt-8 relative z-10">
                <span className="text-sm font-semibold text-gray-600">Total Spent</span>
                <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight">₹{b.spent.toLocaleString(undefined, {minimumFractionDigits: 0})}</span>
              </div>
              
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden relative z-10 shadow-inner border border-black/5 dark:border-white/5">
                <div 
                  className={`h-full rounded-full transition-all duration-[800ms] ease-out shadow-sm ${b.isOver ? 'bg-gradient-to-r from-red-500 to-rose-400' : 'bg-gradient-to-r from-[#6da773] to-[#b2d7b6]'}`}
                  style={{ width: `${b.progress}%` }}
                ></div>
              </div>
              
              <div className="mt-5 text-sm font-bold relative z-10 bg-white/50 dark:bg-black/20 p-3 rounded-xl backdrop-blur-sm border border-white/40 dark:border-white/5 shadow-sm">
                {b.isOver ? (
                  <span className="text-red-500 flex items-center justify-between">
                    <span className="flex items-center space-x-1"><span className="text-lg leading-none">⚠️</span> <span>Exceeded</span></span>
                    <span>- ₹{Math.abs(b.remaining).toLocaleString()}</span>
                  </span>
                ) : (
                  <span className="text-[#4e7d56] dark:text-[#b2d7b6] flex items-center justify-between">
                    <span className="flex items-center space-x-1"><span className="text-lg leading-none">🌱</span> <span>Track On Par</span></span>
                    <span>+ ₹{b.remaining.toLocaleString()}</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
