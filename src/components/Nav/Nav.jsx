import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBarsStaggered, FaX } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  
  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Close the menu if it's open
      setIsOpen(false);
      
      // Calculate offset to account for fixed navbar height
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      // Smooth scroll to the section
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className={`fixed w-full z-50 py-4 px-6 md:px-20 transition-all duration-300 ${
      scrolled ? 'bg-black shadow-lg' : 'bg-black/80 backdrop-blur-lg'
    }  border-gray-800`}>
      <div className="h-full w-full flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl md:text-[42px] font-bold relative">
          <Link to='/' className="text-white hover:text-green transition-colors duration-300">
            <span className="relative z-10">CHIDERA NWOSU</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-green transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center uppercase text-sm ">
          {['About', 'Skills', 'Portfolio', 'Contact'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item)}
              className="text-gray-300 hover:text-white relative group overflow-hidden cursor-pointer bg-transparent border-none"
            >
              <span>{item}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={handleClick} 
          className="md:hidden flex text-white hover:text-green transition-colors duration-300"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <FaX className="text-2xl" />
          ) : (
            <FaBarsStaggered className="text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay - Drops from top */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 w-full h-screen backdrop-blur-sm z-40 top-[70px] md:hidden"
              onClick={handleClick}
            />
            
            <motion.div 
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "stagger", duration: 0.4 }}
              className="fixed top-[70px] left-0 right-0 bg-gradient-to-b from-black to-[#021309] z-50 md:hidden p-6 pt-10 shadow-lg"
            >
              <div className="flex flex-col space-y-6 items-center text-center">
                {['About', 'Skills', 'Portfolio', 'Contact'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <button 
                      className="text-lg uppercase text-gray-200 hover:text-purple-400 transition-all duration-300 px-4 py-2 block cursor-pointer bg-transparent border-none w-full"
                      onClick={() => scrollToSection(item)}
                    >
                      {item}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;