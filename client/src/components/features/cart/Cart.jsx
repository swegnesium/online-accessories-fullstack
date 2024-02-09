import * as styles from './Cart.css'

import { useState, useEffect } from 'react';
import { useCart } from '../../../contexts/CartContext';

import {Button, Modal, Image, Row, Col} from 'react-bootstrap';

import { FaMinusCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { MdRemoveShoppingCart } from "react-icons/md";

function Cart(props) {

  const { cart, totalPrice, removeFromCart } = useCart()


  return (
    <Modal
      className={styles.modalMain}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className={styles.modalHeader}>
        <Modal.Title id="contained-modal-title-vcenter">
          Your Cart
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
          {/* Titles */}
          <Row className={styles.cartTitles}>
            <Col>
                    
            </Col>
            <Col className={styles.cartTitle}>
              Product:
            </Col>

            <Col className={styles.cartTitle}>
              Quantity:
            </Col>

            <Col className={styles.cartTitle}>
              Subtotal:
            </Col>
          </Row>
            {cart.map((product) => (
              <div className={styles.cartItemBox} key={product.id}>
                <li key={product.id} className={styles.cartItem}>
                <MdRemoveShoppingCart onClick={() => removeFromCart(product)}/>
                  <Row>
                    {/* PRODUCT IMAGE */}
                    <Col>
                    <Image src={product.image} className={styles.productImage}></Image>
                    </Col>
                    {/* PRODUCT NAME */}
                    <Col className={styles.cartProductName}>
                    {product.name} 
                    </Col>
                    {/* QUANTITY */}
                    <Col className={styles.cartProductQuantity}>
                      <Row>
                        <Col>
                          <FaMinusCircle />
                        </Col>
                        <Col>
                          {product.quantity}
                        </Col>
                        <Col>
                          <FaCirclePlus />
                        </Col>
                      </Row>
                    </Col>
                    {/* SUBTOTAL */}
                    <Col className={styles.cartProductPrice}>
                    {product.price}
                    </Col>
                  </Row>
                </li>
              </div>

            ))}
          </ul>
        )}
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col className={styles.totalPrice}>
            Total: ${totalPrice}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button onClick={props.onHide}>Checkout</Button>
        <Button variant='secondary' onClick={props.onHide}>Continue Shopping
</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Cart