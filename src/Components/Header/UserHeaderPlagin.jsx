import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserHeaderPlagin = () => {
    const [userOpen, setUserOpen] = useState(false);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    console.log(user);

    const handleUserClick = () => {
        setUserOpen(!userOpen);
    };

    return (
        <div>
            <i className="fa-solid fa-plus icon-header border-2 border-ef4444 w-7 text-[20px] mr-9 text-center" id="square-plus"></i>
            <i className="fa-solid fa-circle-half-stroke text-[20px] icon-header" id="dark-light-mode"></i>
            <i className="fa-regular fa-user relative text-[20px] icon-header mx-9 pos" onClick={handleUserClick} id="user">
                {userOpen && (
                    <ul className='flex flex-col text-zinc-700 absolute text-[16px] w-[110px] h-20 bg-slate-200 top-[33px] left-[-16px]'>
                        {user.token ? (
                            <li className='p-3'>
                                <i className="fa-solid fa-user"></i> {user.fullName}
                            </li>
                        ) : (
                            <>
                                <li onClick={() => navigate('/signin')} className='p-3 hover:bg-zinc-300'>
                                    <i className="fa-solid fa-right-to-bracket"></i> Sign In
                                </li>
                                <li onClick={() => navigate('/signup')} className='p-3 hover:bg-zinc-300'>
                                    <i className="fa-solid fa-user-tie"></i> Sign Up
                                </li>
                            </>
                        )}
                    </ul>
                )}
            </i>
            <i className="fa-solid fa-bars icon-header text-[20px] inline-block sm:hidden"></i>
        </div>
    );
}

export default UserHeaderPlagin;
