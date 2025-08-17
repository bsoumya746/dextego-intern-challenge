'use client'

import { useState, FormEvent } from 'react'
import { Call } from '../lib/types'

interface NewCallFormProps {
  onCallCreated: (call: Call) => void
}

export const NewCallForm: React.FC<NewCallFormProps> = ({ onCallCreated }) => {
  const [customer, setCustomer] = useState('')
  const [product, setProduct] = useState('')
  const [duration, setDuration] = useState<number>(0)
  const [outcome, setOutcome] = useState<Call['outcome'] | ''>('')
  const [sentimentScore, setSentimentScore] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Build a complete Call object
      const newCall: Call = {
        id: crypto.randomUUID(),
        customer,
        product,
        prospectName: customer,
        date: new Date().toISOString(),
        duration,
        status: 'completed', // default for new manual calls
        outcome: outcome as Call['outcome'],
        talkTimeRatio: Math.random(), // placeholder logic
        questionsAsked: 0,            // could be extended
        sentimentScore,
        tags: [],
      }

      const res = await fetch('/api/calls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCall),
      })

      const data = await res.json()
      if (data.success) {
        onCallCreated(data.data) // pass new call to parent
        setCustomer('')
        setProduct('')
        setDuration(0)
        setOutcome('')
        setSentimentScore(0)
      } else {
        setError(data.error || 'Failed to create call')
      }
    } catch {
      setError('Failed to create call')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add New Call</h3>

      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-1">Customer</label>
        <input
          type="text"
          value={customer}
          onChange={e => setCustomer(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-1">Product</label>
        <input
          type="text"
          value={product}
          onChange={e => setProduct(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-1">Duration (seconds)</label>
        <input
          type="number"
          value={duration}
          onChange={e => setDuration(Number(e.target.value))}
          required
          className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-1">Outcome</label>
        <select
          value={outcome}
          onChange={e => setOutcome(e.target.value as Call['outcome'])}
          required
          className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="">Select outcome</option>
          <option value="qualified">Qualified</option>
          <option value="not-qualified">Not Qualified</option>
          <option value="follow-up">Follow Up</option>
          <option value="closed-won">Closed Won</option>
          <option value="closed-lost">Closed Lost</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-1">Sentiment Score (0-100)</label>
        <input
          type="number"
          value={sentimentScore}
          onChange={e => setSentimentScore(Number(e.target.value))}
          min={0}
          max={100}
          required
          className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Add Call'}
      </button>
    </form>
  )
}
