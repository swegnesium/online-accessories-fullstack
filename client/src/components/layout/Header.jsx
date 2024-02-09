import * as styles from './Header.css';

import {BsFillPersonVcardFill} from 'react-icons/Bs'
import {IoLogOut} from 'react-icons/io5'
import { BsFillCartPlusFill } from 'react-icons/Bs';

import { Link } from 'react-router-dom';

import { useState } from 'react';
import { Container, Navbar, Nav, Button } from "react-bootstrap";

import OaButton from '../common/OaButton';
import Cart from '../features/cart/Cart';

import useAuth from '../../hooks/useAuth';
import { useCart } from '../../contexts/CartContext';



const Header = () => {
  const { user, logout } = useAuth()
  const [modalShow, setModalShow] = useState(false);
  const { cart } = useCart();

  return (

      <Navbar className={styles.navbar} 
        variant="light" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand className={styles.brandLink} as={Link} to='/'>
            <div className={styles.logoTextBox}>
              {/* <span className={styles.brand}>OA</span> */}
              <span className={styles.brandSub}>Online Accessories</span>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            {/* STANDARD NAVLINKS */}
            <Nav className='me-auto'>
              <Nav.Link className={styles.navLink} as={Link} to='/store/products'>Products</Nav.Link>
              <Nav.Link className={styles.navLink} as={Link} to='/support'>Support</Nav.Link>
            </Nav>
            {/* AUTH NAVLINKS */}
            <Nav>
              {/* Show if user is NOT logged in */}
              {!user && <Nav.Link className={styles.navLink} as={Link} to='/register'>register</Nav.Link>}
              {!user && <Nav.Link className={styles.navLink} as={Link} to='/login'>Login</Nav.Link>}
              {/* Show if user IS logged in */}
              {user && <Nav.Link className={styles.navLink} as={Link} to='/dashboard'>{user.username} <BsFillPersonVcardFill size="2em"/></Nav.Link>}

              {/* LOGOUT */}
              {user && <Nav.Link className={styles.navLink} onClick={() => logout()}><IoLogOut size="2em" /></Nav.Link>}

              {/* CART */}
              {user && <Nav.Link className={styles.navLink} onClick={() => setModalShow(true)}>

              <Button
                style={{ width: "3rem", height: "3rem", position: "relative" }}
                variant='outline-light'
                className='rounded-circle'
              >
                <BsFillCartPlusFill size="1.5rem" />

                {cart.length > 0 && (
                  <div
                    className='rounded-circle bg-danger d-flex justify-content-center align-items-center'
                    style={{
                      color: "white",
                      width: "1rem",
                      height: "1rem",
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      transform: "translate(25%, 25%)",
                    }}
                  >
                    {cart.length}
                  </div>
                )}
              </Button>
                </Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
          <Cart
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
      </Navbar>





  );
};

export default Header;
