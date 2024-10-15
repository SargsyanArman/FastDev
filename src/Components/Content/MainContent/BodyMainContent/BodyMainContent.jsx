import React from 'react'
import Posts from './Posts/Posts'
import { useNavigate } from 'react-router-dom'

const BodyMainContent = () => {
  const navigate = useNavigate()

  return (
    <div className=''>
      <div className='flex mt-[40px] justify-end'>
        <button className='main-header-btns font-semibold !text-[#ef4444] !text-base !w-[200px]' onClick={() => navigate('all-posts')}> VIEW ALL POSTS <i className="fa-solid fa-right-long right"></i></button>
      </div>
      <Posts />
    </div>
  )
}

export default BodyMainContent
