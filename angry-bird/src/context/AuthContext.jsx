import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initial load from localStorage (token check)
    useEffect(() => {
        const storedUser = localStorage.getItem('roadscan_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
        // We could verify token with /api/auth/me here
    }, []);

    // Login
    const login = useCallback(async (userId, password) => {
        try {
            const { data } = await api.post('/auth/login', { userId, password });
            setUser(data);
            localStorage.setItem('roadscan_user', JSON.stringify(data));
            localStorage.setItem('token', data.token);
            // Fetch user submissions on login
             // We can trigger this or let the MyReports component fetch it. 
            return true;
        } catch (error) {
            console.error('Login Failed:', error);
            return false;
        }
    }, []);

    // Signup
    const signup = useCallback(async (name, email, role = 'citizen') => {
        try {
            const { data } = await api.post('/auth/signup', { name, email, role });
            setUser(data);
            localStorage.setItem('roadscan_user', JSON.stringify(data));
            localStorage.setItem('token', data.token);
            return { userId: data.civicId || data.email, password: data.generatedPassword };
        } catch (error) {
            console.error('Signup Failed:', error);
            return null;
        }
    }, []);

    // Logout
    const logout = useCallback(() => {
        localStorage.removeItem('roadscan_user');
        localStorage.removeItem('token');
        setUser(null);
        setSubmissions([]);
    }, []);

    // Add a submission
    const addSubmission = useCallback(async (submissionData) => {
        if (!user) return;
        try {
            const { data } = await api.post('/submissions', submissionData);
            setSubmissions(prev => [data, ...prev]);
             // Update user karma locally or refetch user
             setUser(prev => ({ ...prev, karmaPoints: (prev.karmaPoints || 0) + 100 })); 
            return data;
        } catch (error) {
            console.error('Submission Failed:', error);
            return null;
        }
    }, [user]);

    const fetchSubmissions = useCallback(async () => {
        if (!user) return;
        try {
            const { data } = await api.get('/submissions/my');
            setSubmissions(data);
        } catch (error) {
           // Silent fail
        }
    }, [user]);

    // Initial fetch of submissions if user exists
    useEffect(() => {
        if (user) {
            fetchSubmissions();
        }
    }, [user, fetchSubmissions]);


    const value = {
        user,
        loading,
        signup,
        login,
        logout,
        addSubmission,
        submissions, // Now populated from backend
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
