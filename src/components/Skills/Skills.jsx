import React from 'react'

const Skills = () => {
  return (
    <>
    <div className="p-16" id="Skills">
      <h3 className='text-green  text-center pb-5 uppercase'>Skills</h3>
      <div className=" grid gap-10 justify-center grid-cols-2 md:grid-cols-3  lg:grid-cols-6 w-full items-center">
        <img width={150} height={100} className=' object-contain'  src="/unity.png" alt="unity" />
        <img width={100} height={100} className=' object-contain'  src="/c-sharp.png" alt="c-sharp" />
        <img width={100} height={100} className=' object-contain'  src="/git.png" alt="git" />
        <img width={200} height={100} className=' object-contain'  src="/Daz3d.png" alt="Daz3d" />
        <img width={150} height={100} className=' object-contain'  src="/fmod.png" alt="fmod" />
        <img width={150} height={100} className=' object-contain'  src="/math.png" alt="math" />
      </div>
    </div>
    </>
  )
}

export default Skills