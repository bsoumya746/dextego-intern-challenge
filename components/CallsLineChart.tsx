'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

interface CallsLineChartProps {
  data: { day: string; calls: number }[]
}

export function CallsLineChart({ data }: CallsLineChartProps) {
  return (
    <div className="w-full h-96 bg-white dark:bg-gray-800 p-4 rounded-lg shadow transition-colors duration-300">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Calls Over Time
      </h2>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="calls" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}