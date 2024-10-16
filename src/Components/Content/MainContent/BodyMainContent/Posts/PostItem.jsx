import React from 'react';
import { Link } from 'react-router-dom';
import PostInfo from './PostInfo';

const PostItem = ({ post }) => {
    return (
        <div className='w-full xl:w-[46%] bg-[#f4f4f5] m-2 p-3'>
            {post.imageUrl && (
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className='w-full h-[300px] rounded-2xl hover:scale-[1.001] origin-center cursor-pointer'
                />
            )}
            <Link to={`/posts/${post.id}`}>
                <h3 className="font-bold text-xl mt-3 cursor-pointer hover:text-[#ef4444]">
                    {post.title}
                </h3>
            </Link>
            <PostInfo post={post} createdAt={post.createdAt} />
        </div>
    );
};

export default PostItem;
