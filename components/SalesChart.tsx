'use client'

import {
  BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

interface SalesChartProps {
  data: { month: string; revenue: number; calls: number }[]
}

export function SalesChart({ data }: SalesChartProps) {
  return (
    <div className="w-full h-96 bg-white dark:bg-gray-800 p-4 rounded-lg shadow transition-colors duration-300">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Monthly Sales Overview
      </h2>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#8884d8" />
          <Line type="monotone" dataKey="calls" stroke="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}