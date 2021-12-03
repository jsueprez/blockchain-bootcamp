import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import 'bootstrap/dist/css/bootstrap.min.css';


class Counter extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-1">
                    <Badge className={this.getBadgeClasses()}>{this.formatCount()}</Badge>
                </div>
                <div className="col">
                    <Button
                        variant='primary'
                        className="btn-sm"
                        onClick={() => this.props.onIncrement(this.props.counter)}
                    >
                        +
                    </Button>
                    <Button
                        variant='secondary'
                        className={this.decrementDisable()}
                        onClick={() => this.props.onDecrement(this.props.counter)}
                    >
                        -
                    </Button>
                    <Button
                        variant='danger'
                        className="btn-sm"
                        onClick={() => this.props.onDelete(this.props.counter.id)}
                    >
                        x
                    </Button>
                </div>
            </div>
        );
    }

    decrementDisable() {
        let classes = 'm-2 btn-sm ';
        const { value } = this.props.counter;

        return value === 0 ? classes.concat('disabled') : classes;
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