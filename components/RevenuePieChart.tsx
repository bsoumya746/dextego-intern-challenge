'use client'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface RevenuePieChartProps {
  data: { name: string; value: number }[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function RevenuePieChart({ data }: RevenuePieChartProps) {
  return (
    <div className="w-full h-96 bg-white dark:bg-gray-800 p-4 rounded-lg shadow transition-colors duration-300">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Revenue by Product
      </h2>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}