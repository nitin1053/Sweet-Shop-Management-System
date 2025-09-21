import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: '' // We don't store email in the auth context
      })
    }
  }, [user])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // In a real app, you'd have an update profile endpoint
      console.log('Profile update not implemented yet')
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>
  }

  return (
    <div className="container">
      <h1>My Profile</h1>
      
      <div style={{ 
        background: '#f8f9fa', 
        padding: '2rem', 
        borderRadius: '8px', 
        maxWidth: '500px' 
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Username:
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          ) : (
            <div style={{ padding: '0.5rem', background: 'white', border: '1px solid #ddd', borderRadius: '4px' }}>
              {user.username}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Roles:
          </label>
          <div style={{ padding: '0.5rem', background: 'white', border: '1px solid #ddd', borderRadius: '4px' }}>
            {user.roles.join(', ')}
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Member Since:
          </label>
          <div style={{ padding: '0.5rem', background: 'white', border: '1px solid #ddd', borderRadius: '4px' }}>
            {new Date().toLocaleDateString()}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isLoading}
                style={{
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer'
                }}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                style={{
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer'
                }}
              >
                Edit Profile
              </button>
              <button
                onClick={logout}
                style={{
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
