import { Link } from 'react-router-dom'
import { Shield, Github, Twitter, Linkedin, MapPin, Mail, Phone } from 'lucide-react'

function Footer() {
    return (
        <footer style={{ 
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', 
            color: 'white', 
            padding: 'var(--space-3xl) 0 var(--space-xl)'
        }}>
            <div className="container">
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: 'var(--space-2xl)', 
                    marginBottom: 'var(--space-2xl)' 
                }}>
                    {/* Brand Column */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                            <div style={{ 
                                width: '40px', 
                                height: '40px', 
                                borderRadius: 'var(--radius-md)', 
                                background: 'linear-gradient(135deg, var(--color-primary) 0%, #004E89 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Shield size={20} color="white" />
                            </div>
                            <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>KAVAACH</span>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                            Building India's intelligent mobility future through citizen-powered civic infrastructure.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ marginBottom: 'var(--space-md)', fontWeight: '600', fontSize: '1rem' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                            <li><Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}>Home</Link></li>
                            <li><Link to="/dashboard" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}>Dashboard</Link></li>
                            <li><Link to="/leaderboard" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}>Leaderboard</Link></li>
                            <li><a href="#vision" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}>Our Vision</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 style={{ marginBottom: 'var(--space-md)', fontWeight: '600', fontSize: '1rem' }}>Legal</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                            <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</a></li>
                            <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem' }}>Terms of Service</a></li>
                            <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem' }}>Cookie Policy</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ marginBottom: 'var(--space-md)', fontWeight: '600', fontSize: '1rem' }}>Contact</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                                <Mail size={16} />
                                <span>contact@kavaach.in</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                                <MapPin size={16} />
                                <span>Mumbai, India</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-lg)' }}>
                            <a href="#" style={{ 
                                width: '36px', 
                                height: '36px', 
                                borderRadius: '50%', 
                                background: 'rgba(255,255,255,0.1)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                color: 'white',
                                transition: 'background 0.2s'
                            }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                                <Twitter size={18} />
                            </a>
                            <a href="#" style={{ 
                                width: '36px', 
                                height: '36px', 
                                borderRadius: '50%', 
                                background: 'rgba(255,255,255,0.1)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                color: 'white',
                                transition: 'background 0.2s'
                            }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                                <Linkedin size={18} />
                            </a>
                            <a href="#" style={{ 
                                width: '36px', 
                                height: '36px', 
                                borderRadius: '50%', 
                                background: 'rgba(255,255,255,0.1)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                color: 'white',
                                transition: 'background 0.2s'
                            }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                                <Github size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{ 
                    borderTop: '1px solid rgba(255,255,255,0.1)', 
                    paddingTop: 'var(--space-xl)', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 'var(--space-md)'
                }}>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                        © 2025 KAVAACH. Part of India's Smart City Mission.
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                        Built with ❤️ for safer roads
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
