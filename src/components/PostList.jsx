import React from 'react';
import PostItem from './PostItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const PostList = ({posts, remove, title}) => {

    if (!posts.length) {
        return (
            <h2 style={{ textAlign: "center" }}>
                Пости не знайдені
            </h2>
        )
    }

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>
                {title}
            </h1>
            <TransitionGroup>
                {posts.map((post, index) => 
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        className="post"
                    >
                        <PostItem post={post} number={index + 1} removePost={remove} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </>
    );
};

export default PostList;