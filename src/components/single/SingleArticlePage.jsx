import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle, getComments, updateArticleVotes, postNewComment } from '../../utils/api';
import { ReadingSection } from './ReadingSection';
import { CommentSection } from './comments/CommentSection';
import { BackLink } from '../BackLink';
import { LoadingItem } from '../LoadingItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const SingleArticlePage = () => {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [updatedArticle, setUpdatedArticle] = useState({});
    const [newComment, setNewComment] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getArticle(article_id), getComments(article_id)])
        .then(([articleFromAPI, commentsFromApi]) => {
           setArticle(articleFromAPI.data.article)
           setLoading(false)
           setComments(commentsFromApi.data.comments)
        })
    }, [article_id]);

    useEffect(() => {
        if (updatedArticle.inc_votes !== undefined) {
           updateArticleVotes(article_id, updatedArticle)
           .catch(err => {
            console.log(err)
            toast.error("Your vote hasn't been counted!")
           })
        }
    }, [updatedArticle])

    useEffect(() => {
        if (newComment.author && newComment.body) {
            setComments((currComments) => [newComment, ...currComments]) 
            postNewComment(article_id, {
                username: newComment.author,
                body: newComment.body,
            })
            .catch(err => {
                console.log(err)
                toast.error("Your comment hasn't been published!")
            })
        }
    }, [newComment])

    if (isLoading) return <LoadingItem />
    return (
        <main className='container'>
            <BackLink />
            <ReadingSection article={article} setUpdatedArticle={setUpdatedArticle} />
            <CommentSection comments={comments} setNewComment={setNewComment} />
            <ToastContainer position="top-right" autoClose={5000} limit={3} />
        </main>
    )
}