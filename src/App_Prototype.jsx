import { useState } from 'react'
import './App.css'
import Hero from './components/Hero.jsx';
import './global.css';
// import ScientificCalculator from './components/ScientificCalculator';

function App() {
  const [count, setCount] = useState(0)

  return (
    
<div className="bg-blue-800 text-white min-h-screen flex flex-col items-center justify-center p-6 rounded-2xl">
      {/* Hero Section */}
      <div className="text-center">
      <img src="/Makoto.jpg" alt="Depressed Kid" className="w-64 h-64 rounded-full" />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Hello, I'm Albretch</h1>
        <p className="text-base mb-5">Fullstack Developer | React Enjoyer</p>
        <a href="#contact" className="bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
          See what I'm working on
        </a>
      </div>

      {/* About Section */}
      <div className="mt-10 max-w-lg text-center">
        <h2 className="text-2xl font-semibold mb-2">About Me</h2>
        <p className="text-gray-300">
          My skills include just about everything you ask of me, I could probably do it if I put my mind into it.
        </p>


        <h2 className="text-2xl font-semibold mt-5">Goals</h2>
        <p className="text-gray-300">
          Be the best I can be at whatever it is I do.
        </p>



      </div>
    </div>
    
  )
}


// function App() {
//   return (
//     <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
//       <h1 className="text-4xl font-bold mb-6">Scientific Calculator</h1>
//       <ScientificCalculator />
//     </div>
//   );
// }

export default App
