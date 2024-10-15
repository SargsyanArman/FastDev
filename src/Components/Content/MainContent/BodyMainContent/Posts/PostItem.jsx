import React from 'react';
import PostInfo from './PostInfo'

const PostItem = ({ post }) => {
    return (
        <div className='w-full lg:flex-1 lg:min-w-[300px] lg:max-w-[415px] bg-[#f4f4f5] m-2 p-3'>
            {post.imageUrl && (
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className='w-full h-[300px] lg:h-[300px] rounded-2xl hover:scale-[1.001] origin-center cursor-pointer'
                />
            )}
            <h3 className="font-bold text-xl mt-3 cursor-pointer hover:text-[#ef4444]">
                {post.title}
            </h3>
            {/* <p>{post.description}</p> */}
            <PostInfo post={post} createdAt={post.createdAt} />
        </div>
    );
};

export default PostItem;
