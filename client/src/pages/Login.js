import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();
  
    try {
      const { data } = await login({
        variables: { ...formState }
      });
  
      Auth.login(data.login.token)
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className='container-fluid'>
      <Link to="/signup"><Button variant="success" className='float-right'>Sign up</Button></Link>
      <h3>Log In</h3>
      <Form onSubmit={handleFormSubmit}>
        <Form.Floating className="mb-3">
          <Form.Control
            id="email"
            type="email"
            name="email"
            value={formState.email}
            placeholder="name@example.com"
            onChange={handleChange}
          />
          <label className="floating-label" htmlFor='email'>Email</label>
        </Form.Floating>

        <Form.Floating className="mb-3">
          <Form.Control
            id="password"
            type="password"
            name="password"
            value={formState.password}
            placeholder="Password"
            onChange={handleChange}
          />
          <label className="floating-label" htmlFor='password'>Password</label>
        </Form.Floating>

        <Form.Group as={Row} className="mb-3" controlId="rememberMe">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="Remember me" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Log In</Button>
          </Col>
        </Form.Group>
      </Form>
      {error && <div>Login failed!</div>}
    </main>
  );
};

export default Login;
