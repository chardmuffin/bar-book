import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faMagnifyingGlass, faCirclePlus, faUser, faMartiniGlass } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="bottom">
      <Nav className='container-fluid justify-content-around'>
        <Nav.Link href="#home"><FontAwesomeIcon icon={ faMartiniGlass } /></Nav.Link>
        <Nav.Link href="#search"><FontAwesomeIcon icon={ faMagnifyingGlass } /></Nav.Link>
        <Nav.Link href="#create"><FontAwesomeIcon icon={ faCirclePlus } /></Nav.Link>
        <Nav.Link href="#recipes"><FontAwesomeIcon icon={ faBook } /></Nav.Link>
        <Nav.Link href="#profile"><FontAwesomeIcon icon={ faUser } /></Nav.Link>
      </Nav>
  </Navbar>
  );
};

export default Footer;
