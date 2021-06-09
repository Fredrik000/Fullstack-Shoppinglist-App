import React from 'react';
import Item from 'Components/Item';

import { ListGroup } from 'react-bootstrap';

function ItemList(props) {
  // Remove item from list
  const removeItemHandler = (id) => {
    props.setShoppinglist(props.shoppinglist.filter((item) => item.id !== id));

    // Add http DELETE request here
  };

  return (
    <ListGroup as='ul'>
      {props.shoppinglist.map((item) => (
        <Item
          key={item.id}
          name={item.name}
          id={item.id}
          removeItemHandler={removeItemHandler}
        />
      ))}
    </ListGroup>
  );
}

export default ItemList;
