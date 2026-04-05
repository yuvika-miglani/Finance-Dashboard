import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, Plus, Download, FileJson, Coffee, ShoppingCart, Train, MonitorPlay, ArrowRightLeft, CreditCard } from 'lucide-react';
import clsx from 'clsx';
import { format } from 'date-fns';

const getCategoryIcon = (category) => {
  switch(category) {
    case 'Food & Drink': return <Coffee size={18} className="text-orange-500" />;
    case 'Shopping': return <ShoppingCart size={18} className="text-blue-500" />;
    case 'Transit': return <Train size={18} className="text-green-500" />;
    case 'Subscriptions': return <MonitorPlay size={18} className="text-purple-500" />;
    case 'Transfer': return <ArrowRightLeft size={18} className="text-gray-600" />;
    default: return <CreditCard size={18} className="text-[#9da2fa]" />;
  }
};

export default function Tranlist() {
  const { transactions, role, addTransaction, isLoading } = useStore();
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ description: '', amount: '', type: 'Expense', category: 'Food & Drink' });

  
  const filteredData = (Array.isArray(transactions) ? transactions : []).filter(t => {
    const sMatch = filterStatus === 'All' ? true : t.type === filterStatus;
    const cMatch = filterCategory === 'All' ? true : t.category === filterCategory;
    
    const q = searchQuery.trim().toLowerCase();
    let qMatch = true;
    if (q !== '') {
      const descMatch = (t.description || '').toLowerCase().includes(q);
      const catMatch = (t.category || '').toLowerCase().includes(q);
      const typeMatch = (t.type || '').toLowerCase().includes(q);
      const amtMatch = String(t.amount || '').includes(q);
      qMatch = descMatch || catMatch || typeMatch || amtMatch;
    }
    
    return sMatch && cMatch && qMatch;
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (role !== 'Admin') return;
    
    addTransaction({
      id: Math.random().toString(36).substr(2, 9),
      description: formData.description,
      description: formData.description,
      amount: Number(formData.amount),
      type: formData.type,
      date: format(new Date(), 'yyyy-MM-dd'),
      category: formData.category
    });
    setIsAdding(false);
    setFormData({ description: '', amount: '', type: 'Expense', category: 'Food & Drink' });
  };

  const handleExportCSV = () => {
    const csvData = [
      ['Date', 'Description', 'Amount', 'Type', 'Category'],
      ...filteredData.map(t => [t.date, t.description, t.amount, t.type, t.category])
    ].map(e => e.join(",")).join("\n");
    
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions.csv';
    link.click();
  };



  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold dark:text-white">Recent Transactions</h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-sm bg-white dark:bg-card-dark border dark:border-gray-700 shadow-sm rounded-lg py-2 pl-3 pr-8 text-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-[#9da2fa] transition-all w-[160px]"
            />
            <Search size={14} className="absolute right-3 top-[50%] -translate-y-[50%] text-gray-600" />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-sm bg-white dark:bg-card-dark border-none shadow-sm rounded-lg py-2 px-3 text-gray-700 dark:text-white outline-none cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="text-sm bg-white dark:bg-card-dark border-none shadow-sm rounded-lg py-2 px-3 text-gray-700 dark:text-white outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Food & Drink">Food & Drink</option>
            <option value="Groceries">Groceries</option>
            <option value="Transit">Transit</option>
            <option value="Shopping">Shopping</option>
            <option value="Subscriptions">Subscriptions</option>
            <option value="Transfer">Transfer</option>
          </select>

          <div className="flex space-x-2">
            <button onClick={handleExportCSV} className="text-gray-600 hover:text-gray-800 dark:hover:text-white p-2 bg-white dark:bg-card-dark shadow-sm rounded-lg transition-colors border dark:border-gray-700" title="Export CSV">
              <Download size={18} />
            </button>
          </div>

          {role === 'Admin' && (
            <button 
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center space-x-1 bg-[#1a1a1a] dark:bg-card-darker text-white px-4 py-2 rounded-lg text-sm transition-colors hover:bg-black"
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>

      {isAdding && role === 'Admin' && (
        <form onSubmit={handleAdd} className="bg-white dark:bg-card-dark p-4 rounded-2xl mb-4 shadow-sm border border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-top-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input required type="text" placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="bg-gray-50 dark:bg-card-darker border-none outline-none rounded-lg px-4 py-2 dark:text-white" />
            <input required type="number" placeholder="Amount" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="bg-gray-50 dark:bg-card-darker border-none outline-none rounded-lg px-4 py-2 dark:text-white" />
            
            <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="bg-gray-50 dark:bg-card-darker border-none outline-none rounded-lg px-4 py-2 dark:text-white">
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>

            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="bg-gray-50 dark:bg-card-darker border-none outline-none rounded-lg px-4 py-2 dark:text-white">
              <option value="Food & Drink">Food & Drink</option>
              <option value="Groceries">Groceries</option>
              <option value="Transit">Transit</option>
              <option value="Shopping">Shopping</option>
              <option value="Subscriptions">Subscriptions</option>
              <option value="Transfer">Transfer</option>
            </select>
            <button type="submit" className="bg-[#b2d7b6] text-[#2a452f] font-bold rounded-lg px-4 py-2 hover:opacity-90 flex justify-center items-center">
              {isLoading ? <span className="animate-pulse">Saving...</span> : 'Save'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3 relative min-h-[50px]">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-card-dark/50 backdrop-blur-[1px] z-10 rounded-2xl flex items-center justify-center"></div>
        )}
        {filteredData.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-card-dark rounded-2xl">
            <p className="text-gray-600">No transactions match your filters.</p>
          </div>
        ) : (
          filteredData.map((tx) => (
            <div key={tx.id} className="bg-white dark:bg-card-dark dark:border dark:border-gray-800 p-4 rounded-[20px] shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 w-[25%] min-w-[150px]">
                <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-[#1a1a1c] border border-gray-100 dark:border-[#2a2a2d] flex items-center justify-center shadow-inner">
                  {getCategoryIcon(tx.category)}
                </div>
                <div>
                   <span className="font-semibold dark:text-white block">{tx.description}</span>
                   <span className="text-[10px] text-gray-600 uppercase tracking-widest">{tx.category}</span>
                </div>
              </div>
              <div className={clsx("w-[20%] font-bold", tx.type === 'Income' ? "text-[#3a5a41] dark:text-[#b2d7b6]" : "text-gray-800 dark:text-gray-200")}>
                {tx.type === 'Income' ? '+' : '-'}₹{Number(tx.amount).toLocaleString(undefined, {minimumFractionDigits:2})}
              </div>
              <div className="w-[20%] flex items-center">
                <span className="flex items-center space-x-2">
                  <span className={clsx("w-3 h-3 rounded-sm", tx.type === 'Income' ? "bg-card-green" : "bg-card-purple")}></span>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">{tx.type}</span>
                </span>
              </div>
              <div className="w-[15%] text-right text-gray-600 dark:text-gray-400 font-medium text-sm">
                {tx.date}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
