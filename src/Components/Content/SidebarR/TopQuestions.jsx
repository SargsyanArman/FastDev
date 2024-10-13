import React from 'react'
import TopQuestionsItem from './TopQuestionsItem'

const TopQuestions = () => {
    return (
        <div className='mt-14 '>
            <h3 className='text-zinc-900 font-bold text-[20px]'>Top Questions</h3>
            <div className='mt-5 flex w-full flex-col gap-[30px]'>
                <TopQuestionsItem />
                <TopQuestionsItem />
                <TopQuestionsItem />
                <TopQuestionsItem />
            </div>
        </div>
    )
}

export default TopQuestions