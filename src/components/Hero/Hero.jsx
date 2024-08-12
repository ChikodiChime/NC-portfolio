import React from 'react'
import {useTypewriter, Cursor} from 'react-simple-typewriter'
const Hero = () => {
const [text] = useTypewriter({
    words: ['Programmer', 'Designer'],
    loop: {},
    typeSpeed: 120,
    deleteSpeed: 80
})

  return (
    <>
        <div className='flex justify-center items-center flex-col gap-5 lg:flex-row lg:justify-between px-20 w-full h-screen '>
            <div className="left">
                <h1 className=' leading-none'>
                    GamePlay <br />
                     <span className='text-green'>
                        {text}
                    </span>
                    <span className='text-green'>
                        <Cursor/>
                    </span>
                </h1>
            </div>
            <div className="right">
                <img src='/boy.png' alt="boy" width={450} height={450}/>
            </div>
        </div>
    </>
  )
}

export default Hero