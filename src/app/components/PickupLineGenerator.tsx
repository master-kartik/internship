'use client'

import { useState } from 'react'
import { generatePickupLine } from '@/actions/generate-pickup-line'

export default function PickupLineGenerator() {
  const [crush, setCrush] = useState('')
  const [style, setStyle] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = await generatePickupLine(crush, style)
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
      setResult('Error generating pickup line. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Pickup Line Generator</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="crush" className="block text-sm font-medium text-gray-700">
                  Tell us about your crush
                </label>
                <input
                  type="text"
                  id="crush"
                  value={crush}
                  onChange={(e) => setCrush(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="style" className="block text-sm font-medium text-gray-700">
                  Style (e.g., funny, witty)
                </label>
                <input
                  type="text"
                  id="style"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Generate Pickup Line'}
              </button>
            </form>
            {result && (
              <>
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Your Pickup Line 1:</h2>
                <p className="mt-2 text-gray-600">{result.output2}</p>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Your Pickup Line 2:</h2>
                <p className="mt-2 text-gray-600">{result.output1}</p>
              </div>
              </>
              
            )}
          </div>
        </div>
      </div>
    </div>
  )
}