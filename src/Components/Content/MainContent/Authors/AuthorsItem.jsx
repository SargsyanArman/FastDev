import React from 'react';
import { useNavigate } from 'react-router-dom';
import user_img from '../../../../images/author.png';

const AuthorsItem = ({ user }) => {
  const navigate = useNavigate();

  const handleAuthorClick = () => {
    navigate(`/profile/${user.id}`);
  };

  return (
    <div className='flex flex-col items-center justify-center border bg-white p-8 hover:shadow-dark-100 w-[260px] rounded-xl'>
      <img
        src={user.photo || user_img}
        className='rounded-full h-[150px] w-[150px] cursor-pointer'
        alt={user.fullName}
        onClick={handleAuthorClick}
      />
      <div className='mt-4 text-center'>
        <h3 className='text-[20px] font-bold cursor-pointer hover:text-[#898888]' onClick={handleAuthorClick}>{user.fullName || 'Unknown Author'}</h3>
        <p className="mt-2 text-zinc-500 text-[14px] cursor-pointer hover:text-[#272727]" onClick={handleAuthorClick}>@{user.email || 'unknown'}</p>
      </div>
    </div>
  );
};

export default AuthorsItem;
