import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../../Store/Slices/Users';
import AuthorsItem from './AuthorsItem';

const AllAuthors = () => {
    const dispatch = useDispatch();
    const { users, status } = useSelector((state) => state.users);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers());
        }
    }, [dispatch, status]);

    return (
        <section className='mt-20'>
            <h2 className='text-2xl font-bold mb-6'>All Authors</h2>
            <div className='flex flex-wrap justify-around gap-4'>
                {users.map((user) => (
                    <AuthorsItem key={user.id} user={user} />
                ))}
            </div>
        </section>
    );
}

export default AllAuthors;
