import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faMagnifyingGlass, faCirclePlus, faUser, faMartiniGlass } from '@fortawesome/free-solid-svg-icons';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

const Footer = () => {

  return (
    <Navbar variant="dark" fixed="bottom">
      <Nav className='container-fluid justify-content-around'>
        <Link to="/"><FontAwesomeIcon icon={ faMartiniGlass } /></Link>
        <Link to={Auth.loggedIn() ? "/create-drink" : "/login"}><FontAwesomeIcon icon={ faCirclePlus } /></Link>
        <Link to={Auth.loggedIn() ? "/barbooks" : "/login"}><FontAwesomeIcon icon={ faBook } /></Link>
      </Nav>
    </Navbar>
  );
};

export default Footer;
