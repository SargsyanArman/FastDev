import React from 'react';
import user_img from '../../../../images/author.png';

const AuthorsItem = ({ user }) => {
  return (
    <div className='flex flex-col items-center justify-center border bg-white p-8 hover:shadow-dark-100 w-[260px] rounded-xl'>
      <a href="#">
        <img src={user.photo || user_img} className='rounded-full h-[150px] w-[150px]' alt={user.fullName} />
      </a>

      <div className='mt-4 text-center'>
        <h3 className='text-[20px] font-bold'>{user.fullName || 'Unknown Author'}</h3>
        <a href='#' className="mt-2 text-zinc-500 hover:text-red-400 text-[14px]">@{user.email || 'unknown'}</a>
      </div>

      {user?.tag ?
        <p className='tag mt-5'>
          {user.tag}
        </p>
        :
        <p className='font-bold text-xs mt-5'>No Tags yet</p>
      }
    </div>
  );
}

export default AuthorsItem;
