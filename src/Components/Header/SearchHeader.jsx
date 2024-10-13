import React from 'react'

const SearchHeader = () => {
  return (
    <div className="hidden md:flex w-[330px] lg:w-[500px] bg-e2e8f0 h-10 rounded-lg">
        <i className="fa-solid fa-magnifying-glass text-a4adbb h-10 w-50px pt-[10px] text-sm text-center cursor-pointer"></i>
        <input
          className='bg-[#e2e8f0] text-sm h-10 rounded-lg outline-none focus:outline-none focus:border-none'
          type="search"
          name="search"
          placeholder="Search globally"
        />
      </div>
  )
}

export default SearchHeader