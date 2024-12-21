import SearchHeader from './SearchHeader';
import UserHeaderPlagin from './UserHeaderPlagin';
import logo from '../../images/logo.jpg';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';

const Header = () => {
    const navigate = useNavigate()

    return (
        <div className="flex justify-between h-16 items-center pl-8 pr-4 sm:px-11 mt-7 dark:bg-gray-800 dark:text-white">
            <div className='flex items-center'>
                <img src={logo} alt="logo" className='h-9 cursor-pointer' onClick={() => navigate('/')} />
                <button className="hidden ml-3 font-bold sm:text-[19px] sm:inline cursor-pointer" onClick={() => navigate('/')}>
                    FastDev<span className=' text-ef4444'>.NET</span>
                </button>
            </div>
            <SearchHeader />
            <div className="flex items-center space-x-4">
                <ThemeToggle /> 
            <UserHeaderPlagin />
           </div> 
        </div>
    )
}

export default Header