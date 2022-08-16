import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, } from '@fortawesome/free-solid-svg-icons';
import Auth from '../../utils/auth';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {

  let nav = useNavigate();
  const [isLoginPage, setIsLoginPage] = useState(false);

  const url = window.location.href;

  // link to /search for display results
  function onSubmit(event) {
    event.preventDefault();
    
    nav(`/search/${event.target.value}`, { replace: true });
  }

  useEffect(() => {
    if (url.length >= 5 && url.substring(url.length - 5) === "login") {
      setIsLoginPage(true);
    }
    else {
      setIsLoginPage(false);
    }
  }, [url])

  console.log(isLoginPage)

  return (
    (!isLoginPage) ?
      (<Navbar variant="dark" fixed="top">
        <Nav className='container-fluid justify-content-around'>
          <FontAwesomeIcon icon={ faMagnifyingGlass } />
          <Link to="/search">
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control type="textarea" rows={1} placeholder="old fashioned" onChange={onSubmit} />
              </Form.Group>
            </Form>
          </Link>
          <Link to={ Auth.loggedIn() ? `/profile/${Auth.getProfile().data.username}` : "/login" }>
            {Auth.loggedIn() ? <FontAwesomeIcon icon={ faUser } /> : <Button variant="success" className='float-right'>Log In</Button>}
          </Link>
        </Nav>
      </Navbar>
    ) : (
      <></>
    )
  );
};

export default Header;