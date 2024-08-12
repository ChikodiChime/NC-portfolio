import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBarsStaggered } from 'react-icons/fa6';
// import './Navbar.css';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (

    <nav className='w-full h-[100px]  py-4 px-20   bg-black backdrop-blur-lg'>
    <div className="h-full w-full  text-sm flex justify-between items-center ">
        <div className=" text-[42px] leading-7 font-bold lato ">
        <Link to='/'>CHIDERA NWOSU</Link>
        </div>
        <button onClick={handleClick} className='menu-btn hidden'>
        <FaBarsStaggered className='text-2xl cursor-pointer' />
        </button>
        
        {isOpen && <div className="overlay" onClick={handleClick}></div>}
        <div className= {`sideBar ${isOpen && 'active'} flex justify-end items-center gap-10  uppercase text-sm `}>
          <Link className='nav-link' to='#About' >About Me</Link>
          <Link className='nav-link' to='/Skills' >Skills</Link>
          <Link className='nav-link' to='/Portfolio' >Portfolio</Link>
          <Link className='nav-link' to='/Contact' >Contact</Link>
      
        </div>

            

    </div>
</nav>

   
  );
}

export default Nav;
