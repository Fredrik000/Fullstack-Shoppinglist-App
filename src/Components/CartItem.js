import React from 'react';

import { ListGroup } from 'react-bootstrap';

function CartItem(props) {
  return (
    <>
      <ListGroup.Item
        as='li'
        action
        className='d-flex justify-content-between h2'
        style={{ alignItems: 'center' }}
      >
        <input className='form-check-input' type='checkbox'></input>
        <span>{props.name}</span>
        <i
          className='far fa-trash-alt'
          onClick={() => props.removeItem(props.id)}
        ></i>
      </ListGroup.Item>
    </>
  );
}

export default CartItem;
