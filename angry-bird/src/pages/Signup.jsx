import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { UserPlus, Mail, User, Sparkles, Copy, Check, ArrowRight, Shield, Users, TrendingUp } from 'lucide-react'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [credentials, setCredentials] = useState(null)
    const [copied, setCopied] = useState({ id: false, pass: false })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const { signup } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (name && email) {
            setIsLoading(true)
            try {
                const result = await signup(name, email)
                if (result) {
                    setCredentials(result)
                } else {
                    setError('Failed to create account. Please check if backend is running.')
                }
            } catch (error) {
                console.error("Signup error:", error)
                setError('Connection error. Please ensure the server is running on port 5000.')
            } finally {
                setIsLoading(false)
            }
        }
    }

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text)
        setCopied(prev => ({ ...prev, [type]: true }))
        setTimeout(() => setCopied(prev => ({ ...prev, [type]: false })), 2000)
    }

    return (
        <main style={{ 
            minHeight: '100vh', 
            display: 'flex',
            background: 'linear-gradient(135deg, #faf8f5 0%, #fff 50%, #f5f0e8 100%)'
        }}>
            {/* Left Side - Form */}
            <div style={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '2rem'
            }}>
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    {!credentials ? (
                        /* Signup Form */
                        <>
                            {/* Header */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    width: '48px', 
                                    height: '48px', 
                                    borderRadius: '12px', 
                                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
                                    marginBottom: '1rem'
                                }}>
                                    <UserPlus size={24} color="white" />
                                </div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text-dark)', marginBottom: '0.5rem' }}>
                                    Join KAVAACH
                                </h2>
                                <p style={{ color: 'var(--color-text-medium)', fontSize: '0.9rem' }}>
                                    Become a civic champion today
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Full Name */}
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-medium)', marginBottom: '0.375rem' }}>
                                        Full Name
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }}>
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Your full name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
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

                                {/* Email */}
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-medium)', marginBottom: '0.375rem' }}>
                                        Email Address
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }}>
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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

                                {/* Error Message */}
                                {error && (
                                    <div style={{
                                        padding: '0.75rem 1rem',
                                        borderRadius: '8px',
                                        backgroundColor: '#fef2f2',
                                        border: '1px solid #fecaca',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <p style={{ fontSize: '0.85rem', color: '#dc2626' }}>
                                            {error}
                                        </p>
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1.25rem',
                                        fontSize: '0.95rem',
                                        fontWeight: '600',
                                        color: 'white',
                                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
                                        border: 'none',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        boxShadow: '0 4px 14px rgba(255, 107, 53, 0.35)',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        opacity: isLoading ? 0.7 : 1,
                                        pointerEvents: isLoading ? 'none' : 'auto'
                                    }}
                                    onMouseEnter={(e) => !isLoading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <div style={{ 
                                                width: '18px', 
                                                height: '18px', 
                                                border: '2px solid white', 
                                                borderTopColor: 'transparent', 
                                                borderRadius: '50%', 
                                                animation: 'spin 1s linear infinite' 
                                            }}></div>
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={18} />
                                            Generate Credentials
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

                            {/* Google */}
                            <button
                                type="button"
                                onClick={async () => {
                                    const result = await signup("Google User", "google@example.com")
                                    setCredentials(result)
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
                                Sign up with Google
                            </button>

                            <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.875rem', color: 'var(--color-text-medium)' }}>
                                Already have an account?{' '}
                                <Link to="/login" className="link-primary" style={{ fontWeight: '600' }}>
                                    Sign in
                                </Link>
                            </p>
                        </>
                    ) : (
                        /* Credentials Display */
                        <div className="animate-scaleIn">
                            {/* Success Header */}
                            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                <div style={{ 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    width: '56px', 
                                    height: '56px', 
                                    borderRadius: '50%', 
                                    backgroundColor: '#dcfce7',
                                    marginBottom: '1rem'
                                }}>
                                    <Shield size={28} color="#16a34a" />
                                </div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#166534', marginBottom: '0.5rem' }}>
                                    Account Created!
                                </h2>
                                <p style={{ color: '#15803d', fontSize: '0.9rem' }}>
                                    Your secure credentials have been generated
                                </p>
                            </div>

                            {/* Warning */}
                            <div style={{ 
                                padding: '0.75rem 1rem', 
                                borderRadius: '8px', 
                                backgroundColor: '#fef2f2', 
                                border: '1px solid #fecaca',
                                marginBottom: '1.25rem'
                            }}>
                                <p style={{ 
                                    fontSize: '0.85rem', 
                                    fontWeight: '600', 
                                    color: '#dc2626', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '0.5rem' 
                                }}>
                                    ⚠️ Save these credentials now. They won't be shown again.
                                </p>
                            </div>

                            {/* Credentials Box */}
                            <div style={{ 
                                padding: '1rem', 
                                borderRadius: '12px', 
                                backgroundColor: 'var(--color-bg-medium)', 
                                border: '1px solid var(--color-accent-cream)'
                            }}>
                                {/* Civic ID */}
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-text-light)', marginBottom: '0.375rem' }}>
                                        Civic ID
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ 
                                            flex: 1, 
                                            fontFamily: 'monospace', 
                                            fontSize: '1rem', 
                                            padding: '0.75rem', 
                                            borderRadius: '8px', 
                                            backgroundColor: 'white', 
                                            border: '1px solid var(--color-accent-cream)', 
                                            color: 'var(--color-text-dark)' 
                                        }}>
                                            {credentials.userId}
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(credentials.userId, 'id')}
                                            style={{ 
                                                padding: '0.75rem', 
                                                borderRadius: '8px', 
                                                backgroundColor: copied.id ? '#dcfce7' : 'white', 
                                                border: '1px solid var(--color-accent-cream)',
                                                cursor: 'pointer',
                                                transition: 'background 0.2s'
                                            }}
                                        >
                                            {copied.id ? <Check size={18} color="#16a34a" /> : <Copy size={18} style={{ color: 'var(--color-text-medium)' }} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-text-light)', marginBottom: '0.375rem' }}>
                                        Password
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ 
                                            flex: 1, 
                                            fontFamily: 'monospace', 
                                            fontSize: '1rem', 
                                            padding: '0.75rem', 
                                            borderRadius: '8px', 
                                            backgroundColor: 'white', 
                                            border: '1px solid var(--color-accent-cream)', 
                                            color: 'var(--color-text-dark)' 
                                        }}>
                                            {credentials.password}
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(credentials.password, 'pass')}
                                            style={{ 
                                                padding: '0.75rem', 
                                                borderRadius: '8px', 
                                                backgroundColor: copied.pass ? '#dcfce7' : 'white', 
                                                border: '1px solid var(--color-accent-cream)',
                                                cursor: 'pointer',
                                                transition: 'background 0.2s'
                                            }}
                                        >
                                            {copied.pass ? <Check size={18} color="#16a34a" /> : <Copy size={18} style={{ color: 'var(--color-text-medium)' }} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => navigate('/login')}
                                style={{
                                    width: '100%',
                                    marginTop: '1.25rem',
                                    padding: '0.75rem 1.25rem',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    color: 'white',
                                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
                                    border: 'none',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    boxShadow: '0 4px 14px rgba(255, 107, 53, 0.35)',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                I've Saved My Credentials
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side - Branding */}
            <div style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '2rem 3rem',
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-deep) 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }} className="signup-branding">
                {/* Background decorative elements */}
                <div style={{
                    position: 'absolute',
                    top: '15%',
                    left: '-40px',
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    filter: 'blur(40px)'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '-30px',
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    filter: 'blur(30px)'
                }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: '700', lineHeight: '1.3', marginBottom: '1rem' }}>
                        Start Making a Difference Today
                    </h1>
                    <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.6', maxWidth: '360px', marginBottom: '2rem' }}>
                        Join a community of civic champions who are transforming India's roads one report at a time.
                    </p>

                    {/* Features */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ 
                                width: '36px', 
                                height: '36px', 
                                borderRadius: '8px', 
                                background: 'rgba(255,255,255,0.15)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                            }}>
                                <Users size={18} />
                            </div>
                            <div>
                                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>3,400+ Active Contributors</div>
                                <div style={{ fontSize: '0.8rem', opacity: '0.7' }}>Growing community of civic heroes</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ 
                                width: '36px', 
                                height: '36px', 
                                borderRadius: '8px', 
                                background: 'rgba(255,255,255,0.15)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                            }}>
                                <Shield size={18} />
                            </div>
                            <div>
                                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>AI-Powered Detection</div>
                                <div style={{ fontSize: '0.8rem', opacity: '0.7' }}>YOLOv8 computer vision model</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ 
                                width: '36px', 
                                height: '36px', 
                                borderRadius: '8px', 
                                background: 'rgba(255,255,255,0.15)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                            }}>
                                <TrendingUp size={18} />
                            </div>
                            <div>
                                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Track Your Impact</div>
                                <div style={{ fontSize: '0.8rem', opacity: '0.7' }}>Earn XP and climb the leaderboard</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile: Hide right branding panel + Spinner animation */}
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @media (max-width: 768px) {
                    .signup-branding {
                        display: none !important;
                    }
                }
            `}</style>
        </main>
    )
}

export default Signup
