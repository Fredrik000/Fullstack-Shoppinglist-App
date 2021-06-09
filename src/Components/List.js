import React from 'react';
import ListItem from 'Components/ListItem';

import { ListGroup } from 'react-bootstrap';

function List(props) {
  return (
    <ListGroup as='ul'>
      {props.shoppinglist.map((item) => (
        <ListItem
          key={item.id}
          name={item.name}
          id={item.id}
          removeItem={props.removeItem}
        />
      ))}
    </ListGroup>
  );
}

export default List;
