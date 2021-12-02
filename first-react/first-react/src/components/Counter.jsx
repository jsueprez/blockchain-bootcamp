import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import 'bootstrap/dist/css/bootstrap.min.css';


class Counter extends Component {

    render() {
        return (
            <div>
                <Badge className={this.getBadgeClasses()}>{this.formatCount()}</Badge>
                <Button
                    variant='primary'
                    className="m-2"
                    onClick={() => this.props.onIncrement(this.props.counter)}
                >
                    Increment
                </Button>
                <Button
                    variant='danger'
                    className="m-2"
                    onClick={() => this.props.onDelete(this.props.counter.id)}
                >
                    Delete
                </Button>
            </div>
        );
    }

    getBadgeClasses() {
        let classes = 'm-2 ';
        return this.props.counter.value === 0 ? classes.concat('bg-warning') : classes.concat('bg-primary');
    }

    formatCount() {
        const { value } = this.props.counter;
        return value === 0 ? 'Zero' : value;
    }
}

export default Counter;