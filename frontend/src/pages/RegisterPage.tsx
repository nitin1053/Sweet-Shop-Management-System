import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

type RegisterForm = { username: string; email: string; password: string; confirmPassword: string }

export default function RegisterPage() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<RegisterForm>()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [registerError, setRegisterError] = useState('')
  
  const password = watch('password')

  async function onSubmit(values: RegisterForm) {
    try {
      setRegisterError('')
      await registerUser(values.username, values.email, values.password)
      navigate('/login')
    } catch (error) {
      setRegisterError('Registration failed. Please try again.')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        padding: '3rem',
        width: '100%',
        maxWidth: '450px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          borderRadius: '50%',
          opacity: 0.1
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(45deg, #764ba2, #667eea)',
          borderRadius: '50%',
          opacity: 0.1
        }} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '0.5rem'
          }}>
            🍭
          </div>
          <h1 style={{
            margin: 0,
            color: '#2c3e50',
            fontSize: '2rem',
            fontWeight: '700'
          }}>
            Join Sweet Shop
          </h1>
          <p style={{
            color: '#7f8c8d',
            margin: '0.5rem 0 0 0',
            fontSize: '0.9rem'
          }}>
            Create your account and start shopping
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Username Field */}
          <div>
            <label htmlFor="username" style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2c3e50',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="username"
                {...register('username', { 
                  required: 'Username is required',
                  minLength: { value: 3, message: 'Username must be at least 3 characters' }
                })}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  border: `2px solid ${errors.username ? '#e74c3c' : '#e1e8ed'}`,
                  borderRadius: '12px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="Choose a username"
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea'
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.username ? '#e74c3c' : '#e1e8ed'
                  e.target.style.boxShadow = 'none'
                }}
              />
              <div style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#7f8c8d',
                fontSize: '1.2rem'
              }}>
                👤
              </div>
            </div>
            {errors.username && (
              <p style={{
                color: '#e74c3c',
                fontSize: '0.8rem',
                margin: '0.5rem 0 0 0'
              }}>
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2c3e50',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="email"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  border: `2px solid ${errors.email ? '#e74c3c' : '#e1e8ed'}`,
                  borderRadius: '12px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="Enter your email"
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea'
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.email ? '#e74c3c' : '#e1e8ed'
                  e.target.style.boxShadow = 'none'
                }}
              />
              <div style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#7f8c8d',
                fontSize: '1.2rem'
              }}>
                📧
              </div>
            </div>
            {errors.email && (
              <p style={{
                color: '#e74c3c',
                fontSize: '0.8rem',
                margin: '0.5rem 0 0 0'
              }}>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2c3e50',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', { 
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
                style={{
                  width: '100%',
                  padding: '1rem 3rem 1rem 3rem',
                  border: `2px solid ${errors.password ? '#e74c3c' : '#e1e8ed'}`,
                  borderRadius: '12px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="Create a password"
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea'
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.password ? '#e74c3c' : '#e1e8ed'
                  e.target.style.boxShadow = 'none'
                }}
              />
              <div style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#7f8c8d',
                fontSize: '1.2rem'
              }}>
                🔒
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#7f8c8d',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  padding: '0.25rem'
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <p style={{
                color: '#e74c3c',
                fontSize: '0.8rem',
                margin: '0.5rem 0 0 0'
              }}>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2c3e50',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                style={{
                  width: '100%',
                  padding: '1rem 3rem 1rem 3rem',
                  border: `2px solid ${errors.confirmPassword ? '#e74c3c' : '#e1e8ed'}`,
                  borderRadius: '12px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="Confirm your password"
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea'
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.confirmPassword ? '#e74c3c' : '#e1e8ed'
                  e.target.style.boxShadow = 'none'
                }}
              />
              <div style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#7f8c8d',
                fontSize: '1.2rem'
              }}>
                🔐
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#7f8c8d',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  padding: '0.25rem'
                }}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.confirmPassword && (
              <p style={{
                color: '#e74c3c',
                fontSize: '0.8rem',
                margin: '0.5rem 0 0 0'
              }}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Error Message */}
          {registerError && (
            <div style={{
              background: '#ffe6e6',
              color: '#e74c3c',
              padding: '0.75rem',
              borderRadius: '8px',
              fontSize: '0.9rem',
              textAlign: 'center',
              border: '1px solid #ffcccc'
            }}>
              {registerError}
            </div>
          )}

          {/* Submit Button */}
          <button
            disabled={isSubmitting}
            type="submit"
            style={{
              background: isSubmitting 
                ? '#bdc3c7' 
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }
            }}
          >
            {isSubmitting ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e1e8ed'
        }}>
          <p style={{
            color: '#7f8c8d',
            margin: 0,
            fontSize: '0.9rem'
          }}>
            Already have an account?{' '}
            <Link to="/login" style={{
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#764ba2'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#667eea'
            }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
