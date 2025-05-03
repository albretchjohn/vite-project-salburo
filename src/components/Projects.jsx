"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

// Responsive Background Component that switches between video and image
function ResponsiveBackground({ videoSrc, imageSrc, onEnded }) {
  const videoRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768) // Standard breakpoint for mobile
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Video size adjustment for desktop
  useEffect(() => {
    if (!videoRef.current || isMobile) return

    const setVideoSize = () => {
      if (!videoRef.current) return

      const video = videoRef.current
      const videoRatio = video.videoWidth / video.videoHeight
      const windowRatio = window.innerWidth / window.innerHeight

      if (windowRatio > videoRatio) {
        // Window is wider than video
        video.style.width = "100vw"
        video.style.height = "auto"
      } else {
        // Window is taller than video
        video.style.width = "auto"
        video.style.height = "100vh"
      }
    }

    // Set size initially and on video metadata load
    videoRef.current.addEventListener("loadedmetadata", setVideoSize)

    // Update on window resize
    window.addEventListener("resize", setVideoSize)

    // Call once to set initial size
    if (videoRef.current.readyState >= 1) {
      setVideoSize()
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadedmetadata", setVideoSize)
      }
      window.removeEventListener("resize", setVideoSize)
    }
  }, [isMobile])

  return (
    <div className="background-wrapper">
      {isMobile ? (
        // Image background for mobile
        <div
          className="image-background"
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        />
      ) : (
        // Video background for desktop
        <div className="video-wrapper">
          <video ref={videoRef} autoPlay muted playsInline onEnded={onEnded} className="video-background">
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  )
}

const projectsData = [
  {
    id: 1,
    title: "Color Blind Test",
    description: "A website that tests for color blindness using Ishihara plates",
    image: "/CBT.png",
    websiteUrl: "https://albretchjohn.github.io/cbGithub/",
  },
  {
    id: 2,
    title: "Calculator App",
    description: "A scientific calculator built with React",
    image: "/Calculator.png",
    websiteUrl: "https://malbacias-salburo.netlify.app/",
  },
  {
    id: 3,
    title: "Pokedex",
    description: "A pokedex app that fetches data from the PokeAPI",
    image: "/PokeDex.JPG",
    websiteUrl: "https://albretchdex.netlify.app/",
  },
]

export default function Projects() {
  const [videoEnded, setVideoEnded] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [blinkSettings, setBlinkSettings] = useState([])

  const handleVideoEnd = () => {
    setVideoEnded(true)
  }

  // Fade in content after video ends or immediately on mobile
  useEffect(() => {
    const isMobile = window.innerWidth <= 768

    if (videoEnded || isMobile) {
      const timer = setTimeout(
        () => {
          setShowContent(true)
        },
        isMobile ? 500 : 1000,
      ) // Faster transition on mobile
      return () => clearTimeout(timer)
    }
  }, [videoEnded])

  // Generate random blinking settings after content is shown
  useEffect(() => {
    if (showContent) {
      const settings = projectsData.map(() => {
        const delay = (Math.random() * 4).toFixed(2) // 0–4s
        const duration = (10 + Math.random() * 5).toFixed(2) // 10-15s
        return { delay, duration }
      })
      setBlinkSettings(settings)
    }
  }, [showContent])

  return (
    <div className="page-container">
      {/* Responsive Background - Use a still frame from the video as the mobile image */}
      <ResponsiveBackground
        videoSrc="DnD.mp4"
        imageSrc="sleep.jpg" // Create this image as a screenshot from your video
        onEnded={handleVideoEnd}
      />

      {/* Foreground Content */}
      <div
        className={`content-container transition-opacity duration-1000 ease-in-out ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-4xl font-bold mb-8">My Projects</h1>
        <p className="text-xl mb-10 max-w-2xl text-center">
          Here's what I've been working on. Click on any project to see it in action.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className="bg-blue-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
              style={
                showContent
                  ? {
                      animation: `fadeBlink ${blinkSettings[index]?.duration || 5}s ease-in-out ${blinkSettings[index]?.delay || 0}s infinite`,
                    }
                  : {}
              }
            >
              <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=200&width=300"
                    }}
                  />
                  <div className="absolute inset-0 bg-blue-900 bg-opacity-30 hover:bg-opacity-0 transition-all duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300">{project.description}</p>
                  <p className="text-blue-300 mt-3">Click to visit website →</p>
                </div>
              </a>
            </div>
          ))}
        </div>

        <Link
          to="/"
          className="mt-12 bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Back to Home
        </Link>
      </div>

      {/* 🔧 CSS Keyframes for blinking */}
      <style>{`
        @keyframes fadeBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.1; } /* fades out almost fully */
        }
        
        .page-container {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
        }
        
        .background-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        
        .video-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .video-background {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          z-index: -1;
        }
        
        .content-container {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem;
          color: white;
        }
      `}</style>
    </div>
  )
}
