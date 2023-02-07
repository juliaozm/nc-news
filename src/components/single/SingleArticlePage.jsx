import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getArticle, getComments, updateArticleVotes } from '../../utils/api';
import { ReadingSection } from './ReadingSection';
import { CommentSection } from './CommentSection';
import { LoadingItem } from '../LoadingItem';
import { HiArrowLongLeft } from "react-icons/hi2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const SingleArticlePage = () => {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [updatedArticle, setUpdatedArticle] = useState({});
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
            toast.error("Your vote was not counted!")
           })
        }
    }, [updatedArticle])

    if (isLoading) return <LoadingItem />
    return (
        <main className='container'>
            <Link to='/' className="back-link">
                <HiArrowLongLeft />
                <span>Back to articles</span>
            </Link>
            <ReadingSection article={article} setUpdatedArticle={setUpdatedArticle} />
            <CommentSection comments={comments} />
            <ToastContainer position="top-right" autoClose={5000} limit={3} />
        </main>
    )
}