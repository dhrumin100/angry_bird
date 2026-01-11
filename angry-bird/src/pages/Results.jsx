
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    MapPin,
    Clock,
    Camera,
    Mic,
    CheckCircle,
    ArrowRight,
    HelpCircle,
    Copy,
    Share
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

function Results({ uploadedImage, analysisResults, location, setLocation, resetAnalysis }) {
    const navigate = useNavigate()
    const { addSubmission } = useAuth()

    const [severity, setSeverity] = useState(analysisResults?.severity || 'Medium')
    const [subcategory, setSubcategory] = useState('Large Pothole')
    const [description, setDescription] = useState('')
    const [isGettingLocation, setIsGettingLocation] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submissionSuccess, setSubmissionSuccess] = useState(false)
    const [submittedReport, setSubmittedReport] = useState(null)
    
    // Voice Recognition Hook
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition()

    // Sync transcript with description
    useEffect(() => {
        if (transcript) {
            setDescription(transcript)
        }
    }, [transcript])

    // Initialize state from analysis results
    useEffect(() => {
        if (analysisResults) {
            setSeverity(analysisResults.severity)
            setSubcategory(`${analysisResults.severity} Severity ${analysisResults.issueType}`)
            if (!transcript) {
                setDescription(analysisResults.explanation || '')
            }
        }
    }, [analysisResults, transcript])

    // Safety check: Redirect if no image (but avoid loop if success screen)
    useEffect(() => {
        if (!uploadedImage && !submissionSuccess) {
            navigate('/detect')
        }
    }, [uploadedImage, navigate, submissionSuccess])

    const getLocation = () => {
        setIsGettingLocation(true)
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser')
            setIsGettingLocation(false)
            return
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude, accuracy } = position.coords
                
                try {
                    // Reverse Geocoding using OpenStreetMap Nominatim
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                    const data = await response.json()
                    
                    setLocation({
                        latitude: latitude.toFixed(6),
                        longitude: longitude.toFixed(6),
                        accuracy: accuracy.toFixed(0),
                        timestamp: new Date().toISOString(),
                        address: data.display_name || "Address not found"
                    })
                } catch (error) {
                    console.error("Geocoding Error", error)
                    setLocation({
                        latitude: latitude.toFixed(6),
                        longitude: longitude.toFixed(6),
                        accuracy: accuracy.toFixed(0),
                        timestamp: new Date().toISOString(),
                        address: "Location captured (Address lookup failed)"
                    })
                } finally {
                    setIsGettingLocation(false)
                }
            },
            (error) => {
                console.error("GPS Error", error)
                alert('Unable to retrieve your location. Please check permissions.')
                setIsGettingLocation(false)
            },
            { enableHighAccuracy: true }
        )
    }

    const handleSubmit = async () => {
        setIsSubmitted(true)

        const formattedLocation = location ? {
            lat: location.latitude,
            lng: location.longitude,
            address: location.address
        } : null;

        const reportData = {
            image: uploadedImage,
            issueType: analysisResults.issueType,
            severity: severity,
            description: description,
            location: formattedLocation,
            subCategory: subcategory
        }

        try {
            const result = await addSubmission(reportData)
            if (result) {
                setSubmittedReport(result)
                setSubmissionSuccess(true)
            } else {
                alert('Failed to submit report. Please try again.')
                setIsSubmitted(false)
            }
        } catch (error) {
            console.error(error)
            setIsSubmitted(false)
        }
    }

    const handleVoiceStart = () => {
        if (!browserSupportsSpeechRecognition) {
            alert("Browser doesn't support speech recognition.")
            return
        }
        if (listening) {
            SpeechRecognition.stopListening()
        } else {
            resetTranscript()
            SpeechRecognition.startListening({ continuous: true })
        }
    }

    // --- SUCCESS VIEW ---
    if (submissionSuccess && submittedReport) {
        return (
            <main className="results-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="container" style={{ maxWidth: '600px' }}>
                    <div className="card animate-fadeInUp" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                        <div style={{ 
                            width: '80px', height: '80px', background: '#dcfce7', color: '#16a34a', 
                            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 1.5rem auto'
                        }}>
                            <CheckCircle size={48} />
                        </div>
                        
                        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>
                            Report Submitted!
                        </h1>
                        <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1.1rem' }}>
                            Thank you for being a responsible citizen. We have received your report and notified the authorities.
                        </p>

                        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', textAlign: 'left' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Report ID</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: '#0f172a' }}>
                                    {submittedReport.reportId || submittedReport._id}
                                    <Copy size={14} className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigator.clipboard.writeText(submittedReport.reportId)} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Status</span>
                                <span style={{ background: '#dbeafe', color: '#1e40af', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
                                    {submittedReport.status}
                                </span>
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                                <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }}/>
                                {location?.address || 'Location captured'}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <button className="btn btn-primary" onClick={() => navigate('/my-reports')} style={{ justifyContent: 'center' }}>
                                Track Status <ArrowRight size={18} />
                            </button>
                            <button className="btn btn-secondary" onClick={() => { setSubmissionSuccess(false); resetAnalysis(); navigate('/detect'); }} style={{ justifyContent: 'center' }}>
                                Report Another Issue
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    // --- FORM VIEW ---
    if (!analysisResults) return null

    return (
        <main className="results-section">
            <div className="container">
                <div className="report-form-card animate-fadeInUp">
                    {/* Header */}
                    <div className="report-form-header">
                        <p className="report-form-instruction">
                            We'll use your current GPS location. You can confirm details below.
                        </p>
                    </div>

                    <div className="report-form-content">
                        <div className="report-form-grid">
                            {/* LEFT COLUMN */}
                            <div className="form-col-left">
                                {/* Issue Type */}
                                <div className="form-group">
                                    <label className="form-label">Issue Type</label>
                                    <div className="form-input-readonly">
                                        <Camera size={20} className="text-primary" />
                                        {analysisResults.issueType}
                                    </div>
                                </div>

                                {/* Subcategory */}
                                <div className="form-group">
                                    <label className="form-label">Subcategory</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={subcategory}
                                        onChange={(e) => setSubcategory(e.target.value)}
                                    />
                                </div>

                                {/* Severity */}
                                <div className="form-group">
                                    <label className="form-label">Issue Severity</label>
                                    <div className="severity-selector">
                                        {['Low', 'Medium', 'High'].map((level) => (
                                            <button
                                                key={level}
                                                className={`severity-btn ${level.toLowerCase()} ${severity === level ? 'active' : ''}`}
                                                onClick={() => setSeverity(level)}
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="helper-text">High severity issues get priority attention</p>
                                </div>
                            </div>

                            {/* RIGHT COLUMN */}
                            <div className="form-col-right">
                                {/* Description */}
                                <div className="form-group">
                                    <label className="form-label">Description *</label>
                                    <div className="description-card">
                                        <textarea
                                            className="form-textarea"
                                            placeholder="Describe the issue... (Type or Speak)"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            maxLength={500}
                                        ></textarea>
                                        <div className="textarea-footer">
                                            {description.length}/500 characters
                                        </div>
                                    </div>
                                    <div className="voice-input-row">
                                        <button 
                                            className={`voice-btn ${listening ? 'listening' : ''}`} 
                                            onClick={handleVoiceStart}
                                            style={{ 
                                                background: listening ? 'var(--color-primary-light)' : 'transparent',
                                                color: listening ? 'var(--color-primary)' : 'var(--color-text-medium)',
                                                border: listening ? '1px solid var(--color-primary)' : '1px solid var(--color-border)'
                                            }}
                                        >
                                            <Mic size={16} className={listening ? 'animate-pulse' : ''} />
                                            {listening ? 'Listening...' : 'Speak Description'}
                                        </button>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="location-block">
                                    <div className="location-header">
                                        <label className="form-label" style={{ marginBottom: 0 }}>
                                            Current Location (GPS)
                                        </label>
                                        <div className="location-actions">
                                            <button className="link-btn" onClick={getLocation} disabled={isGettingLocation}>
                                                {isGettingLocation ? 'Locating...' : 'Refresh GPS'}
                                            </button>
                                            <HelpCircle size={16} className="text-light" title="GPS accuracy depends on your device" style={{ cursor: 'help' }} />
                                        </div>
                                    </div>

                                    <div className="address-box">
                                        <MapPin size={24} className="text-success mt-sm" />
                                        <div>
                                            <p style={{ fontWeight: 500, lineHeight: 1.4 }}>
                                                {location?.address || "Location not yet captured (Click Refresh GPS)"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="coords-row">
                                        <div className="coord-text">
                                            Coordinates: {location?.latitude || '--'}, {location?.longitude || '--'}
                                        </div>
                                        <div className="gps-badge">
                                            GPS Location
                                        </div>
                                    </div>
                                </div>

                                {/* Reported At */}
                                <div className="form-group" style={{ marginTop: 'var(--space-lg)' }}>
                                    <label className="form-label">Reported At</label>
                                    <div className="timestamp-box">
                                        <Clock size={20} className="text-primary" />
                                        <span style={{ fontWeight: 500 }}>
                                            {new Date().toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="form-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={resetAnalysis}
                            style={{ borderColor: 'rgba(255, 107, 53, 0.3)' }}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={!location || isSubmitted}
                            style={{ minWidth: '160px' }}
                        >
                            {isSubmitted ? 'Submitting...' : 'Submit Report'}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Results
