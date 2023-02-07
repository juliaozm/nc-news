export const CommentItem = ({comment}) => {
    const date = new Date(Date.parse(comment.created_at)).toLocaleString('en-GB', { timeZone: 'UTC'})

    return <li className="comment-item">
                <div className="header">
                    <h3>{comment.author}</h3>
                    <span className="date">{date}</span>
                </div>
                <p className="text">{comment.body}</p>
                <div className="upvote">
                    <button>Upvote</button>
                    <button>Downvote</button>
                    {comment.votes > 0 
                        ? <span className="green">{comment.votes}</span> 
                        : <span className="red">{comment.votes}</span>
                    }
                </div>
            </li>
}