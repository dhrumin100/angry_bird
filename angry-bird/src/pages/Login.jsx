import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { User, Lock, ArrowRight, Loader2, Shield, Sparkles } from 'lucide-react'

const Login = () => {
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)
        
        const success = await login(userId, password)
        setIsLoading(false)
        
        if (success) {
            navigate('/dashboard')
        } else {
            setError('Invalid User ID or Password. Please try again.')
        }
    }

    return (
        <main style={{ 
            minHeight: '100vh', 
            display: 'flex',
            background: 'linear-gradient(135deg, #faf8f5 0%, #fff 50%, #f5f0e8 100%)'
        }}>
            {/* Left Side - Branding */}
            <div style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '2rem 3rem',
                background: 'linear-gradient(135deg, var(--color-primary) 0%, #E55A28 50%, #CC4D20 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }} className="login-branding">
                {/* Background decorative elements */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    filter: 'blur(40px)'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '-30px',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    filter: 'blur(30px)'
                }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                        <div style={{ 
                            width: '48px', 
                            height: '48px', 
                            background: 'rgba(255,255,255,0.2)', 
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Shield size={28} />
                        </div>
                        <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>KAVAACH</span>
                    </div>

                    <h1 style={{ fontSize: '2rem', fontWeight: '700', lineHeight: '1.3', marginBottom: '1rem' }}>
                        Making India's Roads Safer, Together
                    </h1>
                    <p style={{ fontSize: '1rem', opacity: '0.9', lineHeight: '1.6', maxWidth: '380px' }}>
                        Join thousands of citizens actively improving road infrastructure through AI-powered reporting.
                    </p>

                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem' }}>
                        <div>
                            <div style={{ fontSize: '1.75rem', fontWeight: '700' }}>12K+</div>
                            <div style={{ fontSize: '0.85rem', opacity: '0.8' }}>Issues Reported</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.75rem', fontWeight: '700' }}>89%</div>
                            <div style={{ fontSize: '0.85rem', opacity: '0.8' }}>Resolution Rate</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.75rem', fontWeight: '700' }}>8</div>
                            <div style={{ fontSize: '0.85rem', opacity: '0.8' }}>Cities Active</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div style={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '2rem'
            }}>
                <div style={{ width: '100%', maxWidth: '380px' }}>
                    {/* Header */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text-dark)', marginBottom: '0.5rem' }}>
                            Welcome Back
                        </h2>
                        <p style={{ color: 'var(--color-text-medium)', fontSize: '0.9rem' }}>
                            Sign in to continue to your dashboard
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div style={{ 
                            marginBottom: '1rem', 
                            padding: '0.75rem 1rem', 
                            borderRadius: '8px', 
                            background: 'rgba(239, 68, 68, 0.1)', 
                            border: '1px solid rgba(239, 68, 68, 0.2)', 
                            color: '#dc2626',
                            fontSize: '0.875rem'
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {/* User ID Input */}
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-medium)', marginBottom: '0.375rem' }}>
                                Civic ID
                            </label>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }}>
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="e.g. RS-A1B2C3"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                        fontSize: '0.9rem',
                                        border: '1.5px solid rgba(0,0,0,0.1)',
                                        borderRadius: '10px',
                                        background: 'white',
                                        transition: 'border-color 0.2s, box-shadow 0.2s',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'var(--color-primary)'
                                        e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)'
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(0,0,0,0.1)'
                                        e.target.style.boxShadow = 'none'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-medium)', marginBottom: '0.375rem' }}>
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }}>
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                        fontSize: '0.9rem',
                                        border: '1.5px solid rgba(0,0,0,0.1)',
                                        borderRadius: '10px',
                                        background: 'white',
                                        transition: 'border-color 0.2s, box-shadow 0.2s',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'var(--color-primary)'
                                        e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)'
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(0,0,0,0.1)'
                                        e.target.style.boxShadow = 'none'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1.25rem',
                                fontSize: '0.95rem',
                                fontWeight: '600',
                                color: 'white',
                                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                boxShadow: '0 4px 14px rgba(255, 107, 53, 0.35)',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                opacity: isLoading ? 0.7 : 1
                            }}
                            onMouseEnter={(e) => !isLoading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', margin: '1.25rem 0' }}>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
                        <span style={{ padding: '0 1rem', fontSize: '0.8rem', color: 'var(--color-text-light)' }}>OR</span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
                    </div>

                    {/* Google Button */}
                    <button
                        type="button"
                        onClick={async () => {
                            const success = await login('GOOGLE_USER', 'password');
                            if (success) navigate('/dashboard');
                        }}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1.25rem',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            color: 'var(--color-text-dark)',
                            background: 'white',
                            border: '1.5px solid rgba(0,0,0,0.1)',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            transition: 'background 0.2s, border-color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f8f8f8'
                            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'white'
                            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'
                        }}
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px', height: '18px' }} />
                        Continue with Google
                    </button>

                    {/* Footer */}
                    <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.875rem', color: 'var(--color-text-medium)' }}>
                        Don't have an account?{' '}
                        <Link to="/signup" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
                            Create one
                        </Link>
                    </p>
                </div>
            </div>

            {/* Mobile: Hide left branding panel */}
            <style>{`
                @media (max-width: 768px) {
                    .login-branding {
                        display: none !important;
                    }
                }
            `}</style>
        </main>
    )
}

export default Login
