import React, { useState } from 'react';

import { ListGroup } from 'react-bootstrap';

function Item(props) {
  const [checked, setChecked] = useState(false);

  const checkboxHandler = () => {
    if (!checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  let labelClass = `form-check-label ${
    !checked ? '' : 'text-decoration-line-through text-muted'
  }`;

  return (
    <>
      <ListGroup.Item
        as='li'
        action
        className='d-flex justify-content-between h2'
        style={{ alignItems: 'center' }}
      >
        <input
          className='form-check-input'
          type='checkbox'
          id='cb'
          onChange={checkboxHandler}
        ></input>
        <label className={labelClass} htmlFor='cb'>
          {props.name}
        </label>
        <i
          className='far fa-trash-alt'
          onClick={() => props.removeItemHandler(props.id)}
        ></i>
      </ListGroup.Item>
    </>
  );
}

export default Item;
