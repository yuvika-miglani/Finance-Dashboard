import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import SummaryCards from './SummaryCards';
import MainChart from './MainChart';
import Tranlist from './tranlist';
import RightPanel from './RightPanel';

export default function Dashboard() {
  const { isLoading } = useStore();

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-gray-600 mb-4" size={40} />
        <p className="text-gray-600 font-medium animate-pulse">Fetching latest data...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col xl:flex-row gap-8 w-full h-full pb-10"
    >
      {}
      <div className="flex-1 min-w-0">
        <SummaryCards />
        <MainChart />
        <Tranlist />
      </div>

      {}
      <div className="w-full xl:w-[320px] pb-10 flex-shrink-0">
        <RightPanel />
      </div>
    </motion.div>
  );
}
