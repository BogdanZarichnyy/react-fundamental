import React from 'react';
import { getPagesArray } from '../../../utils/pages';

// import classes from './Pagination.module.css';

const Pagination = ({ totalPages, page, changePage }) => {
    let pagesArray = getPagesArray(totalPages);

    return (
        <div className='page__wrapper'>
            {pagesArray.map((numberPage) => 
                <span 
                    onClick={() => changePage(numberPage)}
                    key={numberPage} 
                    className={page === numberPage ? 'page page__current' : 'page'}
                >
                    {numberPage}
                </span>
            )}
        </div>
    );
};

export default Pagination;