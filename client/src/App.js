import React, { useState, useEffect } from 'react';
import useHttp from 'hooks/useHttp';
import ItemList from 'Components/ItemList';
import NewItem from 'Components/NewItem';

import { Container, Navbar, Card, Spinner } from 'react-bootstrap';

function App() {
  const [shoppinglist, setShoppinglist] = useState([]);

  // Get shoppinglist from Backend
  const { isLoading, sendRequest: fetchShoppinglist } = useHttp();

  useEffect(() => {
    // Transform data, recieved from Backend
    const transformShoppinglist = (responseData) => {
      const loadedItems = [];

      for (const key in responseData.items) {
        loadedItems.push({
          id: responseData.items[key].id,
          name: responseData.items[key].name,
        });
      }
      setShoppinglist(loadedItems);
    };

    // GET data on page load
    fetchShoppinglist(
      {
        url: 'http://localhost:5001/api/items',
      },
      transformShoppinglist
    );
  }, [fetchShoppinglist]);

  return (
    <div className='bg-dark'>
      <Container className='d-flex flex-column min-vh-100 p-0'>
        <Navbar className='justify-content-center' bg='primary' variant='dark'>
          <Navbar.Brand
            className='d-flex gap-3 h1 m-0'
            style={{ alignItems: 'center' }}
          >
            <i
              className='fas fa-shopping-cart'
              style={{ fontSize: '30px' }}
            ></i>
            <h1 className='m-0'>Shoppinglist</h1>
          </Navbar.Brand>
        </Navbar>
        <Card
          as='main'
          className='justify-content-between flex-grow-1 p-1 border-0 rounded-0'
        >
          {isLoading && (
            <div className='d-flex justify-content-center'>
              <Spinner variant='primary' animation='border' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </Spinner>
            </div>
          )}

          {!isLoading && (
            <ItemList
              shoppinglist={shoppinglist}
              setShoppinglist={setShoppinglist}
            />
          )}
          <NewItem setShoppinglist={setShoppinglist} />
        </Card>
      </Container>
    </div>
  );
}

export default App;
