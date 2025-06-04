import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firestore';
import { FaGithub, FaLink, FaArrowLeft, FaYoutube } from 'react-icons/fa6';
import { FaDesktop, FaMobile, FaGamepad } from 'react-icons/fa';

const GameDetails = () => {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { gameId } = useParams();

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setLoading(true);
        const gameDoc = await getDoc(doc(db, 'games', gameId));
        
        if (gameDoc.exists()) {
          setGame({ id: gameDoc.id, ...gameDoc.data() });
        } else {
          setError('Game not found');
        }
      } catch (err) {
        console.error('Error fetching game details:', err);
        setError('Failed to load game details');
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  // Helper function to extract YouTube video ID from various YouTube URL formats
  const getYoutubeVideoId = (url) => {
    if (!url) return null;
    
    // Match patterns like:
    // - https://www.youtube.com/watch?v=VIDEO_ID
    // - https://youtu.be/VIDEO_ID
    // - https://youtube.com/embed/VIDEO_ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Platform icon selector
  const getPlatformIcon = (platform) => {
    const platformLower = platform.toLowerCase();
    if (platformLower.includes('web') || platformLower.includes('pc')) {
      return <FaDesktop className="text-xl" />;
    } else if (platformLower.includes('mobile') || platformLower.includes('android') || platformLower.includes('ios')) {
      return <FaMobile className="text-xl" />;
    } else {
      return <FaGamepad className="text-xl" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="text-green text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <Link to="/" className="flex items-center gap-2 text-green hover:text-green/80 transition-colors">
          <FaArrowLeft /> Return to Homepage
        </Link>
      </div>
    );
  }

  // Get YouTube video ID if videoLink exists
  const youtubeVideoId = game.videoLink ? getYoutubeVideoId(game.videoLink) : null;

  return (
    <div className="min-h-screen bg-black text-white py-16 px-5 md:px-16 xl:px-24">
      {/* Back button */}
      <Link 
        to="/" 
        className="flex items-center gap-2 text-green hover:text-green/80 transition-colors mb-8"
      >
        <FaArrowLeft /> Back
      </Link>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image section */}
          <div className="relative rounded-lg overflow-hidden h-64 md:h-96 lg:h-full">
            {game.img ? (
              <img 
                src={game.img} 
                alt={game.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-white/10 flex items-center justify-center">
                <span className="text-white/50">No image available</span>
              </div>
            )}
            <div className="absolute top-0 right-0 p-3 bg-black/70 rounded-bl-lg">
              <div className="flex items-center">
                <span className={`w-3 h-3 rounded-full mr-2 ${game.completed ? 'bg-green' : 'bg-yellow-500'}`}></span>
                <span className="text-sm">{game.completed ? 'Completed' : 'In Progress'}</span>
              </div>
            </div>
          </div>
          
          {/* Details section */}
          <div className="bg-white/5 rounded-lg p-6 md:p-8">
            <h1 className="text-green text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{game.title}</h1>
            
            {/* Platform */}
            <div className="flex items-center mb-6">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                {getPlatformIcon(game.platform)}
                <span>{game.platform}</span>
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-green text-xl mb-3">Description</h2>
              <p className="text-white/80 leading-relaxed">
                {game.description || "No description available."}
              </p>
            </div>
            
            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {game.githubLink && (
                <a 
                  href={game.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green text-black font-medium px-6 py-3 rounded-lg hover:bg-green/80 transition-colors"
                >
                  <FaGithub className="text-xl" />
                  View Source
                </a>
              )}
              
              {game.gameLink && (
                <a 
                  href={game.gameLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 text-green border border-green px-6 py-3 rounded-lg hover:bg-green/10 transition-colors"
                >
                  <FaLink className="text-xl" />
                  Play Game
                </a>
              )}
              
              {game.videoLink && !youtubeVideoId && (
                <a 
                  href={game.videoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 text-green border border-green px-6 py-3 rounded-lg hover:bg-green/10 transition-colors"
                >
                  <FaYoutube className="text-xl" />
                  Watch Video
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* YouTube Video Section - Only display if videoLink exists and we could parse a valid YouTube ID */}
        {youtubeVideoId && (
          <div className="mt-12 bg-white/5 rounded-lg p-6 md:p-8">
            <h2 className="text-green text-2xl mb-6">Gameplay Video</h2>
            <div className="aspect-w-16 aspect-h-9">
              <div className="w-full relative pt-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                  title={`${game.title} gameplay video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetails;