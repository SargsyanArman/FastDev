import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase';

const Post = () => {
    const { post: postId } = useParams();
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState(null);

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

    useEffect(() => {
        if (posts.length > 0) {
            const foundPost = posts.find((p) => p.id === postId);
            setPost(foundPost);
        }
    }, [posts, postId]);

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div className='flex flex-col gap-6 w-[953px] my-7 mx-5 overflow-y-auto max-h-[100vh-122px] scroll-main'>
            <h1 className='text-3xl font-bold'>{post.title}</h1>
            <img
                src={post.imageUrl}
                alt={post.title}
                className='w-full h-[300px] lg:h-[500px] rounded-2xl mt-5'
            />
            <p className='mt-5'>{post.description}</p>
            <p className='mt-3 text-gray-500'>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default Post;
