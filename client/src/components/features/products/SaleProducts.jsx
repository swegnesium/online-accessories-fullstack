import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as styles from './SaleProducts.css'


import Container from "react-bootstrap/Container";
import ProductsList from './ProductsList';

const SaleProducts = () => {
   // PRODUCTS STATE
   const [data, setData] = useState([])
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
 
   const effectRan = useRef(false);
   useEffect(() => {
    if(effectRan.current === false) {
      fetchSaleProducts();
      setLoading(false);

      return () => {
        effectRan.current = true;
      }
    }
  }, [])


   async function fetchSaleProducts() {
    try {
      // API Request
      const response = await axios.get('http://localhost:5000/api/products/onsale')
      // Store the response in data
      const data = response.data;

      console.log(data)
      setData(data)
    } catch (error) {
      console.log(error?.response)
      setError(true);
      toast.error("Internal server error")
    }
  }

    // CONDITIONAL LOAD: ERROR
    if (error) {
      return (
        <Container className='text-center mt-5'>
          <p>Error loading page...</p>
  
        </Container>
      )
    }
  
    // CONDITIONAL LOAD: LLOADING
    if (loading) {
      return (
        <Container className='text-center mt-4'>
          <OaLoader />
        </Container>
      )
    }


  return (
    <Container  className='text-center mt-4'>
      <h1 className={styles.saleHeading}>SALE SALE SALE</h1>
      <ProductsList products={data}/>
    </Container>
  )
}

export default SaleProducts