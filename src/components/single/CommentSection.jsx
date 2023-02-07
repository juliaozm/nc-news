import { CommentItem } from './CommentItem';
import { LoadingItem } from '../LoadingItem';

export const CommentSection = ({comments}) => {

    return (
        <section className="comment-article">
          <h2>Comments</h2>
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