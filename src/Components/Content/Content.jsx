import React from 'react'
import SidebarLeft from './SidebarL/SidebarLeft'
import MainContent from './MainContent/MainContent'
import SidebarR from './SidebarR/SidebarR'

const getSidebarItemIcon = [
    <i className="fa-solid fa-house sidebar-li"></i>,
    <i className="fa-solid fa-file-contract"></i>,
    <i className="fa-solid fa-circle-question"></i>,
    <i className="fa-solid fa-user-group"></i>,
    <i className="fa-solid fa-tags"></i>
]

const getSidebarItemParagraph = [
    "Home",
    "Posts",
    "Questions",
    "Community",
    "Tags",
]

const Content = () => {
  return (
      <div className='flex bg-[#F9F8F8] w-full mt-6 h-[605px] overflow-y-auto max-h-[100vh-122px]'>
          <SidebarLeft icon={getSidebarItemIcon} text={getSidebarItemParagraph}/>
          <MainContent />
          <SidebarR />
      </div>
  )
}

export default Content


