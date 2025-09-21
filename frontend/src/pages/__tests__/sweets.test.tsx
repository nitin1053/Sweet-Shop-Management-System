import { describe, it, beforeAll, afterAll, afterEach, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '../../context/AuthContext'
import { CartProvider } from '../../context/CartContext'
import type { Sweet } from '../../context/CartContext'
import DashboardPage from '../DashboardPage'

const sweets: Sweet[] = [
  { id: 1, name: 'Ladoo', category: 'Indian', price: 5, quantity: 0 },
  { id: 2, name: 'Barfi', category: 'Indian', price: 6, quantity: 3 },
]

const server = setupServer(
  http.get('/api/sweets', async () => HttpResponse.json(sweets)),
  http.post('/api/sweets/:id/purchase', async ({ params }) => {
    const id = Number(params.id)
    const sweet = sweets.find((s) => s.id === id)!
    if (sweet.quantity <= 0) return new HttpResponse(null, { status: 400 })
    sweet.quantity -= 1
    return HttpResponse.json(sweet)
  }),
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

function renderWithProviders(ui: React.ReactNode) {
  const qc = new QueryClient()
  return render(
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>{ui}</CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>,
  )
}

describe('Sweets Dashboard', () => {
  it('shows Out of stock when quantity is zero', async () => {
    renderWithProviders(<DashboardPage />)
    const outOfStock = await screen.findByText(/out of stock/i)
    expect(outOfStock).toBeDefined()
  })

  it('shows only Add to Cart button when not logged in', async () => {
    renderWithProviders(<DashboardPage />)
    const addToCartButtons = await screen.findAllByText(/add to cart/i)
    expect(addToCartButtons).toHaveLength(2) // One for each sweet
    expect(screen.queryByText(/buy now/i)).toBeNull()
  })
})
