import { CommentItem } from './CommentItem';

export const CommentSection = ({comments}) => {
    return (
        <section className="comment-article">
          <h2>Comments</h2>
            <ul className='comment-list'>
                {comments.map(comment => {
                    return <CommentItem key={comment.comment_id} comment={comment}/>}
                )}
            </ul>   
        </section>
    )
}