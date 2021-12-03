import React, { Component } from 'react';
import Counter from './Counter'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';

class Counters extends Component {
    render() {
        const { onReset, counters, onDelete, onIncrement, onDecrement } = this.props;
        return (
            <div>
                <Button
                    className="m-2"
                    onClick={onReset}
                >
                    Reset
                </Button>
                {counters.map(counter => (
                    <Counter
                        key={counter.id}
                        counter={counter}
                        onIncrement={onIncrement}
                        onDecrement={onDecrement}
                        onDelete={onDelete}
                    />
                ))}
            </div>

        );
    }
}

export default Counters;