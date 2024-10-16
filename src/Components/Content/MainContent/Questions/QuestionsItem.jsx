import React from 'react'
import logo_img from '../../../../images/author.png'
import { Link } from 'react-router-dom'

const QuestionsItem = ({ question }) => {
    const formatDate = (timestamp) => {
        const date = timestamp.toDate();
        const options = { year: 'numeric', month: 'long' };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div className='bg-zinc-100 rounded-[10px] p-9 w-full sm:max-w-[640px] md:max-w-[760px] lg:max-w-[890px]'>
            <div>
                <button className='text-[20px] hover:text-red-500 font-bold '>
                    {question?.title}
                </button>
            </div>

            <div className='mt-6 flex flex-wrap items-center justify-between gap-3'>
                <Link to={`/question/${question.id}`}>
                    <button className="flex items-center justify-center gap-1">
                        <img src={question?.imageUrl || logo_img} className='h-[25px] w-[25px] rounded-full' />
                        <span className='cursor-pointer text-[14px] text-zinc-800 flex items-center gap-1 hover:text-red-400'>
                            {question?.author}
                            <span className='text-[12px] transition-none'> asked {formatDate(question.createdAt)}</span>
                        </span>
                    </button>
                </Link>

            </div>
        </div>

    )
}

export default QuestionsItem

