import React, { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState('Текст в середині заголовку');

    function increment() {
        setCount(count + 1);
    }

    function decrement() {
        setCount(count - 1);
    }

    return (
        <div>
            <h2>{count}</h2>
            <h2>{value}</h2>
            <input 
                type='text' 
                value={value} 
                onChange={event => setValue(event.target.value)} //двохстороннє зв'язування
            />
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

export default Counter;