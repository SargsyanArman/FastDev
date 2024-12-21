import React from 'react';
import { Link } from 'react-router-dom';

const TopQuestionsItem = ({ question }) => {
  return (
    <Link to={`/question/${question.id}`} className='flex cursor-pointer items-center justify-between gap-7'>
      <span className='text-[14px] leading-[18.2px] text-zinc-700 hover:text-red-500  dark:text-white'>
        {question.title}
      </span>
      <span>
        <i className="fa-solid fa-arrow-right-long sidebar-right-btnRight"></i>
      </span>
    </Link>
  );
};

export default TopQuestionsItem;
