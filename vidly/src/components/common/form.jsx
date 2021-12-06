import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Dropdown from './dropdown'

class Form extends Component {
  state = {
    data: {},
    errors: {}
  }

  validate = () => {
    const options = { abortEarly: false }
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {}
    for (let item of error.details)
      errors[item.path[0]] = item.message

    return errors;
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }
  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  }

  handleChange = (e) => {
    const errors = { ...this.state.errors }

    const errorMessage = this.validateProperty(e.currentTarget)
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    const data = { ...this.state.data }
    data[e.currentTarget.name] = e.currentTarget.value
    this.setState({ data, errors });
  }

  handeSelectChange = (e) => {
    const errors = { ...this.state.errors }

    const errorMessage = this.validateProperty(e.currentTarget)
    console.log(errorMessage)
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    const data = { ...this.state.data };
    data.genres = [];
    this.setState({ data })
  }

  renderButton(label) {
    return (
      <button
        className="btn btn-primary mt-2"
        disabled={this.validate()}
      >
        {label}
      </button>
    );
  }

  renderDropdown(name, label, items) {
    return (
      <Dropdown
        error={this.state.errors[name]}
        id={name}
        name={name}
        label={label}
        items={items}
        value={this.state.data[name]}
        onChange={this.handleChange}
      ></Dropdown>
    );
  }

  renderInput(name, label, type = 'text') {
    return (
      <Input
        error={this.state.errors[name]}
        id={name}
        name={name}
        label={label}
        value={this.state.data[name]}
        type={type}
        onChange={this.handleChange}
      >
      </Input>
    );
  }


}

export default Form;