import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { Container, Card, Spinner } from 'react-bootstrap';
import useHttp from 'hooks/useHttp';
import ItemList from 'Components/ItemList';
import NewItem from 'Components/NewItem';
import Nav from 'Components/Nav';
import Login from 'Components/Login';

function App() {
  const history = useHistory();
  const [shoppinglist, setShoppinglist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Get shoppinglist from Backend
  const { isLoading, sendRequest: fetchShoppinglist } = useHttp();

  useEffect(() => {
    // Get token from local storage
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      setIsLoggedIn(true);
      history.replace('/');
    }
  }, [history]);

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
        url: 'http://localhost:5000/api/items',
      },
      transformShoppinglist
    );
  }, [fetchShoppinglist]);

  return (
    <div className='bg-dark'>
      <Container className='d-flex flex-column min-vh-100 p-0'>
        <Nav />
        <Switch>
          {!isLoggedIn && (
            <Route path='/' exact>
              <Redirect to='/login' />
            </Route>
          )}
          {!isLoggedIn && (
            <Route path='/login' exact>
              <Login onLogin={setIsLoggedIn} />
            </Route>
          )}
          {isLoggedIn && (
            <Route path='/' exact>
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
            </Route>
          )}
        </Switch>
      </Container>
    </div>
  );
}

export default App;
