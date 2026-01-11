import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * ProtectedRoute - Wraps routes that require authentication
 * Redirects to login if not authenticated, with return URL preserved
 */
function ProtectedRoute({ children }) {
    const { user, loading } = useAuth()
    const location = useLocation()

    // Show nothing while checking auth state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg-gradient)' }}>
                <div className="spinner"></div>
            </div>
        )
    }

    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />
    }

    return children
}

export default ProtectedRoute
