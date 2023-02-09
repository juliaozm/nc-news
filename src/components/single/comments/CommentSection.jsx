import { CommentItem } from './CommentItem';
import { LoadingItem } from '../../LoadingItem';
import { CommentAdder } from './CommentAdder';

export const CommentSection = ({comments, setNewComment}) => {
    return (
        <section className="comment-article">
            <h2>Comments</h2>
            <CommentAdder addNewComment={setNewComment} />
            {comments.length === 0 
            ?   <LoadingItem /> 
            :   <ul className='comment-list'>
                    {comments.map(comment => {
                        return <CommentItem key={comment.comment_id} comment={comment}/>}
                    )}
                </ul>
            } 
        </section>
    )
}