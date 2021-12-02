import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Counter from './Counter'
import 'bootstrap/dist/css/bootstrap.min.css';

class Counters extends Component {
    render() {
        const { onReset, counters, onDelete, onIncrement } = this.props;
        return (
            <div>
                <Button
                    className="m-2"
                    onClick={() => onReset()}
                >
                    Reset
                </Button>
                {counters.map(counter => (
                    <Counter
                        key={counter.id}
                        counter={counter}
                        onIncrement={onIncrement}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        );
    }
}

export default Counters;