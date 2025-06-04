import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  
  const words = ['Programmer', 'Designer'];
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const waitTime = 2000;

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    if (isWaiting) {
      const waitTimer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, waitTime);
      return () => clearTimeout(waitTimer);
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setIsWaiting(true);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, wordIndex, isDeleting, isWaiting, words]);

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 lg:pt-0 bg-black overflow-hidden relative">
      {/* Animated background elements */}
   
      
      {/* Main content container */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">
          
          {/* Left content */}
          <div className="order-1 text-center lg:text-left space-y-6 lg:flex lg:items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-white">
                  <span className="block">
                    GamePlay
                  </span>
                </h1>
                
                {/* Enhanced typewriter section */}
                <div className="relative">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                    <span className="text-green inline-block min-w-[200px] sm:min-w-[250px] md:min-w-[300px] lg:min-w-[350px]">
                      {displayText}
                      <span className="animate-pulse text-green ml-1">|</span>
                    </span>
                  </h2>
                </div>
              </div>
              
              {/* Additional content */}
              <div className="space-y-4 max-w-lg mx-auto lg:mx-0">
                
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={() => scrollToSection('Portfolio')}
                    className="px-8 py-3 bg-green text-black font-semibold rounded-full hover:bg-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    View Projects
                  </button>
                  <button 
                    onClick={() => scrollToSection('Contact')}
                    className="px-8 py-3 border-2 border-green text-green font-semibold rounded-full hover:bg-green hover:text-black transition-all duration-300"
                  >
                    Get in Touch
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right content - Image */}
          <div className="order-2 flex justify-center lg:justify-end items-end lg:self-end">
            <div className="relative group self-end" >
              <div className="relative">
                <img
                  src="/boy1.png"
                  alt="Developer illustration"
                  className=" max-w-3xl h-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating elements around image */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full animate-bounce opacity-80"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-pulse opacity-70"></div>
                <div className="absolute top-1/2 -left-6 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-60"></div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div> */}
    </div>
  );
};

export default Hero;