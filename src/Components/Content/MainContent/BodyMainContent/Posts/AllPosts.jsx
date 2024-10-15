import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../../firebase';
import PostItem from './PostItem';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

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

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Расчет общего количества страниц
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="flex flex-col items-center my-7 mx-5">
            <div className="flex flex-wrap gap-6 w-[953px] overflow-y-auto max-h-[calc(100vh-122px)] scroll-main justify-center">
                {currentPosts.map(post => (
                    <PostItem key={post.id} post={post} />
                ))}
            </div>

            <div className="flex justify-between w-full mt-6">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="mx-4">{currentPage} / {totalPages}</span>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllPosts;
