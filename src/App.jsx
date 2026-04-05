import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Tranpg from './components/tranpg';
import Analytics from './components/Analytics';
import Budgets from './components/Budgets';
import Settings from './components/Settings';

function PlaceholderPage({ title }) {
  return (
    <div className="p-8 bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 animate-in fade-in zoom-in duration-300">
      <h2 className="text-3xl font-bold dark:text-white">{title}</h2>
      <p className="text-gray-500 mt-4">This layout is currently completely empty for {title}.</p>
    </div>
  );
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Tranpg />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<PlaceholderPage title="404 Not Found" />} />
      </Routes>
    </Layout>
  );
}

export default App;
