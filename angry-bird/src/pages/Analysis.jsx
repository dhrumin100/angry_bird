import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import {
    CheckCircle,
    AlertTriangle,
    Info,
    MapPin,
    Crosshair,
    ArrowRight,
    ArrowLeft,
    Shield,
    Cpu,
    Target,
    Edit3
} from 'lucide-react'

function Analysis({ uploadedImage, analysisResults, location, setLocation }) {
    const navigate = useNavigate()
    const [isGettingLocation, setIsGettingLocation] = useState(false)
    const [manualAddress, setManualAddress] = useState('')
    const [isEditingAddress, setIsEditingAddress] = useState(false)
    const hasConfettiFired = useRef(false)

    // Celebration confetti when results are loaded
    useEffect(() => {
        if (analysisResults && !hasConfettiFired.current) {
            hasConfettiFired.current = true
            // Fire confetti from both sides
            const fireConfetti = () => {
                confetti({
                    particleCount: 80,
                    spread: 70,
                    origin: { x: 0.1, y: 0.6 },
                    colors: ['#10b981', '#059669', '#34d399', '#c9a962', '#f59e0b']
                })
                confetti({
                    particleCount: 80,
                    spread: 70,
                    origin: { x: 0.9, y: 0.6 },
                    colors: ['#10b981', '#059669', '#34d399', '#c9a962', '#f59e0b']
                })
            }
            // Slight delay for dramatic effect
            setTimeout(fireConfetti, 300)
        }
    }, [analysisResults])

    // Sync manual address with location when GPS updates
    useEffect(() => {
        if (location?.address && !isEditingAddress) {
            setManualAddress(location.address)
        }
    }, [location?.address, isEditingAddress])

    // Update location when user saves manual address
    const handleSaveManualAddress = () => {
        if (location) {
            setLocation({
                ...location,
                address: manualAddress,
                isManuallyEdited: true
            })
        }
        setIsEditingAddress(false)
    }

    useEffect(() => {
        // Redirect if no image or results
        if (!uploadedImage || !analysisResults) {
            navigate('/detect')
        }
    }, [uploadedImage, analysisResults, navigate])

    const getLocation = () => {
        setIsGettingLocation(true)
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude, accuracy } = position.coords
                    let address = "Address not found"

                    try {
                        // Reverse Geocoding via Nominatim
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                        const data = await response.json()
                        address = data.display_name || address
                    } catch (error) {
                        console.error("Geocoding fetch error:", error)
                    }

                    setLocation({
                        latitude: latitude.toFixed(6),
                        longitude: longitude.toFixed(6),
                        accuracy: accuracy.toFixed(0),
                        timestamp: new Date().toISOString(),
                        address: address
                    })
                    setIsGettingLocation(false)
                },
                (error) => {
                    console.error("GPS Error", error)
                    setIsGettingLocation(false)
                    alert('Unable to retrieve location.')
                },
                { enableHighAccuracy: true }
            )
        } else {
             alert('Geolocation is not supported by your browser')
             setIsGettingLocation(false)
        }
    }

    const getSeverityConfig = (severity) => {
        switch (severity) {
            case 'High':
                return { color: '#dc2626', bg: 'rgba(239, 68, 68, 0.15)', icon: AlertTriangle, label: 'High Severity' }
            case 'Medium':
                return { color: '#d97706', bg: 'rgba(245, 158, 11, 0.15)', icon: Shield, label: 'Medium Severity' }
            default:
                return { color: '#16a34a', bg: 'rgba(34, 197, 94, 0.15)', icon: Info, label: 'Low Severity' }
        }
    }

    if (!analysisResults) return null

    const severityConfig = getSeverityConfig(analysisResults.severity)

    return (
        <main style={{ minHeight: '100vh', background: 'var(--color-bg-gradient)', paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-2xl)' }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                    <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: 'var(--space-sm)', 
                        background: 'rgba(16, 185, 129, 0.15)', 
                        padding: '0.5rem 1rem', 
                        borderRadius: 'var(--radius-full)',
                        marginBottom: 'var(--space-md)'
                    }}>
                        <CheckCircle size={18} style={{ color: '#059669' }} />
                        <span style={{ color: '#059669', fontWeight: '600' }}>Analysis Complete</span>
                    </div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-text-dark)', marginBottom: 'var(--space-xs)' }}>
                        Issue Detected Successfully
                    </h1>
                    <p style={{ color: 'var(--color-text-medium)' }}>
                        Review the detection below and confirm to create a report
                    </p>
                </div>

                {/* Main Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-xl)', alignItems: 'start' }}>
                    {/* Left: Image with Detection */}
                    <div className="card" style={{ padding: 'var(--space-lg)', overflow: 'hidden' }}>
                        <h3 style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-dark)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                            <Target size={20} style={{ color: 'var(--color-primary)' }} />
                            Detected Issue
                        </h3>
                        <div style={{ 
                            position: 'relative', 
                            borderRadius: 'var(--radius-lg)', 
                            overflow: 'hidden',
                            background: '#f1f5f9'
                        }}>
                            <img 
                                src={uploadedImage} 
                                alt="Analyzed road" 
                                style={{ width: '100%', display: 'block' }}
                                onLoad={(e) => {
                                    // Store natural dimensions for coordinate conversion
                                    e.target.dataset.naturalWidth = e.target.naturalWidth
                                    e.target.dataset.naturalHeight = e.target.naturalHeight
                                }}
                            />
                            {/* Real Bounding Boxes from YOLO Detections */}
                            {analysisResults.detections && analysisResults.detections.map((det, index) => {
                                // YOLO returns xywh (center_x, center_y, width, height) in pixels
                                // We need to convert to percentage for responsive display
                                const [cx, cy, w, h] = det.bbox
                                
                                // Get image natural dimensions from analysisResults or use reasonable defaults
                                // The API returns image_dim in debug_metrics, but we may not have it here
                                // So we calculate percentage based on the detection's area_ratio
                                // Better approach: use the actual image dimensions
                                
                                // Convert center-based to corner-based (top-left)
                                const leftPx = cx - (w / 2)
                                const topPx = cy - (h / 2)
                                
                                // We need image dimensions - use area_ratio to estimate if needed
                                // For now, use percentage of a typical image size or pass through
                                // Best: use data from API's debug_metrics.image_dim
                                
                                // Assuming the image displayed matches the original analyzed image:
                                // Use the detection's area_ratio to help with scaling
                                // For accurate positioning, we need the original image dimensions
                                
                                // Let's use a reasonable approach: 
                                // Get actual image dimensions from API response
                                const imgWidth = analysisResults.imageDimensions?.[0] || 1920
                                const imgHeight = analysisResults.imageDimensions?.[1] || 1080
                                
                                const leftPercent = (leftPx / imgWidth) * 100
                                const topPercent = (topPx / imgHeight) * 100
                                const widthPercent = (w / imgWidth) * 100
                                const heightPercent = (h / imgHeight) * 100
                                
                                // Clamp values to valid percentages
                                const clamp = (val) => Math.max(0, Math.min(val, 100))
                                
                                return (
                                    <div 
                                        key={index}
                                        style={{
                                            position: 'absolute',
                                            top: `${clamp(topPercent)}%`,
                                            left: `${clamp(leftPercent)}%`,
                                            width: `${clamp(widthPercent)}%`,
                                            height: `${clamp(heightPercent)}%`,
                                            border: '3px solid #ef4444',
                                            borderRadius: '4px',
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            pointerEvents: 'none'
                                        }}
                                    >
                                        <div style={{
                                            position: 'absolute',
                                            top: '-24px',
                                            left: '0',
                                            background: '#ef4444',
                                            color: 'white',
                                            padding: '2px 8px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            borderRadius: '4px',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {det.class} ({(det.confidence * 100).toFixed(0)}%)
                                        </div>
                                    </div>
                                )
                            })}
                            {/* Fallback: Show a message if no detections */}
                            {(!analysisResults.detections || analysisResults.detections.length === 0) && analysisResults.issueType !== 'Normal Road' && (
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    background: 'rgba(0,0,0,0.7)',
                                    color: 'white',
                                    padding: '8px 16px',
                                    borderRadius: '8px'
                                }}>
                                    No bounding box data available
                                </div>
                            )}
                        </div>
                        <p style={{ marginTop: 'var(--space-md)', fontSize: '0.9rem', color: 'var(--color-text-medium)', display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                            <Cpu size={16} />
                            Analyzed by YOLOv8 Computer Vision Model
                        </p>
                    </div>

                    {/* Right: Detection Details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                        {/* Issue Summary Card */}
                        <div className="card" style={{ padding: 'var(--space-lg)' }}>
                            <h3 style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-dark)' }}>Detection Summary</h3>
                            
                            {/* Issue Type */}
                            <div style={{ marginBottom: 'var(--space-lg)' }}>
                                <label style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: 'var(--space-xs)', display: 'block' }}>
                                    Issue Type
                                </label>
                                <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-text-dark)' }}>
                                    {analysisResults.issueType}
                                </div>
                            </div>

                            {/* Severity */}
                            <div style={{ marginBottom: 'var(--space-lg)' }}>
                                <label style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: 'var(--space-xs)', display: 'block' }}>
                                    Severity Level
                                </label>
                                <div style={{ 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    gap: 'var(--space-sm)',
                                    padding: '0.5rem 1rem',
                                    borderRadius: 'var(--radius-full)',
                                    background: severityConfig.bg,
                                    color: severityConfig.color,
                                    fontWeight: '600'
                                }}>
                                    <severityConfig.icon size={18} />
                                    {severityConfig.label}
                                </div>
                            </div>

                            {/* Confidence */}
                            <div style={{ marginBottom: 'var(--space-lg)' }}>
                                <label style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: 'var(--space-xs)', display: 'block' }}>
                                    AI Confidence
                                </label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                                    <div style={{ flex: 1, height: '8px', background: 'var(--color-bg-medium)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                                        <div style={{ 
                                            width: `${analysisResults.confidence}%`, 
                                            height: '100%', 
                                            background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
                                            borderRadius: 'var(--radius-full)'
                                        }}></div>
                                    </div>
                                    <span style={{ fontWeight: '700', color: 'var(--color-text-dark)' }}>{analysisResults.confidence}%</span>
                                </div>
                            </div>

                            {/* Explanation */}
                            <div>
                                <label style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: 'var(--space-xs)', display: 'block' }}>
                                    What This Means
                                </label>
                                <p style={{ color: 'var(--color-text-medium)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                    {analysisResults.explanation}
                                </p>
                            </div>
                        </div>

                        {/* Location Card */}
                        <div className="card" style={{ padding: 'var(--space-lg)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-md)' }}>
                                <h3 style={{ color: 'var(--color-text-dark)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                    <MapPin size={20} style={{ color: '#10b981' }} />
                                    Location
                                </h3>
                                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                                    {location && (
                                        <button 
                                            onClick={() => setIsEditingAddress(!isEditingAddress)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: isEditingAddress ? '#ef4444' : 'var(--color-text-medium)',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 'var(--space-xs)'
                                            }}
                                        >
                                            <Edit3 size={14} />
                                            {isEditingAddress ? 'Cancel' : 'Edit'}
                                        </button>
                                    )}
                                    <button 
                                        onClick={getLocation}
                                        disabled={isGettingLocation}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--color-primary)',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 'var(--space-xs)'
                                        }}
                                    >
                                        <Crosshair size={16} />
                                        {isGettingLocation ? 'Locating...' : location ? 'Refresh' : 'Get GPS'}
                                    </button>
                                </div>
                            </div>

                            {location ? (
                                <div>
                                    {isEditingAddress ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                                            <textarea
                                                value={manualAddress}
                                                onChange={(e) => setManualAddress(e.target.value)}
                                                placeholder="Enter or refine the address..."
                                                style={{
                                                    width: '100%',
                                                    minHeight: '80px',
                                                    padding: 'var(--space-sm)',
                                                    borderRadius: 'var(--radius-md)',
                                                    border: '1px solid var(--color-border)',
                                                    fontFamily: 'inherit',
                                                    fontSize: '0.9rem',
                                                    resize: 'vertical',
                                                    background: 'var(--color-bg-light)'
                                                }}
                                            />
                                            <button
                                                onClick={handleSaveManualAddress}
                                                className="btn btn-primary"
                                                style={{ alignSelf: 'flex-end', padding: '0.5rem 1rem' }}
                                            >
                                                Save Address
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <p style={{ fontWeight: '500', color: 'var(--color-text-dark)', marginBottom: 'var(--space-xs)' }}>
                                                {location.address}
                                                {location.isManuallyEdited && (
                                                    <span style={{ 
                                                        marginLeft: 'var(--space-xs)', 
                                                        fontSize: '0.7rem', 
                                                        background: '#dbeafe', 
                                                        color: '#2563eb', 
                                                        padding: '2px 6px', 
                                                        borderRadius: '4px' 
                                                    }}>
                                                        Edited
                                                    </span>
                                                )}
                                            </p>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                                                {location.latitude}, {location.longitude}
                                            </p>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <p style={{ color: 'var(--color-text-medium)', fontSize: '0.95rem' }}>
                                    Click "Get GPS" to capture your current location for the report.
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                            <button 
                                onClick={() => navigate('/detect')}
                                className="btn btn-secondary"
                                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-xs)' }}
                            >
                                <ArrowLeft size={18} />
                                Back
                            </button>
                            <button 
                                onClick={() => navigate('/results')}
                                className="btn btn-primary"
                                style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-xs)' }}
                            >
                                Confirm & Create Report
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Analysis
