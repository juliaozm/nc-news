import {useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { getArticlesList, fetchTopics } from '../utils/api';
import { ArticlesList } from './ArticlesList';
import { ArticleTopics } from './ArticleTopics';
import { ArticlesSortBy } from './ArticlesSortBy';
import { LoadingItem } from './LoadingItem';

export const ArticlesListPage = () => {
    const [topics, setTopics] = useState([]);
    const [articlesList, setArticlesList] = useState([]);
    let [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setLoading] = useState(true);
    
    let topic = searchParams.get('topic');
    let sortBy = searchParams.get('sort_by');
    let order = searchParams.get('order');

    useEffect(() => {
        getArticlesList(topic, sortBy, order)
        .then(response => {
            setArticlesList(response.data.articles)
            setLoading(false)
        })
    }, [topic, sortBy, order]);

    useEffect(() => {
        fetchTopics()
        .then(topicsFromApi => {
            setTopics(topicsFromApi.data.topics)
        })
    }, [])

    if (isLoading) return <LoadingItem />
    return (
        <main className='articles-page'>
           <ArticleTopics topics={topics} setSelectedTopic={setSearchParams} />
           <ArticlesSortBy setSelectedSortBy={setSearchParams} />
           <ArticlesList articles={articlesList} />
        </main>
    )
}