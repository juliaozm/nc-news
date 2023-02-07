export const ReadingSection = ({article}) => {
    const date = new Date(Date.parse(article.created_at)).toLocaleString()
    return (
        <article className="read-article">
            <span>{date}</span>
            <h1>{article.title}</h1>
            <h2>by <em>{article.author}</em> in <em>{article.topic}</em></h2>
            <img src={article.article_img_url} alt={`image for ${article.title}`}></img>
            <p>{article.body}</p>
            <p>{article.body}</p>
        </article>
    )
}