import React, { useRef, useState } from 'react';

import MyButton from './button/MyButton';
import MyInput from './input/MyInput';

const PostForm = ({ create }) => {
    const [post, setPost] = useState({
        title: '', 
        body: ''
    });
    // const [title, setTitle] = useState('');
    // const [body, setBody] = useState('');
    // const bodyInputRef = useRef();

    const addNewPost = (event) => {
        event.preventDefault();

        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost);

        // console.log(title);
        // console.log(body);
        // console.log(bodyInputRef.current.value);

        // const newPost = {
        //     id: Date.now(),
        //     title, 
        //     body
        // };

        // setPosts(prevPosts => [...prevPosts, newPost]);
        // setTitle('');
        // setBody('');

        // setPosts([ ...posts, { ...post, id: Date.now() } ]);
        
        setPost({
            title: '', 
            body: ''
        });
    }

    return (
        <form>
            {/* Управляємий компонент */}
            <MyInput 
                value={post.title} 
                type="text" 
                placeholder="Назва посту" 
                onChange={event => setPost({ ...post, title: event.target.value })}
            />
            <MyInput 
                value={post.body} 
                type="text" 
                placeholder="Опис посту" 
                onChange={event => setPost({ ...post, body: event.target.value })}
            />
            {/* Не управляємий компонент */}
            {/* <input ref={bodyInputRef} type="text" placeholder="Опис посту" /> */}
            {/* <MyInput 
                ref={bodyInputRef}
                type="text" 
                placeholder="Опис посту" 
            /> */}
            <MyButton onClickAction={addNewPost} >
                Створити пост
            </MyButton>
        </form>
    );
};

export default PostForm;