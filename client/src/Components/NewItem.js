import React, { useState, useRef } from 'react';
import { InputGroup, Form, FormControl, Button } from 'react-bootstrap';
import useHttp from 'hooks/useHttp';

function NewItem(props) {
  const [validated, setValidated] = useState(true);

  const itemNameInputRef = useRef();
  const { sendRequest: sendItemRequest } = useHttp();

  // Temporary id. Item gets new id in backend
  const randomId = () => {
    return Math.floor(Math.random() * 10000000);
  };

  // POST item to list
  const addItemHandler = async (e) => {
    e.preventDefault();
    const enteredItemName = itemNameInputRef.current.value;

    // Validation
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    } else {
      setValidated(true);
    }

    const item = {
      id: randomId(),
      owner: props.user.email,
      name: enteredItemName,
    };

    props.setShoppinglist((prevItems) => {
      return [...prevItems, item];
    });

    sendItemRequest({
      url: 'http://localhost:5000/api/items',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { name: item.name },
    });

    itemNameInputRef.current.value = '';
  };

  return (
    <Form onSubmit={addItemHandler} validated={validated} noValidate>
      <InputGroup size='lg'>
        <FormControl placeholder='Add item' ref={itemNameInputRef} required />
        <Button className='text-light' type='submit'>
          Add
        </Button>
      </InputGroup>
    </Form>
  );
}

export default NewItem;
