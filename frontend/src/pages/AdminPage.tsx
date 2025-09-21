import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import type { Sweet } from '../context/CartContext'

export default function AdminPage() {
  const { isAdmin } = useAuth()
  const qc = useQueryClient()
  const [form, setForm] = useState<Partial<Sweet>>({ name: '', category: '', price: 0, quantity: 0 })

  const { data: sweets } = useQuery({
    queryKey: ['sweets'],
    queryFn: async () => (await api.get<Sweet[]>('/sweets')).data,
  })

  const create = useMutation({
    mutationFn: async (sweet: Partial<Sweet>) => (await api.post<Sweet>('/sweets', sweet)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sweets'] }),
  })

  const update = useMutation({
    mutationFn: async (sweet: Sweet) => (await api.put<Sweet>(`/sweets/${sweet.id}`, sweet)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sweets'] }),
  })

  const del = useMutation({
    mutationFn: async (id: number) => (await api.delete(`/sweets/${id}`)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sweets'] }),
  })

  const restock = useMutation({
    mutationFn: async ({ id, count }: { id: number; count: number }) => (await api.post<Sweet>(`/sweets/${id}/restock`, null, { params: { count } })).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sweets'] }),
  })

  if (!isAdmin) return <Navigate to="/" replace />

  return (
    <div className="container">
      <h1>Admin</h1>

      <section style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 12 }}>
        <input placeholder="Name" value={form.name ?? ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Category" value={form.category ?? ''} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input placeholder="Price" type="number" value={form.price ?? 0} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
        <input placeholder="Quantity" type="number" value={form.quantity ?? 0} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} />
        <button onClick={() => create.mutate(form)}>Add Sweet</button>
      </section>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(sweets ?? []).map((s) => (
            <tr key={s.id}>
              <td><input value={s.name} onChange={(e) => update.mutate({ ...s, name: e.target.value })} /></td>
              <td><input value={s.category ?? ''} onChange={(e) => update.mutate({ ...s, category: e.target.value })} /></td>
              <td><input type="number" value={s.price} onChange={(e) => update.mutate({ ...s, price: Number(e.target.value) })} /></td>
              <td><input type="number" value={s.quantity} onChange={(e) => update.mutate({ ...s, quantity: Number(e.target.value) })} /></td>
              <td>
                <button onClick={() => restock.mutate({ id: s.id, count: 1 })}>+1</button>
                <button onClick={() => del.mutate(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
