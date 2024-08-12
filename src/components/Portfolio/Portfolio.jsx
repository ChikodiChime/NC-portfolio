import React from 'react'

const Portfolio = () => {
  return (
    <>
    <div className="p-16 px-24 bg-white/10">
        <h3 className='text-green uppercase text-center pb-5 '>Portfolio</h3>
        <div className="flex justify-center items-center gap-10">
            <div className="completed w-1/2 bg-black rounded-lg p-10">
            <h4 className='text-green text-2xl text-center uppercase lato pb-10 '>Completed Projects</h4>
            <div className=" grid grid-cols-2 gap-5">
                <div className='w-[200px] h-[200px] bg-white/10  rounded-lg '></div>
                <div className='w-[200px] h-[200px] bg-white/10  rounded-lg '></div>
                <div className='w-[200px] h-[200px] bg-white/10  rounded-lg '></div>
                <div className='w-[200px] h-[200px] bg-white/10  rounded-lg '></div>
            </div>
            
        </div>
        <div className="ongoing bg-black rounded-lg w-1/2 p-10 justify-items-center items-center">
            <h4 className='text-green text-2xl text-center uppercase lato pb-10 '>Work in progress</h4>
                <div className=" grid grid-cols-2 gap-5">
                    <div className='w-[200px] h-[200px] bg-white/10  rounded-lg '></div>
                    <div className='w-[200px] h-[200px] bg-white/10  rounded-lg '></div>
                    <div className='w-[200px] h-[200px] bg-white/10  rounded-lg '></div>
                    <div className='w-[200px] h-[200px] bg-white/10  rounded-lg '></div>
                </div>
        </div>
        </div>
        
    </div>
    </>
  )
}

export default Portfolio