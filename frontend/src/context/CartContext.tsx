import { createContext, useContext, useState, useEffect } from 'react'

export type Sweet = {
  id: number
  name: string
  category?: string
  price: number
  quantity: number
}

export type CartItem = {
  sweet: Sweet
  quantity: number
}

export type CartContextType = {
  items: CartItem[]
  addToCart: (sweet: Sweet, quantity?: number) => void
  removeFromCart: (sweetId: number) => void
  updateQuantity: (sweetId: number, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('sweet-shop-cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sweet-shop-cart', JSON.stringify(items))
  }, [items])

  const addToCart = (sweet: Sweet, quantity = 1) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.sweet.id === sweet.id)
      if (existingItem) {
        return prev.map(item =>
          item.sweet.id === sweet.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prev, { sweet, quantity }]
      }
    })
  }

  const removeFromCart = (sweetId: number) => {
    setItems(prev => prev.filter(item => item.sweet.id !== sweetId))
  }

  const updateQuantity = (sweetId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(sweetId)
    } else {
      setItems(prev =>
        prev.map(item =>
          item.sweet.id === sweetId
            ? { ...item, quantity }
            : item
        )
      )
    }
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.sweet.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
