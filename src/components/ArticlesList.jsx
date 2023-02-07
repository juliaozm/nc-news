import { ArticleItem } from "./ArticleItem"

export const ArticlesList = ({articles}) => {
    return (
        <ul className="article-list">
            {articles.map(article => {
                return <ArticleItem key={article.article_id} article={article}/>
            })}
        </ul>
    )
}