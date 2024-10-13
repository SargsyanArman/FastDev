import React from 'react'
import PopularTagItem from './PopularTagItem'

const PopularTags = () => {
    return (
        <div className='mt-16'>
            <h3 className='text-[20px] font-bold'>Popular tags</h3>
            <div className='my-7 flex flex-col gap-4'>
                <PopularTagItem />
                <PopularTagItem />
                <PopularTagItem />
                <PopularTagItem />
            </div>
        </div>
    )
}

export default PopularTags