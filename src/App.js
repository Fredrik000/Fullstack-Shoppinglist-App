import React, { useState } from 'react';
import List from 'Components/List';

import {
  Container,
  Navbar,
  Card,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

function App() {
  const [enteredItem, setEnteredItem] = useState('');
  const [shoppinglist, setShoppinglist] = useState([]);

  const itemChangeHandler = (e) => {
    setEnteredItem(e.target.value);
  };

  const randomId = () => {
    return Math.floor(Math.random() * 100000);
  };

  const addItemHandler = (e) => {
    e.preventDefault();

    let item = {
      id: randomId(),
      name: enteredItem,
    };

    setShoppinglist([...shoppinglist, item]);

    setEnteredItem('');
  };

  const removeItemHandler = (id) => {
    setShoppinglist(shoppinglist.filter((item) => item.id !== id));
  };

  return (
    <Container className='d-flex flex-column min-vh-100 p-0' fluid>
      <Navbar className='justify-content-center' bg='primary' variant='dark'>
        <Navbar.Brand
          className='d-flex gap-3 h1 m-0'
          style={{ alignItems: 'center' }}
        >
          <i className='fas fa-shopping-cart' style={{ fontSize: '30px' }}></i>
          <h1 className='m-0'>Shoppinglist</h1>
        </Navbar.Brand>
      </Navbar>
      <Card
        as='main'
        className='justify-content-between flex-grow-1 p-1 border-0 rounded-0'
      >
        <List shoppinglist={shoppinglist} removeItem={removeItemHandler} />
        <InputGroup size='lg' as='form' onSubmit={addItemHandler}>
          <FormControl
            placeholder='Add item'
            value={enteredItem}
            onChange={itemChangeHandler}
          />
          <Button type='submit'>Add</Button>
        </InputGroup>
      </Card>
    </Container>
  );
}

export default App;
/*



*/
