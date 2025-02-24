import { useState } from 'react'
import './App.css'
import Hero from './components/Hero.jsx';
import './global.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <div>
      <h1 className="text-4xl font-bold italic text-red-900">Wait lang sir may error yung tailwind I will design it better later</h1>
      <Hero />
      
    </div>
    
  )
}

export default App
