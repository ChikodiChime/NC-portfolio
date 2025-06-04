import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import About from './pages/About';
import Skills from './pages/Skills';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import AddGames from './pages/AddGames';
import PortfolioDetails from './pages/PortfolioDetail';

function App() {
  return(
    <Router>
      <Toaster
      position="top-center"
      />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/Skills" element={<Skills />} />
      <Route path="/Portfolio" element={<Portfolio />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Add-Game" element={<AddGames />} />
      <Route path="/games/:gameId" element={<PortfolioDetails />} />
    </Routes>
  </Router>
  )
  
};

export default App;
