import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoadingPost, errorPost] = useFetching(async (id) => {
        const response = await PostService.getPostById(id);
        setPost(response.data)
    });
    const [fetchComments, isLoadingComments, errorComments] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data)
    });

    useEffect(() => {
        fetchPostById(params.postId);
        fetchComments(params.postId);
    }, []);

    return (
        <div>
            <h1>Ви відкрили сторінку поста ID = {params.postId}</h1>

            {isLoadingPost 
                ? <Loader />
                : <div>{post.id}. {post.title}
                    <div>{post.body}</div>
                </div>
            }

            <h2>Коментарі</h2>

            {isLoadingComments
                ? <Loader/>
                : <div>
                    {comments.map(comment =>
                        <div key={comment.id} style={{marginTop: 15}}>
                            <h5>{comment.email}</h5>
                            <div>{comment.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;