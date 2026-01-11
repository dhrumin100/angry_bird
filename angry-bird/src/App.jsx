
import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Detect from './pages/Detect'
import Analysis from './pages/Analysis'
import Results from './pages/Results'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import MyReports from './pages/MyReports'
import Profile from './pages/Profile'
import Leaderboard from './pages/Leaderboard'
import { AuthProvider } from './context/AuthContext'
import { AdminProvider } from './context/AdminContext'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './layouts/AdminLayout'
import OpsDashboard from './pages/admin/OpsDashboard'
import FleetManagement from './pages/admin/FleetManagement'
import AnalyticsDashboard from './pages/admin/AnalyticsDashboard'

function App() {
    // Shared state for detection flow
    const [uploadedImage, setUploadedImage] = useState(null)
    const [analysisResults, setAnalysisResults] = useState(null)
    const [location, setLocation] = useState(null)

    // Reset all state
    const resetAnalysis = () => {
        setUploadedImage(null)
        setAnalysisResults(null)
        setLocation(null)
    }

    return (
        <AuthProvider>
            <AdminProvider>
                <div className="app">
                    <Routes>
                        {/* Admin Routes - Separate Layout */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                         <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route path="dashboard" element={<OpsDashboard />} />
                            <Route path="fleet" element={<FleetManagement />} />
                            <Route path="analytics" element={<AnalyticsDashboard />} />

                            <Route path="settings" element={<div style={{padding:'2rem'}}>Settings Placeholder</div>} />
                        </Route>

                        {/* Public & Citizen Routes - Main Layout with Navbar */}
                        <Route path="*" element={
                            <>
                                <Navbar />
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/signup" element={<Signup />} />

                                    {/* Protected Routes - Require Login */}
                                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                                    <Route path="/detect" element={
                                        <ProtectedRoute>
                                            <Detect
                                                uploadedImage={uploadedImage}
                                                setUploadedImage={setUploadedImage}
                                                setAnalysisResults={setAnalysisResults}
                                            />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/analysis" element={
                                        <ProtectedRoute>
                                            <Analysis
                                                uploadedImage={uploadedImage}
                                                analysisResults={analysisResults}
                                                location={location}
                                                setLocation={setLocation}
                                            />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/results" element={
                                        <ProtectedRoute>
                                            <Results
                                                uploadedImage={uploadedImage}
                                                analysisResults={analysisResults}
                                                location={location}
                                                setLocation={setLocation}
                                                resetAnalysis={resetAnalysis}
                                            />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/my-reports" element={<ProtectedRoute><MyReports /></ProtectedRoute>} />
                                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                                    <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
                                    
                                    {/* Catch-all redirect */}
                                    <Route path="*" element={<Navigate to="/" replace />} />
                                </Routes>
                                <Footer />
                            </>
                        } />
                    </Routes>
                </div>
            </AdminProvider>
        </AuthProvider>
    )
}

export default App
