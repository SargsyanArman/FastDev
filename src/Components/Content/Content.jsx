import React from 'react';
import SidebarLeft from './SidebarL/SidebarLeft';
import SidebarR from './SidebarR/SidebarR';
import { Outlet } from 'react-router-dom';

const getSidebarItemIcon = [
    <i className="fa-solid fa-house sidebar-li"></i>,
    <i className="fa-solid fa-file-contract"></i>,
    <i className="fa-solid fa-circle-question"></i>,
    <i className="fa-solid fa-user-group"></i>,
    <i className="fa-solid fa-tags"></i>
];

const getSidebarItemParagraph = [
    "Home",
    "Posts",
    "Questions",
    "Community",
    "Tags",
];

const Content = () => {
    return (
        <div className='flex bg-[#F9F8F8] w-full mt-6 h-[605px] overflow-y-auto max-h-[calc(100vh-122px)]'>
            <SidebarLeft icon={getSidebarItemIcon} text={getSidebarItemParagraph} />
            <Outlet />
            <SidebarR />
        </div>
    );
};

export default Content;
