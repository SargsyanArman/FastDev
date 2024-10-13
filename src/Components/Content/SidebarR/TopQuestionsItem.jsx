import React from 'react'

const TopQuestionsItem = () => {
  return (
    <a href='#' className='flex cursor-pointer items-center justify-between gap-7'>
        <span className='text-[14px] leading-[18.2px] text-zinc-700 hover:text-red-500'>
            Is there a way in Golang to define a generic function type with varargs that can take any function as input?
        </span>
        <span> <i className="fa-solid fa-arrow-right-long sidebar-right-btnRight"> </i></span>
    </a>
  )
}

export default TopQuestionsItem