import React from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const data = [
    { month: "Jan", orders: 120 },
    { month: "Feb", orders: 145 },
    { month: "Mar", orders: 180 },
    { month: "Apr", orders: 165 },
    { month: "May", orders: 210 },
    { month: "Jun", orders: 250 },
];

export default function OrdersChart() {
    return (
        <div className="w-full h-80 font-sans">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                    data={data} 
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                    {/* Cleaned up grid: Removed vertical lines, lightened stroke */}
                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        vertical={false} 
                        stroke="#f1f5f9" 
                    />
                    
                    {/* Modernized X-Axis: Removed harsh lines, muted text color */}
                    <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                        dy={10}
                    />
                    
                    {/* Modernized Y-Axis: Removed harsh lines, muted text color */}
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                    />
                    
                    {/* Premium floating tooltip matching the pie chart */}
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.98)',
                            borderRadius: '12px',
                            border: '1px solid #f1f5f9',
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                            padding: '10px 16px',
                            fontWeight: '500',
                        }}
                        itemStyle={{ color: '#6366f1', fontWeight: 600 }}
                        labelStyle={{ color: '#64748b', marginBottom: '4px' }}
                        cursor={{ stroke: '#e2e8f0', strokeWidth: 2, strokeDasharray: '4 4' }}
                    />
                    
                    {/* Sleek data line with custom interactive dots */}
                    <Line
                        type="monotone"
                        dataKey="orders"
                        name="Total Orders"
                        stroke="#6366f1"
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#ffffff', stroke: '#6366f1', strokeWidth: 2 }}
                        activeDot={{ r: 7, fill: '#6366f1', stroke: '#ffffff', strokeWidth: 2, shadowColor: '#6366f1', shadowBlur: 10 }}
                        animationDuration={1500}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}