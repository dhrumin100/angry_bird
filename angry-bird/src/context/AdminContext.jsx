import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
    const [adminUser, setAdminUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [fleet, setFleet] = useState([]);

    useEffect(() => {
        const storedAdmin = localStorage.getItem('adminUser');
        const token = localStorage.getItem('adminToken');
        
        if (storedAdmin && token) {
            setAdminUser(JSON.parse(storedAdmin));
            // Set token for axios - tricky if we use same 'token' key in localStorage for both user types.
            // Solution: Use 'adminToken' and manual header or separate axios instance. 
            // For now, let's assume one user type active at a time or handle token switching.
            // Better: 'api.js' uses 'token'. Admin login should probably use a separate key or we swap 'token'.
            // Let's decide: 'token' is the active session key.
        }
        setLoading(false);
    }, []);

    const loginAdmin = async (email, password) => {
        try {
            const { data } = await api.post('/admin/login', { email, password });
            setAdminUser(data);
            localStorage.setItem('adminUser', JSON.stringify(data));
            localStorage.setItem('token', data.token); // Use standard key for api.js
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const logoutAdmin = () => {
        setAdminUser(null);
        localStorage.removeItem('adminUser');
        localStorage.removeItem('token');
    };

    const fetchDashboardStats = async () => {
        try {
            const { data } = await api.get('/admin/dashboard/stats');
            setStats(data);
        } catch (error) {
            console.error('Failed to fetch stats', error);
        }
    };

    const fetchFleet = async () => {
        try {
            const { data } = await api.get('/fleet');
            setFleet(data);
        } catch (error) {
            console.error('Failed to fetch fleet', error);
        }
    };

    const fetchQueue = async () => {
        try {
            const { data } = await api.get('/submissions/queue');
            return data;
        } catch (error) {
            console.error('Failed to fetch queue', error);
            return [];
        }
    };

    const assignTruck = async ({ truckId, reportId, teamLead, priority }) => {
        try {
             await api.post('/fleet/assign', { truckId, reportId, teamLead, priority });
             await fetchFleet(); // Refresh
             return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const value = {
        adminUser,
        loading,
        loginAdmin,
        logoutAdmin,
        stats,
        fleet,
        fetchDashboardStats,
        fetchFleet,
        fetchQueue,
        assignTruck
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};
