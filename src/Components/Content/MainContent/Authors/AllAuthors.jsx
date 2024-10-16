import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../../Store/Slices/Users';
import AuthorsItem from './AuthorsItem';

const AllAuthors = () => {
    const dispatch = useDispatch();
    const { users, status } = useSelector((state) => state.users);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const authorsPerPage = 9;

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers());
        }
    }, [dispatch, status]);

    const filteredUsers = users.filter((user) => {
        const userName = user.fullName?.toLowerCase() || '';
        return userName.includes(searchTerm.toLowerCase());
    });
    const totalPages = Math.ceil(filteredUsers.length / authorsPerPage);
    const startIndex = (currentPage - 1) * authorsPerPage;
    const currentAuthors = filteredUsers.slice(startIndex, startIndex + authorsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className='flex flex-col bg-[#F9F8F8] w-[953px] mt-6 h-[605px] overflow-y-auto max-h-[calc(100vh-122px)] sidebar-right'>
            <h2 className='text-2xl font-bold mb-6'>All Authors</h2>
            <input
                type="text"
                placeholder="Search authors..."
                className="mb-4 mx-5 p-3 bg-[#e2e8f0] text-sm h-10 rounded-lg outline-none focus:outline-none focus:border-none"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                }}
            />
            {filteredUsers.length === 0 && searchTerm && (
                <div className="text-red-500 mb-4">No authors found</div>
            )}
            <div className='flex flex-wrap justify-around gap-4'>
                {currentAuthors.map((user) => (
                    <AuthorsItem key={user.id} user={user} />
                ))}
            </div>

            <div className="flex justify-center mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="mx-4">{currentPage} / {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllAuthors;
