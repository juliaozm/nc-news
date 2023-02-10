import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../contexts/loggedinUser';
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";
import { MdDelete} from "react-icons/md";

export const CommentItem = ({comment, setDeletedComment }) => {
    const { loggedInUser } = useContext(UserContext)
    const [btnActive, setBtnActive] = useState(false)
    const [animate, setAnimate] = useState(false)
    const date = new Date(Date.parse(comment.created_at)).toLocaleString('en-GB', { timeZone: 'UTC'})
    
    useEffect(() => {
        if (loggedInUser.username === 'weegembump' 
            && comment.author === 'weegembump' ) {
            setBtnActive(true)
        }
    }, [loggedInUser, comment])

    
    const handleDeleteComment = (e) => {
        e.preventDefault();
        setDeletedComment(comment)
        setAnimate(true)
    }

    return <li className={"comment-item " + (animate ? 'slide-left' : '' )}>
                <div className="header">
                    <h3>{comment.author}</h3>
                    <div className='date-info'>
                        <span className="date">{date}</span>
                        { btnActive 
                            ? <button onClick={handleDeleteComment} className='btn-delete'><MdDelete /></button> 
                            : ''
                        }
                    </div>
                    
                </div>
                <p className="text">{comment.body}</p>
                <div className="vote">
                    <button className="up"> <IoMdThumbsUp /> </button>
                    <button className="down"> <IoMdThumbsDown /> </button>
                    {comment.votes > 0 
                        ? <span className="green">{comment.votes}</span> 
                        : <span className="red">{comment.votes}</span>
                    }
                </div>
            </li>
}