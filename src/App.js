import React, { useState } from 'react';
import Cart from 'Components/Cart';

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
  const [shoppingcart, setShoppingcart] = useState([]);

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

    setShoppingcart([...shoppingcart, item]);

    setEnteredItem('');
  };

  const removeItemHandler = (id) => {
    setShoppingcart(shoppingcart.filter((item) => item.id !== id));
  };

  return (
    <Container className='bg-dark min-vh-100 p-0' fluid>
      <Navbar className='justify-content-center' bg='primary' variant='dark'>
        <Navbar.Brand
          className='d-flex gap-3 h1 m-0'
          style={{ alignItems: 'center' }}
        >
          <i className='fas fa-shopping-cart' style={{ fontSize: '32px' }}></i>
          <h1>Shoppingcart</h1>
        </Navbar.Brand>
      </Navbar>
      <Card
        as='main'
        className='justify-content-between px-5 py-2 border-0 rounded-0'
      >
        <Cart shoppingcart={shoppingcart} removeItem={removeItemHandler} />
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
