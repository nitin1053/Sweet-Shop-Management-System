import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = async () => {
    if (!user) return
    
    setIsCheckingOut(true)
    try {
      // Process each item in cart
      for (const item of items) {
        await api.post(`/sweets/${item.sweet.id}/purchase`, null, {
          params: { count: item.quantity }
        })
      }
      
      // Clear cart after successful checkout
      clearCart()
      alert('Order placed successfully!')
      setIsOpen(false)
    } catch (error) {
      console.error('Checkout failed:', error)
      alert('Checkout failed. Please try again.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '1.2rem',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}
      >
        🛒 {items.length > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#f39c12', borderRadius: '50%', width: '20px', height: '20px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{items.length}</span>}
      </button>
    )
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '8px',
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Shopping Cart</h2>
          <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
        </div>

        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div style={{ marginBottom: '1rem' }}>
              {items.map(item => (
                <div key={item.sweet.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #eee'
                }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{item.sweet.name}</div>
                    <div style={{ color: '#666', fontSize: '0.9rem' }}>${item.sweet.price} each</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => updateQuantity(item.sweet.id, item.quantity - 1)}
                      style={{ background: '#f8f9fa', border: '1px solid #ddd', borderRadius: '4px', padding: '0.25rem 0.5rem', cursor: 'pointer' }}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.sweet.id, item.quantity + 1)}
                      style={{ background: '#f8f9fa', border: '1px solid #ddd', borderRadius: '4px', padding: '0.25rem 0.5rem', cursor: 'pointer' }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.sweet.id)}
                      style={{ background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', padding: '0.25rem 0.5rem', cursor: 'pointer', marginLeft: '0.5rem' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '2px solid #eee', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={clearCart}
                  style={{ background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem', cursor: 'pointer', flex: 1 }}
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={!user || isCheckingOut}
                  style={{ 
                    background: user ? '#28a745' : '#6c757d', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    padding: '0.5rem 1rem', 
                    cursor: user ? 'pointer' : 'not-allowed',
                    flex: 1
                  }}
                >
                  {isCheckingOut ? 'Processing...' : user ? 'Checkout' : 'Login to Checkout'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
