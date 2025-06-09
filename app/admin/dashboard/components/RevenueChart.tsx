// app/admin/dashboard/components/RevenueChart.tsx
'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface RevenueChartProps {
  monthlyRevenue: {
    name: string;
    revenue: number;
  }[];
}

// Fungsi untuk format mata uang
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export default function RevenueChart({ monthlyRevenue }: RevenueChartProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-2xl font-semibold mb-4">Grafik Pendapatan</h2>
      
      <div className="w-full h-80">
        {monthlyRevenue && monthlyRevenue.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyRevenue}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                tickFormatter={(value:any) => new Intl.NumberFormat('id-ID', {
                  notation: 'compact',
                  compactDisplay: 'short',
                  maximumFractionDigits: 1
                }).format(value)}
              />
              <Tooltip 
                formatter={(value: any) => [formatCurrency(value), "Pendapatan"]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                name="Pendapatan"
                stroke="#EAB308"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Tidak ada data grafik pendapatan</p>
          </div>
        )}
      </div>
    </div>
  );
}