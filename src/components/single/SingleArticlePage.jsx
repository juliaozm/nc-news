import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getArticle } from '../../utils/api';
import { ReadingSection } from './ReadingSection';
import { LoadingItem } from '../LoadingItem';
import { HiArrowLongLeft } from "react-icons/hi2";


export const SingleArticlePage = () => {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getArticle(article_id)
        .then(articleFromAPI => {
           setArticle(articleFromAPI.data.article)
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
        </main>
    )
}