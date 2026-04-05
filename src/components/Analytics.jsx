import React, { useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, AreaChart, Area } from 'recharts';
import { Plane, Home, Car, AlertCircle } from 'lucide-react';

const COLORS = ['#9da2fa', '#f3d274', '#b2d7b6', '#e0b0ff', '#ffb3ba', '#ffa45c'];

export default function Analytics() {
  const { transactions } = useStore();

  const validTransactions = Array.isArray(transactions) ? transactions : [];
  
  
  const dateMap = {};
  validTransactions.forEach(t => {
    if (!dateMap[t.date]) dateMap[t.date] = { date: t.date, Income: 0, Expense: 0 };
    if (t.type === 'Income') dateMap[t.date].Income += Number(t.amount);
    if (t.type === 'Expense') dateMap[t.date].Expense += Number(t.amount);
  });
  
  const flowData = Object.values(dateMap)
    .sort((a,b) => new Date(a.date) - new Date(b.date));

  const expenses = validTransactions.filter(t => t.type === 'Expense');
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount || 0);
    return acc;
  }, {});

  const budgetVsActual = Object.entries(categoryTotals).map(([name, actual], idx) => {
    let budget = 0;
    if (name === 'Food & Drink') budget = 1200;
    else if (name === 'Shopping') budget = 800;
    else if (name === 'Transit') budget = 400;
    else if (name === 'Subscriptions') budget = 1500;
    else budget = actual * 1.5; 
    return { name, Actual: actual, Budget: budget, color: COLORS[idx % COLORS.length] };
  }).sort((a,b) => b.Actual - a.Actual);

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300 pb-10">
      
      {}
      <div className="bg-white dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-start mb-6">
          <div className="w-full">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-xl font-bold dark:text-white mb-2">Cash Flow</h2>
              <select className="bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-gray-700 text-sm font-medium rounded-xl px-4 py-2 outline-none text-gray-700 dark:text-gray-300 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Yearly</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={flowData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b3a72" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#3b3a72" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c780e8" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#c780e8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.1} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#4b5563' }} dy={10} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}`} tick={{ fontSize: 12, fill: '#4b5563' }} />
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '14px', fontWeight: '500', paddingBottom: '20px' }} verticalAlign="top" align="left" height={40}/>
              <Area type="monotone" dataKey="Income" stroke="#3b3a72" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
              <Area type="monotone" dataKey="Expense" stroke="#c780e8" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {}
        <div className="bg-white dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col">
          <h2 className="text-xl font-bold dark:text-white mb-1">Budget VS Actual</h2>
          <p className="text-gray-600 text-[13px] mb-6">Evaluating your real spending limits against your custom budgets.</p>
          <div className="w-full h-[280px] flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetVsActual} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.1} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#4b5563' }} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}`} tick={{ fontSize: 12, fill: '#4b5563' }} />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
                <Bar dataKey="Budget" fill="#576A8F" radius={[4, 4, 0, 0]} className="dark:fill-gray-700" maxBarSize={40} />
                <Bar dataKey="Actual" fill="#9da2fa" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {}
        <div className="bg-white dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-center gap-8">
          
          <div>
             <h2 className="text-lg font-bold dark:text-white mb-4 flex items-center gap-2"><Plane size={18} className="text-[#f3d274]"/> Goal Allocations (Trips & Leisure)</h2>
             <div className="bg-gray-50 dark:bg-[#1a1a1c] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-inner">
               <div className="flex justify-between items-end mb-2">
                 <span className="font-bold text-sm dark:text-white">Summer Vacation Fund</span>
                 <span className="text-xs text-gray-600 font-bold">₹12,000 / ₹50,000 Limit</span>
               </div>
               <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-[#f3d274] to-[#f7b731] rounded-full w-[24%] shadow-sm"></div>
               </div>
             </div>
          </div>

          <div>
             <h2 className="text-lg font-bold dark:text-white mb-4 flex items-center gap-2"><Home size={18} className="text-[#ffb3ba]"/> Fixed Liabilities (EMIs)</h2>
             
             <div className="space-y-3">
               <div className="flex items-center justify-between bg-card-green/10 dark:bg-card-green/5 border border-card-green/30 p-3.5 rounded-2xl">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1a1a1c] shadow-sm flex items-center justify-center text-[#3a5a41] dark:text-[#b2d7b6]">
                     <Home size={18} />
                   </div>
                   <div>
                     <h4 className="font-bold text-[13px] dark:text-white">Home Loan EMI</h4>
                     <p className="text-[11px] text-gray-600 mt-0.5">Auto-debited on 5th</p>
                   </div>
                 </div>
                 <span className="font-bold text-gray-800 dark:text-gray-200">₹25,000</span>
               </div>

               <div className="flex items-center justify-between bg-white dark:bg-[#1a1a1c] border border-gray-100 dark:border-gray-800 p-3.5 rounded-2xl shadow-sm">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-card-darker flex items-center justify-center text-gray-600">
                     <Car size={18} />
                   </div>
                   <div>
                     <h4 className="font-bold text-[13px] dark:text-white">Car Loan EMI</h4>
                     <p className="text-[11px] text-gray-600 flex items-center gap-1 mt-0.5"><AlertCircle size={10} className="text-orange-400" /> Pending (Due 15th)</p>
                   </div>
                 </div>
                 <span className="font-bold text-gray-800 dark:text-gray-200">₹8,500</span>
               </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
