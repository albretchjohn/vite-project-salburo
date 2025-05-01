import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import "./App.css"
import "./global.css"
import Projects from "./components/Projects"
import './components/Hero.css';
// import ScientificCalculator from './components/ScientificCalculator'

function Home() {
  return (
    <div className="bg-blue-800 text-white min-h-screen flex flex-col items-center justify-center p-6 rounded-2xl">
      {/* Hero Section */}
      <div className="text-center">
        <img src="/Makoto.jpg" alt="Albretch" className="w-64 h-64 rounded-full" />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Hello, I'm Albretch</h1>
        <p className="text-base mb-5">Fullstack Developer | React Enjoyer</p>
        <Link
          to="/projects"
          className="bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          See what I'm working on
        </Link>
      </div>

      {/* About Section */}
      <div className="mt-10 max-w-lg text-center">
        <h2 className="text-2xl font-semibold mb-2">About Me</h2>
        <p className="text-gray-300">
          My skills include just about everything you ask of me, I could probably do it if I put my mind into it.
        </p>

        <h2 className="text-2xl font-semibold mt-5">Goals</h2>
        <p className="text-gray-300">Be the best I can be at whatever it is I do.</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
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
