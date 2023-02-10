import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HiOutlineXMark } from "react-icons/hi2";
import { useContext } from 'react'
import { UserContext } from '../../../contexts/loggedinUser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CommentAdder = ({addNewComment}) => {
    const { article_id } = useParams()
    const { loggedInUser } = useContext(UserContext)
    const [newCommentText, setNewCommentText] = useState('')
    const [btnActive, setBtnActive] = useState(false)
    const [error, setError] = useState(false)
    
    useEffect(() => {
        newCommentText ? setBtnActive(true) : setBtnActive(false)
    }, [newCommentText])

    const validationForm = () => {
        setError(false)
        if (!loggedInUser.username || !loggedInUser.username == undefined) {
            setError(true)
            toast.error('Please login to post a comment', {
                toastId: "error"        
            })
        } 
        if (!newCommentText || newCommentText == undefined) {
            setError(true)
            toast.error('Please enter a valid comment', {
                toastId: "error"        
            })
        } 
    }

    const handleCommentInput = (e) => {
        setNewCommentText(e.target.value)
    }

    const handleSubmitComment = (e) => {
        e.preventDefault()
        validationForm()
        if (!error) {
            const comment = {
                author: loggedInUser.username,
                body: newCommentText,
                votes: 0,
                created_at: new Date(),
                article_id: +article_id
            }
            addNewComment(comment)
            setNewCommentText('')
        } 
    }

    return (
        <form onSubmit={handleSubmitComment} className="comment-adder">
            <input 
                type="text"
                name="body"
                placeholder="Add new comment"
                minLength={5}
                maxLength={200}
                required
                value={newCommentText}
                onChange={handleCommentInput}
                className="comment-input"
            />
            {btnActive ? <button onClick={() => setNewCommentText('')} className="reset-btn"> <HiOutlineXMark /></button> : ''}
            {btnActive ? <button className='submit-btn'> Add comment </button> : ''}
        </form>
    )
}