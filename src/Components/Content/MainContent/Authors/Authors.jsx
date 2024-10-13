import React from 'react'
import AuthorsItem from './AuthorsItem'

const Authors = () => {
  return (
    <section className='mt-20'>
      <div>
        <a href="#" className='flex justify-end gap-3 text-sm font-bold text-red-500 hover:text-red-400'>
          VIEW ALL AUTHORS
          <span> <i className="fa-solid fa-arrow-right-long sidebar-right-btnRight"> </i></span>
        </a>
      </div>
      <div className='mt-6 flex flex-wrap justify-around gap-4'>
        <AuthorsItem />
        <AuthorsItem />
        <AuthorsItem />
        <AuthorsItem />
        <AuthorsItem />
        <AuthorsItem />
      </div>
    </section>
  )
}

export default Authors