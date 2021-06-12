import React, { useState } from 'react';
import useHttp from 'hooks/useHttp';

import { InputGroup, FormControl, Button } from 'react-bootstrap';

function NewItem(props) {
  const [enteredItemName, setEnteredItemName] = useState('');
  const { isLoading, error, sendRequest: sendItemRequest } = useHttp();

  const itemChangeHandler = (e) => {
    setEnteredItemName(e.target.value);
  };

  // Temporary id. Item gets new id in backend
  const randomId = () => {
    return Math.floor(Math.random() * 10000000);
  };

  // POST item to list
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
      url: 'http://localhost:5001/api/items',
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
      <Button className='text-light' type='submit'>
        Add
      </Button>
    </InputGroup>
  );
}

export default NewItem;
