import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../../Store/Slices/UserSlices';
import userLogo from '../../images/isLogo.png';

const UserHeaderPlagin = () => {
    const [userOpen, setUserOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const userMenuRef = useRef(null); // для отслеживания кликов вне меню

    const handleUserClick = () => {
        setUserOpen(!userOpen);
    };

    const handleLogout = () => {
        dispatch(removeUser());
        navigate('/');
    };

    // Закрытие меню при клике вне его
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <i className="fa-solid fa-plus icon-header border-2 border-ef4444 w-7 text-[20px] mr-9 text-center" id="square-plus"></i>
            <i className="fa-solid fa-circle-half-stroke text-[20px] icon-header" id="dark-light-mode"></i>
            <i className="fa-regular fa-user relative text-[20px] icon-header mx-9 pos" onClick={handleUserClick} id="user">
                {userOpen && (
                    <ul ref={userMenuRef} className='flex flex-col text-zinc-700 absolute text-[16px] w-[300px] h-auto bg-slate-200 top-[33px] left-[-268px]'>
                        {user.token ? (
                            <>
                                <li>
                                    <div className='flex p-3'>
                                        <div>
                                            {user.logo
                                                ? <img src={user.logo} alt="user logo" />
                                                : <img src={userLogo} className='w-[45px]' alt="Default user logo" />
                                            }
                                        </div>
                                        <div className='flex flex-col px-3 pt-1 gap-1'>
                                            <span>{user.fullName}</span>
                                            <span>{user.email}</span>
                                        </div>
                                    </div>
                                </li>
                                <li className='p-3 hover:bg-zinc-300' onClick={() => navigate(`/profile/${user.id}`)}>
                                    <i className="fa-solid fa-user"></i> My Profile
                                </li>
                                <li className='p-3 hover:bg-zinc-300'><i className="fa-solid fa-user"></i> Followers </li>
                                <li className='p-3 hover:bg-zinc-300'><i className="fa-solid fa-user"></i> Collections </li>
                                <li className='p-3 hover:bg-zinc-300'><i className="fa-solid fa-user"></i> Notifications </li>
                                <li className='p-3 hover:bg-zinc-300'><i className="fa-solid fa-user"></i> Edit Profile </li>
                                <li className='p-3 hover:bg-zinc-300'>
                                    <button onClick={handleLogout} className="w-full text-left">
                                        <i className="fa-solid fa-user"></i> Log out
                                    </button>
                                </li>
                            </>
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
