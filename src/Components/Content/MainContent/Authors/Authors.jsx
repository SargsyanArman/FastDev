import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../../Store/Slices/Users'
import AuthorsItem from './AuthorsItem';
import { Link } from 'react-router-dom';

const Authors = () => {
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.users);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status, users]);

  return (
    <section className='mt-20'>
      <div>
        <Link to="/all-authors" className='flex justify-end gap-3 text-sm font-bold text-red-500 hover:text-red-400'>
          VIEW ALL AUTHORS
          <span> <i className="fa-solid fa-arrow-right-long sidebar-right-btnRight"> </i></span>
        </Link>
      </div>
      <div className='mt-6 flex flex-wrap justify-around gap-4'>
        {users.slice(0, 6).map((user) => (
          <AuthorsItem key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
}

export default Authors;
