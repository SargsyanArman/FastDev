import React from 'react';
import SidebarLeftItem from './SidebarLeftItem';
import { useNavigate } from 'react-router-dom';

const SidebarLeft = ({ icon, text }) => {
    const navigate = useNavigate();

    return (
        <div className='sidebar hidden sm:flex sm:w-[114px] lg:w-[261px] flex-col gap-5 text-[#18181b] pt-14 border-r-2 overflow-y-auto overflow-x-hidden flex-shrink-0'>
            <SidebarLeftItem icon={icon} text={text} />
            <div className='flex flex-col gap-5 w-full pl-8 mt-5'>
                <button onClick={() => navigate('/signin')} className='h-[50px] w-[50px] lg:w-[214px] lg:h-[41px] text-[14px] rounded-lg border-none bg-ef4444 hover:bg-[#dc2626] cursor-pointer'>
                    <i className="fa-regular fa-user lg:hidden"></i>
                    <span className='hidden lg:inline text-white'>Log in</span>
                </button>
                <button onClick={() => navigate('/signup')} className='h-[50px] w-[50px] lg:w-[214px] lg:h-[41px] rounded-lg border-none bg-[#6366f1] hover:bg-[#4f46e5] cursor-pointer'>
                    <i className="fa-solid fa-user-plus lg:hidden"></i>
                    <span className='hidden lg:inline text-white'>Sign up</span>
                </button>
                <hr className='w-[94%]' />
            </div>

            <div id="sidebar-footer" className='hidden lg:block mt-auto mb-5'>
                <div className="flex flex-row justify-center mb-[10px]">
                    <button className="btn-2">About us</button>
                    <button className="btn-2">Advertise</button>
                </div>
                <p className='w-[214px] h-[32px] text-[12px] pl-[34px]'>
                    © 2024 <a href="#" className='text-ef4444'>FastDev.NET.</a> All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default SidebarLeft;
