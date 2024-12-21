import React from 'react'
import HeaderInfo from './HeaderInfo/HeaderInfo'
import HeaderButtons from './HeaderButtons/HeaderButtons'


const HeaderMainContent = () => {
  return (
    <div className='flex flex-col max-w-[903px] h-[166px] '>
      <div className='flex flex-col-reverse sm:flex-row justify-between items-start mx-0 sm:mx-[10px] '>
        <HeaderInfo />
        <HeaderButtons />
      </div>
    </div>
  )
}

export default HeaderMainContent

