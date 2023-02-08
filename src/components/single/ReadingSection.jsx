import { useState } from 'react';
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";

export const ReadingSection = ({article, setUpdatedArticle}) => {
    const date = new Date(Date.parse(article.created_at)).toLocaleString('en-GB', { timeZone: 'UTC'})

    const [activeBtn, setActiveBtn] = useState("");

    const handleVote = (e) => {
        e.preventDefault();
        if (activeBtn === "") {
            article.votes += 1
            setActiveBtn("like");
            setUpdatedArticle (values => ({...values, inc_votes: +1}));
            return;
        } else if (activeBtn === 'like') {
            article.votes -= 1
            setActiveBtn("none");
            setUpdatedArticle (values => ({...values, inc_votes: -1})); 
            return;
        } else if (activeBtn === "none") {
            article.votes -= 1
            setActiveBtn("dislike");
            setUpdatedArticle (values => ({...values, inc_votes: -1})); 
        } else if (activeBtn === "dislike") {
            article.votes += 1
            setActiveBtn("");
            setUpdatedArticle (values => ({...values, inc_votes: +1}));
        }
    }
       
    return (
        
        <article className="read-article">
            <span>{date}</span>
            <h1>{article.title}</h1>
            <h2>by <em>{article.author}</em> in <em>{article.topic}</em></h2>
            <img src={article.article_img_url} alt={`image for ${article.title}`}></img>
            <p>{article.body}</p>
            <p>{article.body}</p>
            <div className="vote">
                <button 
                    onClick={handleVote}> 
                    {!activeBtn || activeBtn === "none" ? <span className="neutral"> <IoMdThumbsUp/> {article.votes}  <IoMdThumbsDown/> </span> : ''} 
                    {activeBtn === "like" ? <span className="like-active"> Upvoted <IoMdThumbsUp fill="#0e8542" /> {article.votes}  </span> : ''} 
                    {activeBtn === "dislike" ? <span className="dislike-active"> Downvoted <IoMdThumbsDown fill="#FF0063" /> {article.votes} </span> : ''} 
                </button>                
            </div>
        </article>
    )
}