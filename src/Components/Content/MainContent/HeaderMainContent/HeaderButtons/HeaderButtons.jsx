import React from 'react'

const HeaderButtons = () => {
  return (
    <div className='flex items-end gap-3 mb-[10px] sm:mb-0'>
        <button className='main-header-btns bg-ef4444 hover:bg-[#dc2626]'>Create a post</button>
        <button className='main-header-btns bg-[#6366f1] hover:bg-[#4f46e5]'>Ask a question</button>
    </div>
  )
}

export default HeaderButtons
