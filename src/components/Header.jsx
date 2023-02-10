import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/loggedinUser';
import { LoggedUser } from './LoggedUser';

export const Header = () => {
    const location = useLocation();
    const { loggedInUser } = useContext(UserContext)

    if (location.pathname === '/' || location.pathname === '/login') {
        return null;
    } else {

        return (
            <header className='header'>
                {   
                    !loggedInUser.username
                    ? <Link to='/login'> <h2>Login</h2> </Link>
                    : < LoggedUser user={loggedInUser}/>
                }
            </header>
        )
    }
}