import React from 'react'
import QuestionsItem from './QuestionsItem'

const Questions = () => {
    return (
        <div className='mt-20 flex w-full flex-col gap-6'>
            <div>
                <a href="#" className='flex justify-end gap-3 text-sm font-bold text-red-500 hover:text-red-400'>
                    VIEW ALL QUESTIONS
                    <span> <i className="fa-solid fa-arrow-right-long sidebar-right-btnRight"> </i></span>
                </a>
            </div>
            <div className='mt-6 flex flex-col gap-6'>
                <QuestionsItem />
                <QuestionsItem />
                <QuestionsItem />
                <QuestionsItem />
            </div>
        </div>
    )
}

export default Questions