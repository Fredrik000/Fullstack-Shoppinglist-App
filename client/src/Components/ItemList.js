import React from 'react';
import useHttp from 'hooks/useHttp';
import Item from 'Components/Item';

import { ListGroup } from 'react-bootstrap';

function ItemList(props) {
  const { isLoading, error, sendRequest: deleteItemRequest } = useHttp();

  // DELETE item from list
  const removeItemHandler = async (id) => {
    props.setShoppinglist(props.shoppinglist.filter((item) => item.id !== id));

    deleteItemRequest({
      url: `http://localhost:5001/api/items/${id}`,
      method: 'DELETE',
    });
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
