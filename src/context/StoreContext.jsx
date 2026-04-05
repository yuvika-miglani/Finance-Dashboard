import { createContext, useContext, useState, useEffect } from 'react';
import mockData from '../data/mockData.json';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('zorvyn_theme_v4') || 'dark');
  const [role, setRole] = useState(() => localStorage.getItem('zorvyn_role_v4') || 'Admin');
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('zorvyn_txs_v4');
    if (saved) return JSON.parse(saved);
    return mockData.transactions;
  });
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem('zorvyn_txs_v4');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setTransactions(parsed);
            setIsLoading(false);
            return;
          }
        }
      } catch (e) {
        console.error("Local storage error", e);
      }
      setTransactions(mockData.transactions);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('zorvyn_theme_v2', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('zorvyn_role_v2', role);
  }, [role]);

  useEffect(() => {
    
    if (!isLoading) {
      localStorage.setItem('zorvyn_txs_v4', JSON.stringify(transactions));
    }
  }, [transactions, isLoading]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  
  const addTransaction = (t) => {
    if (role !== 'Admin') return;
    setIsLoading(true);
    
    setTimeout(() => {
      setTransactions(prev => [t, ...prev]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <StoreContext.Provider value={{
      theme, toggleTheme,
      role, setRole,
      transactions, addTransaction, setTransactions,
      isLoading
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
