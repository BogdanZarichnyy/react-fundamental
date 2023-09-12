import React from 'react';
import MyInput from './input/MyInput';
import MySelect from './select/MySelect';

const PostFilter = ({ filter, setFilter }) => {
    return (
        <div>
            <MyInput 
                value={filter.query}
                onChange={event => setFilter({ ...filter, query: event.target.value })}
                type="text"
                placeholder="Пошук..."
            />
            <MySelect 
                value={filter.sort}
                onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
                defaultValue="Сортування по"
                options={[
                    {value: 'title', name: 'По назві'},
                    {value: 'body', name: 'По опису'}
                ]}
            />
        </div>
    );
};

export default PostFilter;