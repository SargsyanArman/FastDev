import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../../firebase';
import PostItem from './PostItem';
import { Link } from 'react-router-dom';

const Posts = () => {
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

  const limitedPosts = posts.slice(0, 4);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap gap-6 justify-center">
        {limitedPosts.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
