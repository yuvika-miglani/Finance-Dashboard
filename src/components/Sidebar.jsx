import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart2, CreditCard, ArrowLeftRight, ShoppingBag, Users, MessageSquare, Settings, LogOut, UserRound } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: ArrowLeftRight, label: 'Transactions' },
  { icon: BarChart2, label: 'Analytics' },
  { icon: CreditCard, label: 'Budgets' },
  { icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-[280px] h-full flex flex-col bg-[#2A2A2D] text-white p-6 rounded-tr-[40px] rounded-br-[40px] shadow-2xl z-20 flex-shrink-0 transition-all">
      <div className="flex items-center space-x-3 mb-10">
        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-[#2A2A2D]">
          <ShoppingBag size={20} />
        </div>
        <span className="text-2xl font-bold tracking-wide">Zorvyn</span>
      </div>

      <div className="flex flex-col items-center mb-10">
        <div className="w-20 h-20 rounded-full border-4 border-white/10 mb-4 bg-gradient-to-tr from-[#9DA2FA] to-[#c780e8] shadow-lg flex items-center justify-center">
          <UserRound size={36} className="text-white drop-shadow-md" />
        </div>
        <p className="text-sm text-gray-600">Welcome Back,</p>
        <h2 className="text-lg font-semibold mt-1">Yuvika</h2>
      </div>

      <nav className="flex-1 overflow-y-auto w-full -mx-2 px-2 no-scrollbar">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink 
                to={item.label === 'Dashboard' ? '/' : `/${item.label.toLowerCase()}`}
                className={({ isActive }) => clsx(
                  "flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "text-[#F3D274] bg-white/5 relative before:absolute before:left-[-16px] before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-8 before:bg-[#F3D274] before:rounded-r-full" 
                    : "text-gray-600 hover:text-white hover:bg-white/5"
                )}
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={20} className={clsx(isActive ? "text-[#9DA2FA]" : "text-gray-600 group-hover:text-white")} />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-[#9DA2FA] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-6">
        <a href="#" className="flex items-center space-x-4 px-4 py-3 text-gray-600 hover:text-white transition-colors duration-200">
          <LogOut size={20} />
          <span className="font-medium">Log Out</span>
        </a>
      </div>
    </aside>
  );
}
