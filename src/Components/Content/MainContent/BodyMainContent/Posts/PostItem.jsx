import React from 'react';
import content from '../../../../../images/content.webp';
import PostButtons from './PostButtons';
import PostInfo from './PostInfo';

const PostItem = () => {
    return (
        <div className='w-full lg:flex-1 lg:min-w-[300px] lg:max-w-[415px] bg-[#f4f4f5] m-2 p-3'>
            <img 
                src={content} 
                alt="Image Content" 
                className='w-full h-[300px] lg:h-auto rounded-2xl hover:scale-[1.001] origin-center cursor-pointer' 
            />
            <h3 className="font-bold text-xl mt-3 cursor-pointer hover:text-[#ef4444]">
                Mastering Smart Contract Development <br /> 
                with Node.js: Tools, Security, and Best...
            </h3>
            <PostButtons />
            <PostInfo />
        </div>
    )
}

export default PostItem;
