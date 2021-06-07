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
    <div className='app'>
      <Container>
        <Navbar bg='primary' variant='dark'>
          <Navbar.Brand>Shoppingcart</Navbar.Brand>
        </Navbar>
        <Card>
          <Cart shoppingcart={shoppingcart} removeItem={removeItemHandler} />
          <InputGroup size='lg' as='form' onSubmit={addItemHandler}>
            <FormControl
              aria-label='Large'
              aria-describedby='inputGroup-sizing-sm'
              placeholder='Add item'
              value={enteredItem}
              onChange={itemChangeHandler}
            />
            <Button type='submit'>Add</Button>
          </InputGroup>
        </Card>
      </Container>
    </div>
  );
}

export default App;
