import {useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { getArticlesList, fetchTopics } from '../utils/api';
import { ArticlesList } from './ArticlesList';
import { ArticleTopics } from './ArticleTopics';
import { LoadingItem } from './LoadingItem';

export const ArticlesListPage = () => {
    const [topics, setTopics] = useState([]);
    const [articlesList, setArticlesList] = useState([]);
    let [selectedTopic, setSelectedTopic] = useSearchParams('');
    const [isLoading, setLoading] = useState(true);
    
    let searchByTopic = selectedTopic.get('topic');

    useEffect(() => {
        getArticlesList(searchByTopic)
        .then(response => {
            setArticlesList(response.data.articles)
            setLoading(false)
        })
    }, [searchByTopic]);

    useEffect(() => {
        fetchTopics()
        .then(topicsFromApi => {
            setTopics(topicsFromApi.data.topics)
        })
    }, [])

    if (isLoading) return <LoadingItem />
    return (
        <main className='articles-page'>
           <ArticleTopics topics={topics} setSelectedTopic={setSelectedTopic} />
           <ArticlesList articles={articlesList} />
        </main>
    )
}