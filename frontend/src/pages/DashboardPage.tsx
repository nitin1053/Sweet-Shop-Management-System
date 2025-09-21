import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import type { Sweet } from '../context/CartContext'
import SweetCard from '../components/SweetCard'

export default function DashboardPage() {
  const { } = useAuth()
  const qc = useQueryClient()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const { data: sweets, isLoading } = useQuery({
    queryKey: ['sweets', { name, category, minPrice, maxPrice }],
    queryFn: async () => {
      const params: Record<string, string> = {}
      if (name) params.name = name
      if (category) params.category = category
      if (minPrice) params.minPrice = minPrice
      if (maxPrice) params.maxPrice = maxPrice
      const { data } = await api.get<Sweet[]>(Object.keys(params).length ? '/sweets/search' : '/sweets', { params })
      return data
    },
  })

  const purchase = useMutation({
    mutationFn: async ({ id, count }: { id: number; count: number }) => {
      const { data } = await api.post<Sweet>(`/sweets/${id}/purchase`, null, { params: { count } })
      return data
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sweets'] }),
  })

  const handlePurchase = (sweet: Sweet) => {
    purchase.mutate({ id: sweet.id, count: 1 })
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2c3e50' }}>
          Welcome to Sweet Shop! 🍭
        </h1>
        
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '12px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Search & Filter</h3>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <input 
              placeholder="Search by name..." 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <input 
              placeholder="Category..." 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <input 
              placeholder="Min Price" 
              type="number"
              value={minPrice} 
              onChange={(e) => setMinPrice(e.target.value)}
              style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <input 
              placeholder="Max Price" 
              type="number"
              value={maxPrice} 
              onChange={(e) => setMaxPrice(e.target.value)}
              style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔄</div>
          <p>Loading sweets...</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {(sweets ?? []).map((sweet) => (
            <SweetCard 
              key={sweet.id} 
              sweet={sweet} 
              onPurchase={handlePurchase}
            />
          ))}
        </div>
      )}

      {sweets && sweets.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍭</div>
          <h3>No sweets found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  )
}
