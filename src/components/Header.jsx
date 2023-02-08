import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/loggedinUser';
import { LoggedUser } from './LoggedUser';

export const Header = () => {
    const { loggedInUser } = useContext(UserContext)
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