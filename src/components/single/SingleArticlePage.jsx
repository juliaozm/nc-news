import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle, getComments, updateArticleVotes, postNewComment, deleteComment  } from '../../utils/api';
import { ReadingSection } from './ReadingSection';
import { CommentSection } from './comments/CommentSection';
import { BackLink } from '../BackLink';
import { LoadingItem } from '../LoadingItem';
import { toast } from 'react-toastify';

export const SingleArticlePage = () => {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [updatedArticle, setUpdatedArticle] = useState({});
    const [deletedComment, setDeletedComment] = useState({});
    const [newComment, setNewComment] = useState({});
    let [createdCommentId, setCreatedCommentId] = useState('');
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        Promise.all([getArticle(article_id), getComments(article_id)])
        .then(([articleFromAPI, commentsFromApi]) => {
           setArticle(articleFromAPI.data.article)
           setLoading(false)
           setComments(commentsFromApi.data.comments)
        })
    }, [article_id]);

    useEffect(() => {
        if (updatedArticle.inc_votes !== undefined) {
           updateArticleVotes(article_id, updatedArticle)
           .catch(err => {
                console.log(err)
                toast.error("Your vote hasn't been counted!", {
                    toastId: "error"        
                })
           })
        }
    }, [updatedArticle])

    useEffect(() => {
        if (newComment.author && newComment.body) {
            setComments((currComments) => [newComment, ...currComments]) 
            postNewComment(article_id, {
                username: newComment.author,
                body: newComment.body,
            })
            .then(posted => {
                setCreatedCommentId(posted.data.comment.comment_id)
            })
            .catch(err => {
                setComments((currComments) => {
                    return [...currComments].filter(comment => comment.comment_id !== undefined)
                })
                console.log(err)
                toast.error("Your comment hasn't been published!", {
                    toastId: "error"        
                })
            })
        }
    }, [newComment])

    useEffect(() => {
        setComments((currComments) => {
            return [...currComments].filter(comment => {
                if (comment.comment_id == undefined) {
                    comment.comment_id = createdCommentId
                } else {
                    return comment
                }
            })
        })
    }, [createdCommentId])

    useEffect(() => {
        if (deletedComment.comment_id) {
            setTimeout(() => setComments((currComments) => {
                return [...currComments].filter(comment => comment.comment_id !== deletedComment.comment_id)
            }), 500)
            deleteComment(deletedComment.comment_id)
            .catch(err => {
                console.log(err)
                setComments((currComments) => [deletedComment, ...currComments])
                toast.error("Your comment hasn't been deleted!", {
                    toastId: "error"        
                })
            })
        } 
    }, [deletedComment])

    if (isLoading) return <LoadingItem />
    return (
        <main className='container'>
            <BackLink />
            <ReadingSection article={article} setUpdatedArticle={setUpdatedArticle} />
            <CommentSection comments={comments} setNewComment={setNewComment} setDeletedComment={setDeletedComment} />
        </main>
    )
}