export const ArticleItem = ({article}) => {
    return(
        <li className="article-item">
            <span className="topic">{article.topic}</span>
            <img src={article.article_img_url} alt={`image for ${article.title}`}></img>
                <div className="info">
                    <p className="title">{article.title}</p>
                    <p className="author">by {article.author}</p>
                </div>
                <p className="date">{article.created_at}</p>
                <p className="comment">{article.comment_count} comments </p>
        </li>
    )
}