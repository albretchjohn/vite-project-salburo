"use client"

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import "./App.css"
import "./global.css"
import Projects from "./components/Projects"
import "./components/Hero.css"
import { useEffect, useRef, useState } from "react"

// Video Background Component
function VideoBackground({ src }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (!videoRef.current) return

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
  }, [])

  return (
    <div className="video-wrapper">
      <video ref={videoRef} autoPlay muted loop playsInline className="video-background">
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

// Responsive Background Component that switches between video and image
function ResponsiveBackground({ videoSrc, imageSrc }) {
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
          <video ref={videoRef} autoPlay muted loop playsInline className="video-background">
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <Link to="/" className="mt-4 text-blue-500 underline">
        Go back to Home
      </Link>
    </div>
  )
}

function Home() {
  return (
    <div className="page-container">
      {/* Background Video */}
      {/* <VideoBackground src="Drown2.mp4" /> */}
      <ResponsiveBackground
        videoSrc="Drown2.mp4"
        imageSrc="sleep.jpg" // Create this image as a screenshot from your video
      />

      {/* Foreground Content */}
      <div className="content-container">
        {/* Hero Section */}
        <div className="text-center">
          <img src="/Makoto.jpg" alt="Albretch" className="w-64 h-64 rounded-full" />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Hello, I'm Albretch</h1>
          <p className="text-base font-bold mb-5">Fullstack Developer | React Enjoyer</p>
          <Link
            to="/projects"
            className="bg-white text-blue-900 px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition"
          >
            See what I'm working on
          </Link>
        </div>

        {/* About Me Section */}
        <div className="mt-10 max-w-lg text-center">
          <h2 className="text-2xl font-bold mb-2">About Me</h2>
          <p className="font-bold mb-4">
            My skills include just about everything you ask of me, I could probably do it if I put my mind into it.
          </p>
          <Link
            to="/blog"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Read My Blog
          </Link>
        </div>

        {/* Goals Section */}
        <div className="mt-10 max-w-lg text-center">
          <h2 className="text-2xl font-bold mb-2">Goals</h2>
          <p className="font-bold">Be the best I can be at whatever it is I do.</p>
        </div>
      </div>
    </div>
  )
}

const galleryImages = [
  {
    id: 1,
    src: "My_first_program.JPG",
    alt: "My First Coding Assignment",
    title: "My First Coding Assignment",
    description:
      "This was my first coding assignment in college. I remember feeling so proud when I got it to work! Even though it was just a simple program.",
  },
  {
    id: 2,
    src: "Basics.JPG",
    alt: "Online GDB",
    title: "Online GDB",
    description:
      "Online GDB was where I learned the basics of programming. I spent countless hours debugging my code and learning new concepts.",
  },
  {
    id: 3,
    src: "Tutor.jpg",
    alt: "Team Collaboration",
    title: "Tutor",
    description:
      "My tutor was a great mentor. He guided me through my first projects and helped me understand the importance of clean code and best practices.",
  },
  {
    id: 4,
    src: "VB.net.JPG",
    alt: "Sir Go",
    title: "VB.net",
    description:
      "VB.net was my the first programming language that taught me the fundamentals of database management and GUI design.",
  },
  {
    id: 5,
    src: "RMC.JPG",
    alt: "RMC",
    title: "Rate My Carinderia",
    description:
      "Rate my Carinderia was my first web project. We built it using Python Django. It was a simple mock web app that allowed users to rate and review local eateries.",
  },
  {
    id: 6,
    src: "PhpmyAdmin.JPG",
    alt: "PhpmyAdmin",
    title: "phpMyAdmin",
    description:
      "phpMyAdmin was a game changer for me. It made managing databases so much easier. I learned how to create, read, update, and delete records using SQL.",
  },
  {
    id: 7,
    src: "Obra.JPG",
    alt: "Obra",
    title: "Obra",
    description:
      "Obra is an e-commerce platform I worked on. It was a challenging project that taught me a lot about my inadequacies in web development. specifically in the UI/UX department.",
  },
  {
    id: 8,
    src: "Wellness.JPG",
    alt: "Wellness App",
    title: "Wellness Web App",
    description:
      "WMSU Wellness Web App was a project I worked on as my Software Engineering project. It was a web app that tracked the user's weight loss journey with professional help from the WMSU faculty.",
  },
  {
    id: 9,
    src: "CBT.png",
    alt: "CBT",
    title: "Color Blind Test Web App",
    description: "I made a color blind test app that uses Ishihara plates as my Capstone project.",
  },
]

// New Blog Page Component with Photo Gallery and Pagination
function Blog() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const imagesPerPage = 9

  const totalPages = Math.ceil(galleryImages.length / imagesPerPage)

  const indexOfLastImage = currentPage * imagesPerPage
  const indexOfFirstImage = indexOfLastImage - imagesPerPage
  const currentImages = galleryImages.slice(indexOfFirstImage, indexOfLastImage)

  const openModal = (image) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="page-container">
      {/* Responsive Background - Use a still frame from the video as the mobile image */}
      <VideoBackground src="water.mp4" />

      {/* Blog Content */}
      <div className="content-container py-12">
        <div className="max-w-4xl mx-auto bg-blue-900 bg-opacity-80 p-8 rounded-xl shadow-xl">
          <h1 className="text-4xl font-bold mb-6 text-center">My Blog</h1>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="mb-4">
              Hello! I'm Albretch, a passionate fullstack developer and I try to bring my own spice in my projects.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">My Journey</h2>
            <p className="mb-4">
              I've worked on various projects, from simple websites to complex applications, always striving to improve
              my skills and learn new technologies along the way.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">My Skills</h2>
            <p className="mb-4">
              My skills include just about everything you ask of me, I could probably do it if I put my mind into it. I
              mostly specialize in backend skills such as:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Data Structuring</li>
              <li>Backend development</li>
              <li>Database design and management</li>
              <li>Debugging backend problems</li>
              <li>API</li>
              <li>Server management</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">My Philosophy</h2>
            <p className="mb-4">
              It took me a while to realize, that I can never learn everything. To put it into perspective, The tech
              industry is as vast as the universe, and we who specialize in tech only travel and study it.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">When I'm Not Coding</h2>
            <p className="mb-4">Thinking about life and being philosophical.</p>

            {/* Photo Gallery Section */}
            <h2 className="text-2xl font-bold mt-12 mb-6">Photo Gallery</h2>
            <p className="mb-6">
              Here are some snapshots from my journey as a developer. It's funny how a single image can tell a story or
              evoke a memory. I hope you enjoy this little gallery of my experiences from the moment I started until
              today.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {currentImages.map((image) => (
                <div
                  key={image.id}
                  className="bg-blue-800 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                  onClick={() => openModal(image)}
                >
                  <div className="relative h-48">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=200&width=300"
                        e.target.alt = "Image placeholder"
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-lg truncate">{image.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination - Only show if there are more than 9 images */}
            {galleryImages.length > imagesPerPage && (
              <div className="pagination-container mt-8 flex justify-center items-center">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-l-md ${
                    currentPage === 1 ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  } text-white font-medium transition-colors`}
                >
                  Previous
                </button>

                <div className="flex mx-1">
                  {/* Show page numbers */}
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 mx-1 ${
                        currentPage === index + 1
                          ? "bg-blue-800 text-white font-bold"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      } transition-colors`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-r-md ${
                    currentPage === totalPages ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  } text-white font-medium transition-colors`}
                >
                  Next
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition inline-block"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-blue-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                className="w-full max-h-[60vh] object-contain"
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=400&width=600"
                  e.target.alt = "Image placeholder"
                }}
              />
              <button
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full flex items-center justify-center"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<NotFound />} />
        {/* Add routes for individual projects */}
        <Route
          path="/calculator"
          element={
            <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
              <h1 className="text-4xl font-bold mb-6">Scientific Calculator</h1>
              {/* <ScientificCalculator /> */}
              <p>Calculator component would be rendered here</p>
              <Link to="/projects" className="mt-6 bg-blue-800 text-white px-4 py-2 rounded-lg">
                Back to Projects
              </Link>
            </div>
          }
        />
        <Route
          path="/weather"
          element={
            <div className="min-h-screen bg-blue-800 text-white flex flex-col items-center justify-center p-6">
              <h1 className="text-4xl font-bold mb-6">Weather App</h1>
              <p>Weather App would be rendered here</p>
              <Link to="/projects" className="mt-6 bg-white text-blue-900 px-4 py-2 rounded-lg">
                Back to Projects
              </Link>
            </div>
          }
        />
        <Route
          path="/tasks"
          element={
            <div className="min-h-screen bg-blue-800 text-white flex flex-col items-center justify-center p-6">
              <h1 className="text-4xl font-bold mb-6">Task Manager</h1>
              <p>Task Manager would be rendered here</p>
              <Link to="/projects" className="mt-6 bg-white text-blue-900 px-4 py-2 rounded-lg">
                Back to Projects
              </Link>
            </div>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
