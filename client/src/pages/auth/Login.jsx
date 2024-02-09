import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {Button, Form, Spinner} from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify'


import * as styles from './Login.css';
import OaCard from '../../components/common/OaCard';
import OaButton from '../../components/common/OaButton';

import { useAuth } from '../../contexts/AuthContext'

function Login() {
  const { loginSaveUser } = useAuth()
  const navigate = useNavigate();
  // This is what the server is expecting
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const {username, email, password} = user;

  // Handle state value changes on input change
  const handleTextChange = (e) => {
    setUser({
      // Gain Access to object with spread operator
      ...user,
      // Find input being changed, updates state accordingly
      [e.target.name]: e.target.value
    });
  }

  // Handle the form submission event
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    // API Call
    try {
      const response = await axios.post("/api/auth/login", user
      );
      // Call out Custom Hook
      loginSaveUser(response.data);
      // Take them to their Dashboard
      navigate('/dashboard')
    } catch (error) {
      console.log(error?.response);
      toast.error(error.response.data);
      setTimeout(() => {setLoading(false)}, 1000)
    }
  }
  return (
    <div className={styles.glowContainer}>
      <div className={styles.background}>
        <OaCard title="Log In" authForm>
        <Form onSubmit={handleSubmit}>

        {/* INPUT 1: EMAIL */}
        <Form.Group className="mb-3" controlId="email">
          <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={handleTextChange}/>
        </Form.Group>

        {/* PASSWORD */}
        <Form.Group className="mb-3" controlId="password">
          <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handleTextChange}/>
          <Form.Text className="text-muted">
            Forgotten your password? Unlucky
          </Form.Text>
        </Form.Group>

        <div className="d-grid gap-2">
          {/* BUTTON SUBMIT */}
          <OaButton 
            type="submit">
            {loading ? <Spinner
              as="span"
              animation='border'
              size='sm'
              role='status'
              aria-hidden="true"
            /> : "Submit"}
          </OaButton>
        </div>

      </Form>        

      {/* Bottom part of card */}
      <div className={styles.userNav}>
        <span>
          Not a member yet?&nbsp;
          <Link to="/register">Register free here</Link>
        </span>
      </div>
    </OaCard>
      </div>

    </div>
  )
}

export default Login