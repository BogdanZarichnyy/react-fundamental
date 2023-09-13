import React, { useContext }from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from "../../context";

import { publicRoutes, privateRoutes } from '../../router/routes';
import Loader from './Loader/Loader';

const AppRouter = () => {
    const { isAuth, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Loader />
    }

    return (
        <Routes>
            {isAuth
                ? privateRoutes.map(({path, Component}) => 
                    <Route 
                        key={path} 
                        path={path} 
                        element={<Component />}
                    />
                )
                : publicRoutes.map(({path, Component}) => 
                    <Route 
                        key={path} 
                        path={path} 
                        element={<Component />}
                    />
                )
            }
        </Routes>
    );
};

export default AppRouter;