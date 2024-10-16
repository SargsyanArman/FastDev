import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarLeftItem = ({ icon, text, routes }) => {
    return (
        <div>
            <ul className='flex flex-col gap-6 pl-8'>
                {icon.map((item, index) => (
                    <NavLink
                        to={routes[index]}
                        key={index}
                        className={({ isActive }) =>
                            `h-[50px] w-[50px] p-[15px] lg:flex items-center lg:h-14 lg:w-[216px] lg:p-[10px] rounded-lg text-[18px] cursor-pointer list-none ${isActive ? 'bg-red-500 text-white' : 'hover:bg-[#E2E8F0]'}`
                        }
                    >
                        {item}
                        <p className='hidden lg:pl-4 lg:block'>{text[index]}</p>
                    </NavLink>
                ))}
            </ul>
        </div>
    );
};

export default SidebarLeftItem;
