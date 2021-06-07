import React from 'react';
import CartItem from 'Components/CartItem';

import { ListGroup } from 'react-bootstrap';

function Cart(props) {
  return (
    <ListGroup as='ul'>
      {props.shoppingcart.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          id={item.id}
          removeItem={props.removeItem}
        />
      ))}
    </ListGroup>
  );
}

export default Cart;
