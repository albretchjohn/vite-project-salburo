import { Link } from "react-router-dom"

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
    image: "/tasks-screenshot.jpg",
    websiteUrl: "https://albretchdex.netlify.app/", 
  },
]

export default function Projects() {
  return (
    <div className="bg-blue-800 text-white min-h-screen flex flex-col items-center p-6 rounded-2xl">
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>
      <p className="text-xl mb-10 max-w-2xl text-center">
        Here's what I've been working on. Click on any project to see it in action.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="bg-blue-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            {/* Using regular anchor tag for external links */}
            <a 
              href={project.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
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
  )
}