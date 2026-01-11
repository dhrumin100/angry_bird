import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Upload,
    Camera,
    Image as ImageIcon,
    X,
    Cpu,
    ArrowRight,
    RefreshCw
} from 'lucide-react'

function Detect({ uploadedImage, setUploadedImage, setAnalysisResults }) {
    const [isDragOver, setIsDragOver] = useState(false)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysisProgress, setAnalysisProgress] = useState(0)
    const [fileName, setFileName] = useState('upload.jpg') // Preserve original filename
    const fileInputRef = useRef(null)
    const navigate = useNavigate()

    const handleDragOver = useCallback((e) => {
        e.preventDefault()
        setIsDragOver(true)
    }, [])

    const handleDragLeave = useCallback((e) => {
        e.preventDefault()
        setIsDragOver(false)
    }, [])

    const handleDrop = useCallback((e) => {
        e.preventDefault()
        setIsDragOver(false)

        const file = e.dataTransfer.files[0]
        if (file && file.type.startsWith('image/')) {
            processFile(file)
        }
    }, [])

    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        if (file) {
            processFile(file)
        }
    }

    const processFile = (file) => {
        setFileName(file.name) // Save original name
        const reader = new FileReader()
        reader.onload = (e) => {
            setUploadedImage(e.target.result)
        }
        reader.readAsDataURL(file)
    }

    const clearImage = () => {
        setUploadedImage(null)
        setAnalysisResults(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const analyzeImage = async () => {
        setIsAnalyzing(true)
        setAnalysisProgress(0)

        // Progress simulation for UX
        const progressInterval = setInterval(() => {
            setAnalysisProgress(prev => {
                if (prev >= 90) {
                    return prev // Cap at 90 until API responds
                }
                return prev + Math.random() * 10
            })
        }, 300)

        try {
            // Convert base64 to Blob for FormData
            const base64Response = await fetch(uploadedImage)
            const blob = await base64Response.blob()
            
            const formData = new FormData()
            formData.append('image', blob, fileName) // Use preserved name instead of 'upload.jpg'
            formData.append('conf_threshold', '0.25')
            formData.append('iou_threshold', '0.70')

            const AI_API_URL = import.meta.env.VITE_AI_API_URL || 'http://localhost:8000';
            const response = await fetch(`${AI_API_URL}/analyze-image`, {
                method: 'POST',
                body: formData
            })

            clearInterval(progressInterval)
            setAnalysisProgress(100)

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`)
            }

            const result = await response.json()

            if (result.success) {
                const analysis = result.analysis
                // Map API response to frontend format
                const mappedResults = {
                    issueType: analysis.issue_type === 'pothole' ? 'Pothole' : 'Normal Road',
                    confidence: Math.round(analysis.confidence * 100),
                    severity: analysis.severity.charAt(0).toUpperCase() + analysis.severity.slice(1), // Capitalize
                    boundingBox: analysis.detections.length > 0 ? {
                        x: analysis.detections[0].bbox[0],
                        y: analysis.detections[0].bbox[1],
                        width: analysis.detections[0].bbox[2],
                        height: analysis.detections[0].bbox[3]
                    } : null,
                    explanation: analysis.explanation, // This is now from Groq!
                    timestamp: analysis.detected_at,
                    boxCount: analysis.box_count,
                    detections: analysis.detections,
                    imageDimensions: result.debug_metrics?.image_dim || [1920, 1080] // [width, height]
                }

                setAnalysisResults(mappedResults)
                setIsAnalyzing(false)
                navigate('/analysis')
            } else {
                throw new Error(result.error || 'Analysis failed')
            }

        } catch (error) {
            clearInterval(progressInterval)
            console.error('Analysis Error:', error)
            setIsAnalyzing(false)
            alert(`Analysis failed: ${error.message}. Make sure the backend is running on port 8000.`)
        }
    }

    return (
        <main className="upload-section">
            <div className="container upload-container">
                <div className="upload-header animate-fadeIn">
                    <h1>Detect Road Issues</h1>
                    <p className="mt-md" style={{ fontSize: '1.1rem' }}>
                        Upload a road image and let our AI analyze it for potholes and damage.
                    </p>
                </div>

                {!uploadedImage ? (
                    <div
                        className={`upload-zone animate-fadeInUp ${isDragOver ? 'dragover' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="upload-zone-icon">
                            <Upload size={36} />
                        </div>
                        <h3 className="upload-zone-title">Drop your image here</h3>
                        <p className="upload-zone-subtitle">
                            or click to browse • Supports JPG, PNG, WEBP
                        </p>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="upload-input"
                        />

                        <div className="flex gap-md justify-center mt-xl" style={{ flexWrap: 'wrap' }}>
                            <div className="badge badge-primary">
                                <ImageIcon size={14} />
                                <span>JPG/PNG</span>
                            </div>
                            <div className="badge badge-primary">
                                <Camera size={14} />
                                <span>Camera</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="animate-scaleIn">
                        <div className="card upload-preview">
                            <img
                                src={uploadedImage}
                                alt="Uploaded road"
                                className="upload-preview-image"
                            />
                        </div>

                        {!isAnalyzing ? (
                            <div className="upload-preview-actions">
                                <button
                                    className="btn btn-secondary"
                                    onClick={clearImage}
                                >
                                    <RefreshCw size={18} />
                                    Change Image
                                </button>
                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={analyzeImage}
                                >
                                    <Cpu size={20} />
                                    Analyze Image
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="analysis-loading card mt-xl">
                                <div className="analysis-loading-icon">
                                    <div className="analysis-loading-circle"></div>
                                    <div className="analysis-loading-inner">
                                        <Cpu size={28} />
                                    </div>
                                </div>
                                <h3>Analyzing Image...</h3>
                                <p className="mt-sm" style={{ color: 'var(--color-text-light)' }}>
                                    YOLOv8 is scanning for road damage
                                </p>
                                <div className="progress-bar mt-lg" style={{ maxWidth: '300px', margin: '0 auto' }}>
                                    <div
                                        className="progress-bar-fill"
                                        style={{ width: `${Math.min(analysisProgress, 100)}%` }}
                                    ></div>
                                </div>
                                <p className="mt-md" style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>
                                    {analysisProgress < 30 && 'Loading model...'}
                                    {analysisProgress >= 30 && analysisProgress < 60 && 'Detecting objects...'}
                                    {analysisProgress >= 60 && analysisProgress < 90 && 'Analyzing severity...'}
                                    {analysisProgress >= 90 && 'Generating report...'}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Tips Section */}
                {!uploadedImage && (
                    <div className="mt-2xl animate-fadeInUp delay-200">
                        <h4 className="text-center mb-lg">Tips for Best Results</h4>
                        <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                            <div className="card" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
                                <Camera size={24} className="text-gold mb-sm" style={{ margin: '0 auto var(--space-sm)' }} />
                                <p style={{ fontSize: '0.9rem' }}>Take photos in good lighting conditions</p>
                            </div>
                            <div className="card" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
                                <ImageIcon size={24} className="text-gold mb-sm" style={{ margin: '0 auto var(--space-sm)' }} />
                                <p style={{ fontSize: '0.9rem' }}>Capture the full pothole in frame</p>
                            </div>
                            <div className="card" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
                                <Cpu size={24} className="text-gold mb-sm" style={{ margin: '0 auto var(--space-sm)' }} />
                                <p style={{ fontSize: '0.9rem' }}>Higher resolution = better detection</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default Detect
