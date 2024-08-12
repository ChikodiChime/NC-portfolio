import React from 'react'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'

const Structure = ({children}) => {
  return (
    <>
    <Nav/>
    {children}
    <Footer/>
    </>

  )
}

export default Structure