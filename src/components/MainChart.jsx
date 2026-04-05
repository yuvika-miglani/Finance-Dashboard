import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Mon', value: 12000, color: '#1a1a1a', highlight: false },
  { name: 'Tue', value: 32000, color: '#1a1a1a', highlight: false },
  { name: 'Wed', value: 33567, color: '#1a1a1a', highlight: true },
  { name: 'Thu', value: 16000, color: '#1a1a1a', highlight: false },
  { name: 'Fri', value: 11000, color: '#1a1a1a', highlight: false },
  { name: 'Sat', value: 29000, color: '#1a1a1a', highlight: false },
  { name: 'Sun', value: 24000, color: '#1a1a1a', highlight: false },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white text-gray-900 px-3 py-1.5 rounded-lg shadow-lg text-sm font-bold border border-gray-100">
        ₹ {payload[0].value.toLocaleString()}
      </div>
    );
  }
  return null;
};

export default function MainChart() {
  return (
    <div className="mb-10 w-full">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-gray-600 dark:text-gray-400 font-medium text-sm mb-1">User in The Last Week</h3>
          <h2 className="text-3xl font-bold dark:text-white">+ 3,2%</h2>
        </div>
        <button className="text-sm text-gray-600 font-medium hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          See statistics for all time
        </button>
      </div>
      
      <div className="h-[250px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={40} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 13}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 13}} tickFormatter={(value) => `${value / 1000} K`} />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
            <Bar dataKey="value" radius={[8, 8, 8, 8]} background={{ fill: '#f0f0f0', radius: 8 }}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.highlight ? '#1a1a1a' : '#2c2c2f'} 
                  className="dark:fill-gray-600 dark:bg-card-darker transition-all hover:opacity-80 cursor-pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
