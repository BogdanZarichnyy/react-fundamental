import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import MyButton from '../button/MyButton';

import { AuthContext } from "../../../context";

const Navbar = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
        navigate('/');
    }

    return (
        <div className='navbar'>
            {isAuth
                ?
                <MyButton onClickAction={logout}>
                    Вийти
                </MyButton>
                :
                <MyButton onClickAction={() => navigate('/login')}>
                    Авторизація
                </MyButton>
            }

            <div className='navbar__links'>
                <Link to='/'>Про сайт</Link>
                <Link to='/posts'>Пости</Link>
            </div>
        </div>
    );
};

export default Navbar;
