import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function Header() {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setShowMenu(false)
  }

  return (
    <header style={{ 
      background: '#2c3e50', 
      color: 'white', 
      padding: '1rem 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
          🍭 Sweet Shop
        </Link>
        
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          
          {user ? (
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowMenu(!showMenu)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'white', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                👤 {user.username}
                <span>▼</span>
              </button>
              
              {showMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: 'white',
                  color: '#333',
                  minWidth: '200px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  borderRadius: '4px',
                  padding: '0.5rem 0',
                  zIndex: 1000
                }}>
                  <Link 
                    to="/profile" 
                    style={{ display: 'block', padding: '0.5rem 1rem', textDecoration: 'none', color: '#333' }}
                    onClick={() => setShowMenu(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/orders" 
                    style={{ display: 'block', padding: '0.5rem 1rem', textDecoration: 'none', color: '#333' }}
                    onClick={() => setShowMenu(false)}
                  >
                    My Orders
                  </Link>
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      style={{ display: 'block', padding: '0.5rem 1rem', textDecoration: 'none', color: '#333' }}
                      onClick={() => setShowMenu(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    style={{ 
                      width: '100%', 
                      textAlign: 'left', 
                      padding: '0.5rem 1rem', 
                      border: 'none', 
                      background: 'none', 
                      cursor: 'pointer',
                      color: '#333'
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
              <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
