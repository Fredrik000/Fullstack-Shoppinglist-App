import React from 'react';

function CartItem(props) {
  return (
    <>
      <li className='cart-item'>
        <input type='checkbox' />
        <span>{props.name}</span>
        <i
          className='far fa-trash-alt'
          onClick={() => props.removeItem(props.id)}
        ></i>
      </li>
    </>
  );
}

export default CartItem;
