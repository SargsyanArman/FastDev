import React from 'react'
import go from '../../../images/go.webp'

const SidebarPostItem = ({ icons }) => {
  return (
    <div className='mt-5 flex w-full flex-col gap-[29px]'>
      {icons.map((item, index) => (
        <a key={index} href='#' className='flex cursor-pointer items-center justify-between gap-2'>
          <img src={go} alt="Go logo" className='h-[50px] w-[50px] rounded-[10px] hover:scale-105 ' />
          <span className='text-[14px] leading-[18.2px] text-zinc-700 hover:text-red-500 '>Mastering Concurrency in Go: A Comprehensive Guide to Goroutines and Channels</span>
          {item}
        </a>
      ))}
    </div>
  )
}

export default SidebarPostItem
// flex cursor-pointer items-center justify-between gap-2
// <a key={index} className='flex justify-center gap-[10px] w-[298px] h-[50px] text-[14px] pr-5 mt-7 rounded-[10px]'>
