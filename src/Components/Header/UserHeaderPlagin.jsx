import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../../Store/Slices/UserSlices';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import userLogo from '../../images/isLogo.png';

const UserHeaderPlagin = () => {
    const [userOpen, setUserOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const userMenuRef = useRef(null);

    const handleUserClick = () => {
        setUserOpen(!userOpen);
    };

    const handleLogout = () => {
        dispatch(removeUser());
        navigate('/');
    };

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

    useEffect(() => {
        if (user.id) {
            const fetchUserData = async () => {
                try {
                    const docRef = doc(db, "users", user.id);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    } else {
                        console.log("User not found");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };

            fetchUserData();
        }
    }, [user.id]);




    return (
        <div>
            <i
                className="fa-solid fa-plus icon-header border-2 border-ef4444 w-7 text-[20px] mr-9 text-center"
                onClick={() => navigate(user.token ? '/create-post' : 'login-required')}
                id="square-plus">
            </i>
            <i class="fa-solid fa-bell text-[20px] icon-header" onClick={() => navigate('/notifications')}></i>
            <i className="fa-regular fa-user relative text-[20px] icon-header mx-9 pos" onClick={handleUserClick} id="user">
                {userOpen && (
                    <ul ref={userMenuRef} className='flex flex-col text-zinc-700 absolute text-[16px] w-[300px] h-auto bg-slate-200 top-[33px] left-[-268px]'>
                        {user.token ? (
                            <>
                                <li>
                                    <div className='flex p-3'>
                                        <div>
                                            {userData?.photo
                                                ? <img src={userData.photo} className='w-[45px] h-[45px] rounded-full' alt="user logo" />
                                                : <img src={userLogo} className='w-[45px] h-[45px]' alt="Default user logo" />
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
                                <li className='p-3 hover:bg-zinc-300' onClick={() => navigate('/notifications')}><i class="fa-solid fa-bell"></i> Notifications </li>
                                <li className='p-3 hover:bg-zinc-300'>
                                    <button onClick={handleLogout} className="w-full text-left">
                                        <i class="fa-solid fa-arrow-right-from-bracket"></i> Log out
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
            {/* <i className="fa-solid fa-bars icon-header text-[20px] inline-block sm:hidden"></i> */}
        </div>
    );
}

export default UserHeaderPlagin;
