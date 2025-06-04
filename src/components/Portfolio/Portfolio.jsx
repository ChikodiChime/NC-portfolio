import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../../firestore";
import { FaGithub, FaLink, FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "games"));
      const fetchedGames = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGames(fetchedGames);
    } catch (error) {
      console.error("Error fetching games:", error);
      toast.error("Failed to load games");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const completedGames = games.filter((game) => game.completed);
  const inProgressGames = games.filter((game) => !game.completed);

  const ProjectCard = ({ project, isCompleted }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0c291c] to-black shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {project.img ? (
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white text-4xl font-bold opacity-50">
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                isCompleted ? "bg-green text-white" : "bg-yellow-500 text-black"
              }`}
            >
              {isCompleted ? "Completed" : "In Progress"}
            </span>
          </div>

          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              isHovered ? "opacity-60" : "opacity-0"
            }`}
          />

          {/* Action Buttons */}
          <div
            className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300 ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <button
              onClick={() => (window.location.href = `/games/${project.id}`)}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-colors"
            >
              <FaEye className="text-lg" />
            </button>
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-colors"
              >
                <FaGithub className="text-lg" />
              </a>
            )}
            {project.gameLink && (
              <a
                href={project.gameLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-colors"
              >
                <FaLink className="text-lg" />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-white text-lg font-bold mb-2 line-clamp-1">
            {project.title}
          </h3>
          {/* {project.description && (
            <p className="text-gray-300 text-sm line-clamp-2 mb-3">
              {project.description}
            </p>
          )} */}

          {/* Bottom Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => (window.location.href = `/games/${project.id}`)}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              View Details →
            </button>
            <div className="flex gap-2">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaGithub className="text" />
                </a>
              )}
              {project.gameLink && (
                <a
                  href={project.gameLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaLink className="text" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProjectSection = ({ title, projects, bgColor, accentColor }) => (
    <div className={`w-full ${bgColor} rounded-2xl p-6 md:p-8`}>
      <div className="flex items-center justify-between mb-6">
        <h4 className={`text-2xl md:text-3xl font-bold ${accentColor}`}>
          {title}
        </h4>
        <span
          className={`${accentColor} text-sm font-medium px-3 py-1 rounded-full border border-current`}
        >
          {projects.length} Projects
        </span>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isCompleted={title.includes("Completed")}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-gray-400 text-2xl">📁</span>
          </div>
          <p className="text-gray-400 text-lg">No projects yet</p>
          <p className="text-gray-500 text-sm mt-1">
            {title.includes("Completed")
              ? "Completed projects will appear here"
              : "Projects in development will appear here"}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="min-h-screen   bg-white/5 py-16 px-4 md:px-8 lg:px-16"
      id="Portfolio"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          My <span className="text-green-400">Portfolio</span>
        </h2>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
          Explore my latest projects and ongoing work
        </p>
      </div>

      {/* Portfolio Sections */}
      <div className="max-w-7xl mx-auto space-y-8">
        <ProjectSection
          title="Completed Projects"
          projects={completedGames}
          bgColor="bg-white/5 backdrop-blur-sm border border-green"
          accentColor="text-green-400"
        />

        <ProjectSection
          title="Work in Progress"
          projects={inProgressGames}
          bgColor="bg-white/5 backdrop-blur-sm border border-green"
          accentColor="text-yellow-400"
        />
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
          View All Projects
        </button>
      </div>
    </div>
  );
};

export default Portfolio;
