import React from 'react';
import { Navbar } from 'react-bootstrap';

function Nav() {
  return (
    <Navbar className='justify-content-center' bg='primary' variant='dark'>
      <Navbar.Brand
        className='d-flex gap-3 h1 m-0'
        style={{ alignItems: 'center' }}
      >
        <i className='fas fa-shopping-cart' style={{ fontSize: '30px' }}></i>
        <h1 className='m-0'>Shoppinglist</h1>
      </Navbar.Brand>
    </Navbar>
  );
}

export default Nav;
