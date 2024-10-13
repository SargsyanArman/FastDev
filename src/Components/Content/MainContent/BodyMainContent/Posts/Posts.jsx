import React from 'react'
import PostItem from './PostItem'

const Posts = () => {
  return (
    <div className='flex flex-wrap gap-6 justify-center'>
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
    </div>
  )
}

export default Posts
