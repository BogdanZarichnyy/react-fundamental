import React, { useEffect, useRef, useState } from 'react';

// import Counter from './components/Counter';
// import ClassCounter from './components/ClassCounter';

import { usePosts } from '../hooks/usePosts';

import PostForm from '../components/UI/PostForm';
import PostList from '../components/PostList';
import PostFilter from '../components/UI/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import Loader from '../components/UI/Loader/Loader';
import PostService from '../API/PostService';
import Pagination from '../components/UI/pagination/Pagination';

import '../styles/App.css';

import { useFetching } from '../hooks/useFetching';
import { useObserver } from '../hooks/useObserver';
import { getPagesCount } from '../utils/pages';
import MySelect from '../components/UI/select/MySelect';

const Posts = () => {
    const [posts, setPosts] = useState([
        { id: 1, title: 'JavaScript 1', body: 'JavaScript - мова програмування' },
        { id: 2, title: 'JavaScript 2', body: 'JavaScript - мова програмування' },
        { id: 3, title: 'JavaScript 3', body: 'JavaScript - мова програмування' },
        { id: 4, title: 'asdrhgfuyw', body: 'qwerrtq' },
        { id: 5, title: 'bgfrxnjbkpj', body: 'hgjkn' },
        { id: 6, title: 'fgjgfyk', body: 'kjvcxhb9uys' },
    ]);

    // const [posts2, setPosts2] = useState([
    //     {id: 1, title: 'Python 1', body: 'Python - мова програмування'},
    //     {id: 2, title: 'Python 2', body: 'Python - мова програмування'},
    //     {id: 3, title: 'Python 3', body: 'Python - мова програмування'},
    // ]);

    // const [selectedSort, setSelectedSort] = useState('');
    // const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState({
        sort: '',
        query: ''
    });
    const [showModal, setShowModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    // const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    // const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
    const [fetchPosts, isPostsLoading, postsError] = useFetching(async (limit, page) => { //другий варіант як уникнути запізнення зі станом зміни сторінок
        const response = await PostService.getAll(limit, page);
        // setPosts(response.data.data); // пагінація по кнопках
        setPosts([ ...posts, ...response.data.data ]); // пагінація по скроллу - безкінечна стрічка
        setTotalPages(getPagesCount(response.totalCount, limit));
    });

    const lastElement = useRef(); // пагінація по скроллу - безкінечна стрічка // отримуємо посилання на останній елемент
    // const observer = useRef();

    // console.log(totalPages);

    // const getPages = useMemo(() => {
    //     let pagesArray = [];
    //     for (let i = 0; i < totalPages; i++) {
    //         pagesArray.push(i + 1);
    //     }
    //     console.log(pagesArray);
    // }, [totalPages]);


    // let pagesArray = getPagesArray(totalPages);
    // for (let i = 0; i < totalPages; i++) {
    //     pagesArray.push(i + 1);
    // }
    // console.log(pagesArray);

    // function getSortedPosts() { // потрібна мемоїзація щоб не викликати функцію кожного разу при пошуку
    //     console.log('Відпрацювала функція getSortedPosts()');
    //     if (selectedSort) {
    //         return [...posts].sort((prevPost, post) => prevPost[selectedSort].localeCompare(post[selectedSort]));
    //     }
    //     return posts;
    // }

    // const sortedPosts = getSortedPosts();

    // const sortedPosts = useMemo(() => {
    //     console.log('Відпрацювала функція сортування');
    //     if (filter.sort) {
    //         return [...posts].sort((prevPost, post) => prevPost[filter.sort].localeCompare(post[filter.sort]));
    //     }
    //     return posts;
    // }, [filter.sort, posts]);

    // const sortedAndSearchedPosts = useMemo(() => {
    //     return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()));
    // }, [filter.query, sortedPosts]);

    // useEffect(() => {
    //     if (isPostsLoading) return;
    //     if (observer.current) observer.current.disconnect();
    //     var callback = function(entries, observer) {
    //         if (entries[0].isIntersecting && page < totalPages) {
    //             // console.log(entries);
    //             console.log('Елемент div червоного кольору в зоні видимості');
    //             console.log('page', page);
    //             setPage(page + 1);
    //         }
    //     }
    //     observer.current = new IntersectionObserver(callback);
    //     observer.current.observe(lastElement.current);
    // }, [isPostsLoading]); // пагінація по скроллу - безкінечна стрічка

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    });

    useEffect(() => {
        // console.log('USE EFFECT');
        // fetchPosts();
        fetchPosts(limit, page); //другий варіант як уникнути запізнення зі станом зміни сторінок
    // }, []);  // пагінація по кнопках
    // }, [page]); // пагінація по скроллу - безкінечна стрічка
    }, [limit, page]); // пагінація по скроллу - безкінечна стрічка із вибором ліміту елементів на сторонці

    // async function fetchPosts() {
    //     setIsPostsLoading(true);
    //     setTimeout(async () => {
    //         const posts = await PostService.getAll();
    //         setPosts(posts);
    //         setIsPostsLoading(false);
    //     }, 1000)
    // }

    const createPost = (newPost) => {
        setPosts([ ...posts, newPost ]);
        setShowModal(false);
    }

    const removePost = (postId) => {
        // console.log(postId);
        setPosts(posts.filter(post => post.id !== postId));
    }

    const changePage = (page) => {
        setPage(page);
        // fetchPosts(); // додати в useEffect в масив залежностей параметр [page], оскільки реакт не встигає змінювати стан сторінки через асинхронність функції setPage(page)

        // fetchPosts(limit, page); //другий варіант як уникнути запізнення зі станом зміни сторінок // пагінація по кнопках
    }

    return (
        <div className="App">
            {/* <MyButton style={{ marginTop: '30px' }}
                onClickAction={fetchPosts}
            >
                Отримати пости
            </MyButton> */}
            <MyButton style={{ marginTop: '30px' }}
                onClickAction={() => setShowModal(true)}
            >
                Створити пост
            </MyButton>
            <MyModal visible={showModal} setVisible={setShowModal}>
                <PostForm posts={posts} create={createPost} />
            </MyModal>
            <hr style={{ margin: '15px 0' }}/>
            <PostFilter 
                filter={filter} 
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Кількість елеметів на сторінці'
                options={[
                    { value: 5, name: '5' },
                    { value: 10, name: '10' },
                    { value: 25, name: '25' },
                    { value: -1, name: 'Показати всі' }
                ]}
            />
            {postsError &&
                <div style={{ textAlign: 'center', margin: '20px 0', color: 'red' }}>
                    <h2>Сталася помилка при завантаженні постів: </h2>
                    <h2>{postsError}</h2>
                </div>
            }
            {/* {isPostsLoading // пагінація по кнопках
                ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} ><Loader /></div>
                : <PostList posts={sortedAndSearchedPosts} remove={removePost} title="Список постів про JavaScript" />
            } */}

            {isPostsLoading // пагінація по скроллу - безкінечна стрічка // в останній div передаємо ref
                ?? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} ><Loader /></div>
            }
            <PostList posts={sortedAndSearchedPosts} remove={removePost} title="Список постів про JavaScript" />
            <div ref={lastElement} style={{height: 20, background: 'red'}}/>

            {isPostsLoading && // пагінація по скроллу - безкінечна стрічка
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            }

            <Pagination 
                page={page} 
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
};

export default Posts;