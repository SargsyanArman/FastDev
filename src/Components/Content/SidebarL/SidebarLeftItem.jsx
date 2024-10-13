import React from 'react'

const SidebarLeftItem = ({ icon,text }) => {
    
    return (
        <div>
            <ul className='flex flex-col gap-6 pl-8'> {icon.map((item,index) => (
                    <li key={index+item} className='h-[50px] w-[50px] p-[15px] lg:flex items-center lg:h-14 lg:w-[216px] lg:p-[10px] rounded-lg text-[18px] cursor-pointer list-none first:bg-gradient-to-r from-[#eb2005] to-[#db5344] first:font-bold first:text-white hover:bg-[#E2E8F0]'>
                        {item} 
                        <p className='hidden lg:pl-4 lg:block'>{text[index]}</p>
                    </li>
                 ))}
            </ul>
        </div>
    )
}



export default SidebarLeftItem
