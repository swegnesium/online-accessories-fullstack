import * as styles from './OaPanelBox.css'

import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'


import { useAuth } from '../../contexts/AuthContext';
import productService from '../../services/productServices'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Spinner, Modal, Button } from 'react-bootstrap';
import OaButtonSecondary from '../common/OaButtonSecondary'
import OaLoader from './OaLoader';


function OaPanelBox(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]); // Array to store all products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const effectRan = useRef(false);

  useEffect(() => {
    if (!effectRan.current) {
      fetchProducts();
      setLoading(false);

      return () => {
        effectRan.current = true;
      };
    }
  }, []);


  // Fetch all products
  async function fetchProducts() {
    try {
      const response = await productService.getAll();
      const fetchedProducts = response.data;

      setProducts(fetchedProducts);
    } catch (error) {
      console.log(error?.response);
      setError(true);
    }
  }

  // DELETE FUNCTION
  const handleDelete = async (productId) => {
    setLoading(true);

    try {
      const response = await productService.del(productId);
      console.log(response);

      if (response.status === 200) {
        setLoading(false);
        handleClose();

        toast.success("Product deleted Successfully!")
        navigate('/dashboard');
      } else {
        console.error('Deletion was not successful');
      }
    } catch (error) {
      console.log(error);
      setError(true);
      toast.error("Error deleting Product, see support")
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  };
//    CONDITIONAL LOAD: ERROR
   if (error) {
    return (
      <div className='text-center mt-5'>
        <p>Error loading data...</p>

      </div>
    )
  }

  // CONDITIONAL LOAD: LLOADING
  if (loading && effectRan.current === false) {
    return (
      <div className='text-center mt-4'>
        <OaLoader />
      </div>
    )
  }

  return (
    <div>
      <div className={styles.panelBox}>
          <div className={styles.boxContent}>
              <div className={styles.title}>
                  <p >Product: {props.name}</p>
              </div>
  
              <div className={styles.button}>
                  <OaButtonSecondary onClick={handleShow}>REMOVE</OaButtonSecondary>
              </div>
  
              <Modal show={show} onHide={handleClose} className={styles.modalBox} centered>
                  <Modal.Header className={styles.modalHeader}>
                  <Modal.Title className={styles.modalTitle}>ARE YOU SURE?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className={styles.modalBody}>
                      <Button variant='secondary' onClick={handleClose} className='m-2'>
                          No, close
                      </Button>
                      {/*-------- DELETE ITEM --------*/}
                      <OaButtonSecondary onClick={() => handleDelete(props.id)} loadingState={loading}>
                        {loading ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          'Yes, Delete'
                        )}
                      </OaButtonSecondary>
                  </Modal.Body>
                  <Modal.Footer className={styles.modalFooter}>  
                          <p className={styles.modalFooterText}>This action cannot be reverted</p>
                  </Modal.Footer>
              </Modal>
          </div>
      </div>
    </div>
    )
}

export default OaPanelBox