import SearchHeader from './SearchHeader';
import UserHeaderPlagin from './UserHeaderPlagin';
import logo from '../../images/logo.jpg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate('')

    return (
        <div className="flex justify-between h-16 items-center px-8 sm:px-11 pt-5">
            <div className='flex items-center'>
                <img src={logo} alt="logo" className='h-9' />
                <span href='#' className="hidden ml-3 font-bold sm:text-[19px] sm:inline cursor-pointer" onClick={() => navigate('/')}>
                    FastDev<span className=' text-ef4444'>.NET</span>
                </span>
            </div>
            <SearchHeader />
            <UserHeaderPlagin />
        </div>
    )
}

export default Header