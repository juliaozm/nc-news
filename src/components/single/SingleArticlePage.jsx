import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getArticle, getComments } from '../../utils/api';
import { ReadingSection } from './ReadingSection';
import { CommentSection } from './CommentSection';
import { LoadingItem } from '../LoadingItem';
import { HiArrowLongLeft } from "react-icons/hi2";


export const SingleArticlePage = () => {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getArticle(article_id), getComments(article_id)])
        .then(([articleFromAPI, commentsFromApi]) => {
           setArticle(articleFromAPI.data.article)
           setComments(commentsFromApi.data.comments)
           setLoading(false)
        })
    }, [article_id]);

    if (isLoading) return <LoadingItem />
    return (
        <main className='container'>
            <Link to='/' className="back-link">
                <HiArrowLongLeft />
                <span>Back to articles</span>
            </Link>
            <ReadingSection article={article} />
            <CommentSection comments={comments} />
        </main>
    )
}