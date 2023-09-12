import React from 'react';
import classes from './MyButton.module.css';

const MyButton = ({ children, onClickAction, ...props }) => {
    return (
        <button {...props} className={classes.myBtn} onClick={onClickAction}>
            {children}
        </button>
    );
};

export default MyButton;
