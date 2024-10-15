import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import { Link } from 'react-router-dom';
import go from '../../../images/go.webp';

const SidebarPostItem = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='mt-5 flex w-full flex-col gap-[29px]'>
      {posts.slice(0, 4).map((post) => (
        <Link key={post.id} to={`/posts/${post.id}`} className='flex cursor-pointer items-center justify-between gap-2'>
          <div className='flex gap-2 items-center'>
            <img src={post.imageUrl || go} alt="Post logo" className='h-[50px] w-[50px] rounded-[10px] hover:scale-105' />
            <span className='text-[14px] leading-[18.2px] text-zinc-700 hover:text-red-500'>{post.title}</span>
          </div>
          <i className="fa-solid fa-arrow-right-long sidebar-right-btnRight flex"></i>
        </Link>
      ))}
    </div>
  );
};

export default SidebarPostItem;
