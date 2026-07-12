import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Electronics", value: 45 },
  { name: "Furniture", value: 25 },
  { name: "Clothing", value: 20 },
  { name: "Others", value: 10 },
];

// Modern, muted SaaS color palette (Indigo, Violet, Sky, Slate)
const COLORS = ["#6366f1", "#8b5cf6", "#38bdf8", "#94a3b8"];

// Custom Tooltip for a clean, glassmorphic UI
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-800 px-3.5 py-2 rounded-lg shadow-xl">
        <div className="flex items-center gap-2">
          <span 
            className="w-2.5 h-2.5 rounded-full" 
            style={{ backgroundColor: item.payload.fill }} 
          />
          <p className="text-xs font-medium text-slate-300">
            {item.name}
          </p>
        </div>
        <p className="text-sm font-semibold text-white mt-0.5 pl-4">
          {item.value}%
        </p>
      </div>
    );
  }
  return null;
};

export default function ModernPieChart() {
  // Calculate total for center display (optional visual enhancement)
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="w-full max-w-sm bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-800">
          Sales by Category
        </h3>
        <p className="text-xs text-slate-400">
          Distribution of revenue across departments
        </p>
      </div>

      {/* Chart Container */}
      <div className="relative w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={85}
              paddingAngle={4}
              stroke="none"
              cornerRadius={6}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} cursor={false} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label inside Donut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-slate-800">{total}%</span>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Total
          </span>
        </div>
      </div>

      {/* Modern Grid Legend */}
      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-xs font-medium text-slate-600 truncate">
                {item.name}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-800 pl-1">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}