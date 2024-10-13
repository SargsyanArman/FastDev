import React from 'react'
import Posts from './Posts/Posts'

const BodyMainContent = () => {
  return (
    <div className=''>
      <div className='flex mt-[40px] justify-end'>
        <button className='main-header-btns font-semibold !text-[#ef4444] !text-base !w-[200px]'> VIEW ALL POSTS <i className="fa-solid fa-right-long right"></i></button>
      </div>
      <Posts />
    </div>
  )
}

export default BodyMainContent
