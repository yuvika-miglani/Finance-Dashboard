import React, { useMemo } from 'react';
import { MonitorPlay, Music, Wifi, Tv } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useStore } from '../context/StoreContext';

const COLORS = ['#9da2fa', '#f3d274', '#b2d7b6', '#e0b0ff', '#ffb3ba'];

export default function RightPanel() {
  const { transactions } = useStore();

  const validTransactions = Array.isArray(transactions) ? transactions : [];

  
  const expenseData = useMemo(() => {
    const expenses = validTransactions.filter(t => t.type === 'Expense');
    const categoryTotals = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount || 0);
      return acc;
    }, {});
    
    return Object.entries(categoryTotals)
      .map(([name, value], idx) => ({ 
        name, 
        value, 
        color: COLORS[idx % COLORS.length] 
      }))
      .sort((a, b) => b.value - a.value);
  }, [validTransactions]);

  const totalExpense = expenseData.reduce((acc, curr) => acc + curr.value, 0);

  const highestCat = expenseData.length > 0 ? expenseData[0] : null;

  return (
    <div className="w-full flex flex-col gap-8">
      {}
      <div className="bg-white dark:bg-card-dark p-6 rounded-[24px] shadow-sm relative overflow-hidden min-h-[340px]">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold dark:text-white">Spending Breakdown</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Expenses</p>
          </div>
          <button className="w-8 h-8 rounded-full bg-gray-50 dark:bg-card-darker flex items-center justify-center text-gray-600 dark:text-gray-300">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mt-8 relative gap-6 sm:gap-2">
          <div className="w-[140px] h-[140px] flex-shrink-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={expenseData.length > 0 ? expenseData : [{name:'Empty', value:1, color:'#e0e0e0'}]} innerRadius={45} outerRadius={65} paddingAngle={0} dataKey="value" stroke="none">
                  {(expenseData.length > 0 ? expenseData : [{name:'Empty', value:1, color:'#e0e0e0'}]).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-center w-[80px]">
              <span className="block text-[10px] text-gray-600 font-medium">Total</span>
              <span className="block text-sm font-bold dark:text-white">₹{totalExpense.toLocaleString(undefined, {minimumFractionDigits: 0})}</span>
            </div>
          </div>
          
          <div className="flex-1 w-full space-y-4 sm:ml-4">
            {expenseData.slice(0, 4).map(item => {
              const percent = ((item.value / totalExpense) * 100).toFixed(0);
              return (
                <div key={item.name}>
                  <div className="flex justify-between text-xs text-gray-600 font-medium mb-1">
                    <span>{item.name}</span>
                    <span className="text-gray-600 dark:text-gray-300 font-bold">{percent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-card-darker rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: item.color }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {}
      <div className="mt-2 text-[#2d2d2d] dark:text-white">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-bold">Upcoming Bills</h2>
          <button className="text-[12px] text-gray-600 font-semibold hover:text-[#9da2fa]">See All</button>
        </div>
        
        <div className="space-y-3">
          {[
            { icon: <MonitorPlay size={20} className="text-[#e50914]" />, name: "Netflix Subscription", time: "In 2 Days", amount: "- ₹ 199.00" },
            { icon: <Music size={20} className="text-[#1DB954]" />, name: "Spotify Premium", time: "In 5 Days", amount: "- ₹ 119.00" },
            { icon: <Wifi size={20} className="text-[#0052cc]" />, name: "Jio Fiber ISP", time: "In 12 Days", amount: "- ₹ 999.00" },
            { icon: <Tv size={20} className="text-[#f7b731]" />, name: "Hotstar VIP", time: "In 18 Days", amount: "- ₹ 899.00" }
          ].map((sub, i) => (
             <div key={i} className="flex items-center justify-between p-3.5 bg-white dark:bg-card-dark rounded-[20px] shadow-sm border border-gray-50/50 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer">
               <div className="flex items-center space-x-3">
                 <div className="w-[42px] h-[42px] rounded-full border border-gray-100 dark:border-[#2a2a2d] bg-gray-50 dark:bg-[#1a1a1c] shadow-inner flex items-center justify-center">
                   {sub.icon}
                 </div>
                 <div>
                   <h4 className="text-[13px] font-bold dark:text-white leading-tight">{sub.name}</h4>
                   <p className="text-[11px] text-gray-600 font-medium mt-0.5">{sub.time}</p>
                 </div>
               </div>
               <span className="text-[13px] font-bold tracking-tight text-gray-800 dark:text-gray-200">{sub.amount}</span>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
