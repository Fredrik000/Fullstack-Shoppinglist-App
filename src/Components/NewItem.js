import React, { useState } from 'react';
import useHttp from 'hooks/useHttp';

import { InputGroup, FormControl, Button } from 'react-bootstrap';

function NewItem(props) {
  const [enteredItemName, setEnteredItemName] = useState('');
  const { isLoading, error, sendRequest: sendItemRequest } = useHttp();

  const itemChangeHandler = (e) => {
    setEnteredItemName(e.target.value);
  };

  // Item gets new id in backend
  const randomId = () => {
    return Math.floor(Math.random() * 100000);
  };

  // Add item to list
  const addItemHandler = async (e) => {
    e.preventDefault();

    const item = {
      id: randomId(),
      name: enteredItemName,
    };

    props.setShoppinglist((prevItems) => {
      return [...prevItems, item];
    });

    sendItemRequest({
      url: 'https://shoppinglist-698ac-default-rtdb.europe-west1.firebasedatabase.app/shoppinglist.json',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { name: item.name },
    });

    setEnteredItemName('');
  };

  return (
    <InputGroup size='lg' as='form' onSubmit={addItemHandler}>
      <FormControl
        placeholder='Add item'
        value={enteredItemName}
        onChange={itemChangeHandler}
      />
      <Button type='submit'>Add</Button>
    </InputGroup>
  );
}

export default NewItem;
