import {useState, useEffect} from 'react';
import { getArticlesList } from '../utils/api';
import { ArticlesList } from './ArticlesList';
import { LoadingItem } from './LoadingItem';

export const ArticlesListPage = () => {
    const [articlesList, setArticlesList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getArticlesList()
        .then(response => {
            setArticlesList(response.data.articles)
            setLoading(false)
        })
    }, []);

    if (isLoading) return <LoadingItem />
    return (
        <main className='articles-page'>
           <h1>Recent articles</h1>
           <ArticlesList articles={articlesList} />
        </main>
    )
}