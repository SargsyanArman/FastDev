import React from 'react';
import SidebarLeft from './SidebarL/SidebarLeft';
import SidebarR from './SidebarR/SidebarR';
import { Outlet } from 'react-router-dom';

const Content = () => {
    return (
        <div className='flex bg-[#F9F8F8] w-full mt-6 h-[605px] overflow-y-auto max-h-[calc(100vh-122px)]'>
            <SidebarLeft />
            <Outlet />
            <SidebarR />
        </div>
    );
};

export default Content;
