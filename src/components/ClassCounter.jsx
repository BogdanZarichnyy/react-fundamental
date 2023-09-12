import React from 'react';

class ClassCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0, 
            value: 'Текст в середині заголовку'
        };
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    increment() {
        this.setState({ count: this.state.count + 1 });
    }

    decrement() {
        this.setState({ count: this.state.count - 1 });
    }

    render() {
        return (
            <div>
                <h2>{this.state.count}</h2>
                <h2>{this.state.value}</h2>
                <input 
                    type='text' 
                    value={this.state.value} 
                    onChange={event => this.setState({ value: event.target.value })} //двохстороннє зв'язування
                />
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
            </div>
        );
    };
};

export default ClassCounter;