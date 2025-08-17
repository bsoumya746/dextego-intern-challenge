'use client'

import { useState, useEffect } from 'react'
import { Call, ApiResponse } from '../lib/types'
import { CallCard } from '../components/CallCard'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import { SalesChart } from "../components/SalesChart"
import { RevenuePieChart } from "../components/RevenuePieChart"
import { CallsLineChart } from "../components/CallsLineChart"
import { LoaderWrapper } from '../components/LoaderWrapper'
import { BarChart3, TrendingUp, Users, Phone } from 'lucide-react'
import { NewCallForm } from '../components/NewCallForm'

export default function Dashboard() {
  const [calls, setCalls] = useState<Call[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCalls()
  }, [])

  const fetchCalls = async () => {
    try {
      const response = await fetch('/api/calls')
      const data: ApiResponse<Call[]> = await response.json()
      
      if (data.success) {
        setCalls(data.data)
      } else {
        setError(data.error || 'Failed to fetch calls')
      }
    } catch {
      setError('Failed to fetch calls')
    } finally {
      setLoading(false)
    }
  }

  // Show full-page loader initially
  if (loading && calls.length === 0) return <LoadingSpinner />

  // Calculate stats
  const stats = {
    totalCalls: calls.length,
    avgDuration:
      calls.length > 0
        ? calls.reduce((acc, call) => acc + call.duration, 0) / calls.length / 60
        : 0,
    qualifiedRate:
      calls.length > 0
        ? (calls.filter(call => call.outcome === 'qualified' || call.outcome === 'closed-won').length / calls.length) * 100
        : 0,
    avgSentiment:
      calls.length > 0
        ? calls.reduce((acc, call) => acc + call.sentimentScore, 0) / calls.length
        : 0,
  }

  // Chart data
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const monthlyData = months.map((month, i) => {
    const monthCalls = calls.filter(call => new Date(call.date).getMonth() === i)
    return { month, revenue: monthCalls.length, calls: monthCalls.length }
  })

  const products = Array.from(new Set(calls.map(call => call.product)))
  const revenueData = products.map(product => {
    const productCalls = calls.filter(call => call.product === product)
    return { name: product, value: productCalls.length }
  })

  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
  const callsOverTime = days.map(day => {
    const dayCalls = calls.filter(call => days[new Date(call.date).getDay()] === day)
    return { day, calls: dayCalls.length }
  })

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Sales Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Overview of your sales call performance
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <LoaderWrapper loading={loading}>
          <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6 shadow transition-colors duration-300">
            <div className="flex items-center">
              <Phone className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Calls</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalCalls}</p>
              </div>
            </div>
          </div>
        </LoaderWrapper>

        <LoaderWrapper loading={loading}>
          <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6 shadow transition-colors duration-300">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg Duration</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(stats.avgDuration)}m</p>
              </div>
            </div>
          </div>
        </LoaderWrapper>

        <LoaderWrapper loading={loading}>
          <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6 shadow transition-colors duration-300">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Qualified Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(stats.qualifiedRate)}%</p>
              </div>
            </div>
          </div>
        </LoaderWrapper>

        <LoaderWrapper loading={loading}>
          <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6 shadow transition-colors duration-300">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg Sentiment</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{(stats.avgSentiment).toFixed(0)}%</p>
              </div>
            </div>
          </div>
        </LoaderWrapper>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LoaderWrapper loading={loading}>
          <SalesChart data={monthlyData} />
        </LoaderWrapper>
        <LoaderWrapper loading={loading}>
          <RevenuePieChart data={revenueData} />
        </LoaderWrapper>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <LoaderWrapper loading={loading}>
          <CallsLineChart data={callsOverTime} />
        </LoaderWrapper>
      </div>

      {/* Recent Calls Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Calls</h2>
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          <LoaderWrapper loading={loading}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calls.slice(0,6).map(call => (
                <CallCard key={call.id} call={call} />
              ))}
            </div>
          </LoaderWrapper>
        )}
      </div>

      {/* Add New Call Form at the bottom */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Add New Call</h2>
        <NewCallForm
          onCallCreated={(newCall) => setCalls(prev => [newCall, ...prev])}
        />
      </div>
    </div>
  )
}