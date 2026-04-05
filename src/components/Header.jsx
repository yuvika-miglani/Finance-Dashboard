import React from 'react';
import { Moon, Sun, Shield } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Header() {
  const { theme, toggleTheme, role, setRole } = useStore();

  return (
    <header className="flex items-center justify-between p-4 md:px-8 md:py-6 h-[100px] flex-shrink-0">
      <div>
        <h1 className="text-2xl font-bold text-text-main dark:text-text-darkMain">Dashboard</h1>
        <p className="text-sm text-text-muted dark:text-text-darkMuted mt-1">Personal Finance Overview</p>
      </div>

      <div className="flex items-center space-x-6">

        <div className="flex items-center space-x-3 bg-white dark:bg-card-dark rounded-full p-1.5 shadow-sm">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-600" />}
          </button>
          <div className="w-[1px] h-6 bg-gray-200 dark:bg-gray-600"></div>
          <div className="relative group px-2">
            <button className="flex items-center space-x-2 p-1.5 rounded-full">
              <Shield size={18} className={role === 'Admin' ? 'text-[#F3D274]' : 'text-gray-600'} />
              <span className="text-sm font-semibold dark:text-white">{role}</span>
            </button>
            {}
            <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-card-dark border dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <button 
                onClick={() => setRole('Admin')}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 rounded-t-lg dark:text-white"
              >
                Admin (Edit)
              </button>
              <button 
                onClick={() => setRole('Viewer')}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 rounded-b-lg dark:text-white"
              >
                Viewer (Read)
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
