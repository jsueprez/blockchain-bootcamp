import React from 'react';

const Dropdown = ({ name, label, error, items, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}> {label}</label>
      <select id={name} name={name} className="form-select" {...rest}>
        <option value=""></option>
        {items.map(item => (
          <option
            key={item._id} value={item._id}>
            {item.name}
          </option>)
        )}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div >
  );
}

export default Dropdown;