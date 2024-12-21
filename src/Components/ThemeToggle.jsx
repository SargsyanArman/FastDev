import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import {toggleTheme} from '../Store/Slices/Theme';


const ThemeToggle = () => {
    const mode = useSelector((state)=>state.theme.mode)
    const dispatch = useDispatch()

    useEffect(() => {
      const htmlElement = document.documentElement;
      if (mode === 'dark') {
          htmlElement.classList.add('dark');
      } else {
          htmlElement.classList.remove('dark');
      }
  }, [mode]);

  return (
   <button 
    onClick={()=> dispatch(toggleTheme())}
    className='p-2 '
   >
   <i
    className={`${
        mode === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'
    } text-[20px] icon-header`}
/>
   </button>
  )
}

export default ThemeToggle