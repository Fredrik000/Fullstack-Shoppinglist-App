import React, { useState } from 'react';
import useHttp from 'hooks/useHttp';

import { InputGroup, Form, FormControl, Button } from 'react-bootstrap';

function NewItem(props) {
  const [enteredItemName, setEnteredItemName] = useState('');
  const [validated, setValidated] = useState(false);
  const { sendRequest: sendItemRequest } = useHttp();

  const itemChangeHandler = (e) => {
    setEnteredItemName(e.target.value);
  };

  // Temporary id. Item gets new id in backend
  const randomId = () => {
    return Math.floor(Math.random() * 10000000);
  };

  // POST item to list
  const addItemHandler = async (e) => {
    // Validation
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

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
  };

  return (
    <Form onSubmit={addItemHandler} validated={validated} noValidate>
      <InputGroup size='lg'>
        <FormControl
          placeholder='Add item'
          onChange={itemChangeHandler}
          required
        />
        <Button className='text-light' type='submit'>
          Add
        </Button>
      </InputGroup>
    </Form>
  );
}

export default NewItem;
