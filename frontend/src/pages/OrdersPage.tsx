import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export type Order = {
  id: number
  items: Array<{
    sweet: {
      id: number
      name: string
      price: number
    }
    quantity: number
  }>
  total: number
  date: string
  status: 'pending' | 'completed' | 'cancelled'
}

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadOrders()
    }
  }, [user])

  const loadOrders = async () => {
    setIsLoading(true)
    try {
      // In a real app, you'd have an orders endpoint
      // For now, we'll show mock data
      const mockOrders: Order[] = [
        {
          id: 1,
          items: [
            { sweet: { id: 1, name: 'Ladoo', price: 5 }, quantity: 2 },
            { sweet: { id: 2, name: 'Barfi', price: 6 }, quantity: 1 }
          ],
          total: 16,
          date: '2024-01-15',
          status: 'completed'
        },
        {
          id: 2,
          items: [
            { sweet: { id: 3, name: 'Gulab Jamun', price: 4 }, quantity: 3 }
          ],
          total: 12,
          date: '2024-01-14',
          status: 'pending'
        }
      ]
      setOrders(mockOrders)
    } catch (error) {
      console.error('Failed to load orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return <div>Please log in to view your orders.</div>
  }

  if (isLoading) {
    return <div className="container">Loading orders...</div>
  }

  return (
    <div className="container">
      <h1>My Orders</h1>
      
      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No orders found.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.map(order => (
            <div key={order.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              background: 'white'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h3>Order #{order.id}</h3>
                  <p style={{ color: '#666', margin: 0 }}>Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '4px', 
                    background: order.status === 'completed' ? '#d4edda' : order.status === 'pending' ? '#fff3cd' : '#f8d7da',
                    color: order.status === 'completed' ? '#155724' : order.status === 'pending' ? '#856404' : '#721c24',
                    fontSize: '0.9rem',
                    textTransform: 'capitalize'
                  }}>
                    {order.status}
                  </div>
                  <div style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>
                    Total: ${order.total.toFixed(2)}
                  </div>
                </div>
              </div>
              
              <div>
                <h4>Items:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {order.items.map((item, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.5rem',
                      background: '#f8f9fa',
                      borderRadius: '4px'
                    }}>
                      <div>
                        <span style={{ fontWeight: 'bold' }}>{item.sweet.name}</span>
                        <span style={{ color: '#666', marginLeft: '0.5rem' }}>x{item.quantity}</span>
                      </div>
                      <div>${(item.sweet.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
