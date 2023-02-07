import {useState, useEffect} from 'react'
import { ArticlesList } from './ArticlesList'
import { getArticlesList } from '../utils/api'
export const ArticlesListPage = () => {

    const [articlesList, setArticlesList] = useState([])

    useEffect(() => {
        getArticlesList()
        .then(response => {
            setArticlesList(response.data.articles)
        })
    }, [])

    return (
        <main>
           <h1>Recent articles</h1>
           <ArticlesList articles={articlesList} />
        </main>
    )
}