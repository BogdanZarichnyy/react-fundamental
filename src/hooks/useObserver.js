import { useEffect, useRef } from 'react';

export const useObserver = (ref, canLoad, isPostsLoading, callback) => {
    const observer = useRef();

    useEffect(() => {
        if (isPostsLoading) return;
        if (observer.current) observer.current.disconnect();
        var cb = function(entries, observer) {
            if (entries[0].isIntersecting && canLoad) {
                // console.log(entries);
                console.log('Елемент div червоного кольору в зоні видимості');
                callback();
            }
        }
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current);
    }, [isPostsLoading]); // пагінація по скроллу - безкінечна стрічка
}