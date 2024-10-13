import React from 'react'
import logo_img from '../../../../images/author.png'

const QuestionsItem = () => {
    return (
        <div className='bg-zinc-100 rounded-[10px] p-9 max-w-[890px]'>
            <div>
                <a href="#" className='text-[20px] hover:text-red-500 font-bold '>
                    Is there a way in Golang to define a generic function type with varargs that can...
                </a>
            </div>

            <div className='mt-3.5'>
                <a href="#" className='tag'>
                    TEST
                </a>
            </div>

            <div className='mt-6 flex flex-wrap items-center justify-between gap-3'>
                <a href='#' className="flex items-center justify-center gap-1">
                    <img src={logo_img} className='h-[18px]' />
                    <span className='cursor-pointer text-[14px] text-zinc-800 flex items-center gap-1 hover:text-red-400'>
                        Arm Traders
                        <span className='text-[12px] transition-none'> asked 1 months ago</span>
                    </span>
                </a>
            </div>
        </div>

    )
}

export default QuestionsItem

