import About from '../pages/About';
import Posts from '../pages/Posts';
import PostIdPage from '../pages/PostIdPage';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

export const privateRoutes= [
    { path:'/', Component: About },
    { path:'/posts', Component: Posts },
    { path:'/posts/:postId', Component: PostIdPage },
    { path:'/login', Component: About },
    { path:'*', Component: NotFound },
];

export const publicRoutes = [
    { path:'/', Component: About },
    { path:'/login', Component: Login },
    { path:'*', Component: NotFound },
];