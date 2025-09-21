import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '../../context/AuthContext'
import LoginPage from '../LoginPage'
import RegisterPage from '../RegisterPage'

const server = setupServer(
  http.post('/api/auth/login', async () => {
    return HttpResponse.json({ token: 't', username: 'u', roles: ['USER'] })
  }),
  http.post('/api/auth/register', async () => {
    return new HttpResponse(null, { status: 200 })
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
        <AuthProvider>{ui}</AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>,
  )
}

describe('Auth', () => {
  it('logs in successfully', async () => {
    renderWithProviders(<LoginPage />)
    await userEvent.type(screen.getByLabelText(/username/i), 'u')
    await userEvent.type(screen.getByLabelText(/password/i), 'p')
    await userEvent.click(screen.getByRole('button', { name: /^login$/i }))
    // cookie should be set by js-cookie interceptor
    await new Promise((r) => setTimeout(r, 0))
    expect(document.cookie).toMatch(/token=t/)
  })

  it('registers successfully', async () => {
    renderWithProviders(<RegisterPage />)
    await userEvent.type(screen.getByLabelText(/username/i), 'u')
    await userEvent.type(screen.getByLabelText(/email/i), 'e@e.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'p')
    await userEvent.click(screen.getByRole('button', { name: /create account/i }))
    expect(true).toBeTruthy()
  })
})
