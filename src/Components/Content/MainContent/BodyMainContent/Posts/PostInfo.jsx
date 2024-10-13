import React from 'react'

const PostInfo = () => {
    return (
        <div className='text-[#27272a] text-xs mt-6'>
            <div className='flex justify-between py-[5px]'>
                <span className='cursor-pointer  hover:text-red-400 '>
                    <span className='font-bold transition-none'>Arman Sargsyan </span> 
                    created 5 months ago
                </span>                
                <div>
                    <i className="fa-regular fa-heart"></i> <span>1 Votes</span>
                </div>
            </div>
            <div className='flex justify-between py-[5px]'>
                <div><i className="fa-regular fa-comment"></i> <span>0 comments</span></div>
                <div><i className="fa-solid fa-eye"></i> <span>96 views</span></div>
            </div>
        </div>
    )
}

export default PostInfo

