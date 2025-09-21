import { useState } from 'react'
import type { Sweet } from '../context/CartContext'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

type SweetCardProps = {
  sweet: Sweet
  onPurchase?: (sweet: Sweet) => void
}

export default function SweetCard({ sweet, onPurchase }: SweetCardProps) {
  const { addToCart } = useCart()
  const { user } = useAuth()
  const [showDetails, setShowDetails] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleAddToCart = async () => {
    if (sweet.quantity <= 0) return
    
    setIsAddingToCart(true)
    try {
      addToCart(sweet, 1)
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 2000)
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handlePurchase = () => {
    if (onPurchase) {
      onPurchase(sweet)
    }
  }

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '12px',
      padding: '1rem',
      background: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)'
      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
    }}
    onClick={() => setShowDetails(true)}
    >
      {/* Success Message Overlay */}
      {showSuccessMessage && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(46, 204, 113, 0.9)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          zIndex: 10,
          borderRadius: '12px'
        }}>
          ✅ Added to Cart!
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <div style={{
          fontSize: '3rem',
          marginBottom: '0.5rem'
        }}>
          {sweet.category === 'Indian' ? '🍯' : 
           sweet.category === 'Western' ? '🍰' : 
           sweet.category === 'Chocolate' ? '🍫' : '🍭'}
        </div>
        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{sweet.name}</h3>
        {sweet.category && (
          <div style={{ 
            color: '#666', 
            fontSize: '0.9rem',
            marginTop: '0.25rem'
          }}>
            {sweet.category}
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <div style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          color: '#2c3e50' 
        }}>
          ${sweet.price}
        </div>
        <div style={{ 
          color: sweet.quantity > 0 ? '#27ae60' : '#e74c3c',
          fontSize: '0.9rem',
          marginTop: '0.25rem'
        }}>
          {sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of stock'}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleAddToCart()
          }}
          disabled={sweet.quantity <= 0 || isAddingToCart}
          style={{
            flex: 1,
            background: sweet.quantity > 0 && !isAddingToCart ? '#3498db' : '#bdc3c7',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '0.5rem',
            cursor: sweet.quantity > 0 && !isAddingToCart ? 'pointer' : 'not-allowed',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'all 0.2s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            if (sweet.quantity > 0 && !isAddingToCart) {
              e.currentTarget.style.background = '#2980b9'
              e.currentTarget.style.transform = 'scale(1.02)'
            }
          }}
          onMouseLeave={(e) => {
            if (sweet.quantity > 0 && !isAddingToCart) {
              e.currentTarget.style.background = '#3498db'
              e.currentTarget.style.transform = 'scale(1)'
            }
          }}
        >
          {isAddingToCart ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
              <div style={{
                width: '12px',
                height: '12px',
                border: '2px solid transparent',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Adding...
            </div>
          ) : (
            <>
              🛒 Add to Cart
            </>
          )}
        </button>
        
        {user && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePurchase()
            }}
            disabled={sweet.quantity <= 0}
            style={{
              flex: 1,
              background: sweet.quantity > 0 ? '#e74c3c' : '#bdc3c7',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '0.5rem',
              cursor: sweet.quantity > 0 ? 'pointer' : 'not-allowed',
              fontSize: '0.9rem',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (sweet.quantity > 0) {
                e.currentTarget.style.background = '#c0392b'
                e.currentTarget.style.transform = 'scale(1.02)'
              }
            }}
            onMouseLeave={(e) => {
              if (sweet.quantity > 0) {
                e.currentTarget.style.background = '#e74c3c'
                e.currentTarget.style.transform = 'scale(1)'
              }
            }}
          >
            ⚡ Buy Now
          </button>
        )}
      </div>

      {/* Quick Add Quantity Selector */}
      {sweet.quantity > 0 && (
        <div style={{
          marginTop: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          fontSize: '0.8rem',
          color: '#7f8c8d'
        }}>
          <span>Quick add:</span>
          {[1, 2, 3].map(qty => (
            <button
              key={qty}
              onClick={(e) => {
                e.stopPropagation()
                addToCart(sweet, qty)
                setShowSuccessMessage(true)
                setTimeout(() => setShowSuccessMessage(false), 2000)
              }}
              style={{
                background: '#ecf0f1',
                border: '1px solid #bdc3c7',
                borderRadius: '4px',
                padding: '0.25rem 0.5rem',
                cursor: 'pointer',
                fontSize: '0.8rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#d5dbdb'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ecf0f1'
              }}
            >
              +{qty}
            </button>
          ))}
        </div>
      )}

      {showDetails && (
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
        }}
        onClick={() => setShowDetails(false)}
        >
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
              {sweet.category === 'Indian' ? '🍯' : 
               sweet.category === 'Western' ? '🍰' : 
               sweet.category === 'Chocolate' ? '🍫' : '🍭'}
            </div>
            <h2 style={{ margin: '0 0 1rem 0' }}>{sweet.name}</h2>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c3e50' }}>
                ${sweet.price}
              </div>
              {sweet.category && (
                <div style={{ color: '#666', marginTop: '0.5rem' }}>
                  Category: {sweet.category}
                </div>
              )}
              <div style={{ 
                color: sweet.quantity > 0 ? '#27ae60' : '#e74c3c',
                marginTop: '0.5rem'
              }}>
                {sweet.quantity > 0 ? `${sweet.quantity} available` : 'Out of stock'}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setShowDetails(false)}
                style={{
                  flex: 1,
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleAddToCart()
                  setShowDetails(false)
                }}
                disabled={sweet.quantity <= 0}
                style={{
                  flex: 1,
                  background: sweet.quantity > 0 ? '#3498db' : '#bdc3c7',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.75rem',
                  cursor: sweet.quantity > 0 ? 'pointer' : 'not-allowed'
                }}
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
