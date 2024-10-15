import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeaderButtons = () => {
  const navigate = useNavigate()

  return (
    <div className='flex items-end gap-3 mb-[10px] sm:mb-0'>
      <button className='main-header-btns bg-ef4444 hover:bg-[#dc2626]' onClick={() => navigate('create-post')}>Create a post</button>
      <button className='main-header-btns bg-[#6366f1] hover:bg-[#4f46e5]'>Ask a question</button>
    </div>
  )
}

export default HeaderButtons
