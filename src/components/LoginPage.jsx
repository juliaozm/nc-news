import { UserContext } from '../contexts/loggedinUser';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { BackLink } from './BackLink';
import { toast } from 'react-toastify';

export const LoginPage = () => {
    const [input, setInput] = useState('weegembump');
    const {loggedInUser, setLoggedInUser} = useContext(UserContext);
    const navigate = useNavigate();

    const newLoggedInUser = {
        "username" : "weegembump",
        "name" : "Gemma Bump",
        "avatar_url" : "https://vignette.wikia.nocookie.net/mrmen/images/7/7e/MrMen-Bump.png/revision/latest?cb=20180123225553"
    }

    useEffect(() => {
        if (loggedInUser.username) {
          navigate(-1);
        }
      }, [loggedInUser]);

    const handleLogin = (e) => {
        e.preventDefault()
        if (input === 'weegembump') {
            setLoggedInUser(() => ({...newLoggedInUser }))
        } else {
            toast.error('Enter the right username!', {
                toastId: "error"        
            })
        }
    }

    return (
        <main className='container container-login'>
            <BackLink />
            <form onSubmit={handleLogin} className="login-form">
                <input 
                    id="username" 
                    type="text" 
                    value={input}
                    placeholder={"Enter 'weegembump' to login"}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button>Login</button>
            </form>
        </main>
    )
}