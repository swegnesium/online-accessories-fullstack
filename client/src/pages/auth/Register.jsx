import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import {Button, Form} from 'react-bootstrap';
import authService from '../../services/authServices';
import { toast } from 'react-toastify'


import * as styles from './Register.css';
import OaCard from '../../components/common/OaCard';
import OaButton from '../../components/common/OaButton';
import { useAuth } from '../../contexts/AuthContext';

function Register() {
  const {loginSaveUser} = useAuth();
  const navigate = useNavigate();
  const passwordConfirmRef = useRef();
  const [user, setUser] = useState({
    username: "",
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

    // PASSWORD CONFIRM CHECK
    if(password !== passwordConfirmRef.current.value){
      toast.error("Passwords do not match");
      setTimeout(() => {setLoading(false)}, 1000)
      return;
    }

    // API Call
    try {
      const response = await authService.register(user);
      // Automatically login user when they sign up
      loginSaveUser(response.data);
      navigate('/dashboard')
    } catch (error) {
      console.log(error);
      setTimeout(() => {setLoading(false)}, 1000)
    }
  }


  return (
    <OaCard title="Register" authForm>
        <Form onSubmit={handleSubmit}>
          {/* USERNAME */}
        <Form.Group className="mb-3" controlId="username">
          <Form.Control type="username" placeholder="Username" name="username" value={username} onChange={handleTextChange}/>
        </Form.Group>

        {/* EMAIL */}
        <Form.Group className="mb-3" controlId="email">
          <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={handleTextChange}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        {/* PASSWORD */}
        <Form.Group className="mb-3" controlId="password">
          <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handleTextChange}/>
        </Form.Group>

        {/* CONFIRM PASSWORD */}
        <Form.Group className="mb-3" controlId="password-confirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" ref={passwordConfirmRef} />
        </Form.Group>

        <div className="d-grid gap-2">
          {/* BUTTON SUBMIT */}
          <OaButton onClick={handleSubmit} variant="primary" type="submit">
            {loading ? "..." : "Submit"}
          </OaButton>
        </div>

      </Form>        

      {/* Bottom part of card */}
      <div className={styles.userNav}>
        <span>
          Already a member?&nbsp;
          <Link to="/login">Login Here</Link>
        </span>
      </div>
    </OaCard>
  )
}

export default Register