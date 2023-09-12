import { useMemo } from 'react';

export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        console.log('Відпрацювала функція сортування');
        if (sort) {
            return [...posts].sort((prevPost, post) => prevPost[sort].localeCompare(post[sort]));
        }
        return posts;
    }, [sort, posts]);

    return sortedPosts;
}

export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
    }, [query, sortedPosts]);

    return sortedAndSearchedPosts;
}