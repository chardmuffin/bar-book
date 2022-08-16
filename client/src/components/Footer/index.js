import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faMagnifyingGlass, faCirclePlus, faUser, faMartiniGlass } from '@fortawesome/free-solid-svg-icons'
import Auth from '../../utils/auth'

const Footer = () => {

  return (
    <Navbar variant="dark" fixed="bottom">
      <Nav className='container-fluid justify-content-around'>
        <Nav.Link href="/"><FontAwesomeIcon icon={ faMartiniGlass } /></Nav.Link>
        <Nav.Link href="/search"><FontAwesomeIcon icon={ faMagnifyingGlass } /></Nav.Link>
        <Nav.Link href={Auth.loggedIn() ? "/create-drink" : "/login"}><FontAwesomeIcon icon={ faCirclePlus } /></Nav.Link>
        <Nav.Link href={Auth.loggedIn() ? "/barbooks" : "/login"}><FontAwesomeIcon icon={ faBook } /></Nav.Link>
        <Nav.Link href={Auth.loggedIn() ? `/profile/${Auth.getProfile().data.username}` : "/login"}><FontAwesomeIcon icon={ faUser } /></Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Footer;
