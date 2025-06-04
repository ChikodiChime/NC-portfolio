import React from 'react'
import Structure from '../components/layout/Structure'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Skills from '../components/Skills/Skills'
import Portfolio from '../components/Portfolio/Portfolio'
import Contact from '../components/Contact/Contact'

const Home = () => {
  return (
    <Structure>
      <Hero/>
      <About/>
      <Skills/>
      <Portfolio/>
      <Contact/>
    </Structure>
  )
}

export default Home