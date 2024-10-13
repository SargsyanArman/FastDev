import React from 'react'
import user_img from '../../../../images/author.png'

const AuthorsItem = () => {
  return (
    <div className='flex flex-col items-center justify-center border bg-white p-8 hover:shadow-dark-100 w-[260px] rounded-xl'>
      <a href="#">
        <img src={user_img} alt="" />
      </a>

      <div className='mt-4 text-center '>
        <h3 className='text-[20px] font-bold'>Arm Traders</h3>
        <a href='#' className="mt-2 text-zinc-500 hover:text-red-400 text-[14px]">@tradingtrader</a>
      </div>

      <div className='tag mt-5'>
        TEST
      </div>
    </div>
  )
}

export default AuthorsItem