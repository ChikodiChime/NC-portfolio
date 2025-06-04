import React from 'react'

const About = () => {
  return (
    <>
    <div  className="py-16 px-5  md:px-24 bg-white/10" id='About'>
    <div className="bg-black py-10 px-5 md:p-10  rounded-md text-center">
        <h3 className='text-green mb-5  uppercase '> About Me</h3>
        {/* <div className="w-[100px] h-1  bg-white"></div> */}

        <div className="flex lg:flex-row mb-10 flex-col gap-10 text-justify pb-5 text-white/80 font-light">
            <p className='lg:w-1/2 leading-loose'>
            <span className='text-3xl font-bold text-green ' >I'm</span>  a driven gameplay programmer and game designer with a passion for crafting immersive experiences that resonate with players on a deeper level. I believe that games have the power to tell meaningful stories, preserve cultural heritage, and connect us in ways that transcend borders and boundaries.

            <p className='leading-loose'>
                With a strong foundation in Unity Engine, C# programming, and Git collaboration tools, I bring a technical expertise that enables me to bring my creative vision to life. My core knowledge in mathematics and physics provides a solid basis for crafting engaging gameplay mechanics and realistic simulations.
            </p>

        </p>
        <p className='lg:w-1/2'>
            <p className='leading-loose'>
                But what sets me apart is my insatiable curiosity and love for learning. I thrive in environments that encourage experimentation, creativity, and growth. I'm always seeking new ways to solve complex problems, and I'm not afraid to ask questions or seek guidance when needed.

            </p>
            <p className='leading-loose'>
                My greatest strength, however, is my ability to connect with others and leave a lasting impact on the teams I work with. I believe in building strong relationships, fostering open 
                communication, and contributing to a positive and inclusive work environment.

            </p>

            <p>Let's create something amazing together</p>
        </p>
        </div>
        <a href='/Chidera-Nwosu-Resume.pdf' download className='bg-green text-black font-bold px-10 py-4 mt-10 rounded-lg  '>Download CV</a>
        
    </div>
        
        
    </div>
    </>
  )
}

export default About