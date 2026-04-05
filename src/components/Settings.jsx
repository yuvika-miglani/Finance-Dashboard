import React from 'react';
import { useStore } from '../context/StoreContext';
import { Moon, Sun, ShieldCheck } from 'lucide-react';

export default function Settings() {
  const { theme, toggleTheme, role, setRole } = useStore();

  return (
    <div className="w-full max-w-2xl animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-white dark:bg-card-dark p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-bold dark:text-white mb-6">Settings & Preferences</h2>
        
        <div className="space-y-8">
          
          <div className="flex items-center justify-between border-b dark:border-gray-700 pb-6">
            <div>
              <h3 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                {theme === 'dark' ? <Moon size={20} className="text-[#9da2fa]" /> : <Sun size={20} className="text-[#f3d274]" />}
                Appearance
              </h3>
              <p className="text-sm text-gray-600 mt-1">Switch between Light and Dark mode UI.</p>
            </div>
            <button 
              onClick={toggleTheme}
              className="px-6 py-2 rounded-xl border-2 dark:border-gray-600 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Enable {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>
          </div>

          <div className="flex items-center justify-between pb-6">
            <div>
              <h3 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                <ShieldCheck size={20} className="text-green-500" />
                Access Control
              </h3>
              <p className="text-sm text-gray-600 mt-1">Mock RBAC functionality. Current role: <strong>{role}</strong></p>
            </div>
            <div className="flex gap-2 border p-1 rounded-xl dark:border-gray-700 bg-gray-50 dark:bg-card-darker">
              <button 
                onClick={() => setRole('Viewer')}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${role === 'Viewer' ? 'bg-white text-black shadow-sm dark:bg-gray-700 dark:text-white' : 'text-gray-600 hover:text-black dark:hover:text-white'}`}
              >
                Viewer
              </button>
              <button 
                onClick={() => setRole('Admin')}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${role === 'Admin' ? 'bg-[#2a2a2d] text-white shadow-sm' : 'text-gray-600 hover:text-black dark:hover:text-white'}`}
              >
                Admin
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
