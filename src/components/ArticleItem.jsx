import { Link } from 'react-router-dom';
import { HiChatBubbleLeftRight, HiStar } from "react-icons/hi2";

export const ArticleItem = ({article}) => {
    const date = new Date(Date.parse(article.created_at)).toLocaleString('en-GB', { timeZone: 'UTC'})
    return(
        <Link to={`/articles/${article.article_id}`} className="article-item">
            <li >
                <span className="topic">{article.topic}</span>
                <img src={article.article_img_url} alt={`image for ${article.title}`}></img>
                <div className="info">
                    <p className="title">{article.title}</p>
                    <p className="author">by {article.author}</p>
                </div>
                <p className="date">{date}</p>
                <div className='stats-block'>
                    <p className='vote'>
                        <HiStar />
                        <span>{article.votes} </span>
                    </p>    
                    <p className='comment'>
                        <HiChatBubbleLeftRight />
                        <span>{article.comment_count} </span>
                    </p> 
                </div>
            </li>
        </Link>
    )
}