import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="h-screen bg-bg-light dark:bg-[#121212] overflow-hidden flex font-sans transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto w-full">
          <div className="p-4 md:p-8 max-w-[1600px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
