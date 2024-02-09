import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Container, Form, InputGroup, Button } from 'react-bootstrap';
import * as styles from './ProductMenu.css';

import ProductsList from '../../components/features/products/ProductsList';
import OaLoader from '../../components/common/OaLoader';
import OaBox from '../../components/common/OaBox';
import ProductFilter from './ProductFilter';

function ProductsMenu() {
  // PRODUCTS STATE
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Change to true initially
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState(data)
  const effectRan = useRef(false);
  const [selectedCategory, setSelectedCategory] = useState(null);


  useEffect(() => {
    if (effectRan.current === false) {
      fetchProducts();
      setLoading(false);

      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  async function fetchProducts() {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      const data = response.data;
      setData(data);
    } catch (error) {
      console.log(error?.response);
      setError(true);
      toast.error('Internal server error');
    }
  }

  function onChange(e) {
    const value = e.target.value;
    setSearch(value);
     // Clear any selected category when the search term changes
    setSelectedCategory(null);
  }

  // Filter the products based on the search input
  const filteredProducts = data.filter((product) =>{
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =  selectedCategory ? product.category === selectedCategory : true

    return matchesSearch && matchesCategory
  });

   // Extract unique product categories and store in a variable so we can interact with it
   const productCategories = [...new Set(data.map((product) => product.category))];

  //  Product Filter Function - for the Dropdown
   const filterCategories = (selectedCategory) => {
    const newProducts = data.filter((product) => product.category === selectedCategory);
    const sortedNewProducts = newProducts.sort()
    setProducts(sortedNewProducts);
    // Set our selected category to our State Value
    setSelectedCategory(selectedCategory)
  };


  return (
    <div>
      <OaBox linkTo="/store/products" title="BEST HARDWARE, BEST PRICE" content="only at OA" />
      <Container className="text-center mt-4">

        <h1 className={styles.hardwareHeading}>HARDWARE SELECTION</h1>



        <div className={styles.filterButtons}>
          <div >
            {/* PRODUCT FILTER */}
            <ProductFilter 
            // categories prop is used to pass an array of product categories to the component
            categories={productCategories} 
            // represents a function that will be called when a user selects a category in the dropdown
            onSelectCategory={filterCategories} 
            />
          </div>
          <div className={styles.searchBar}>
            {/* -------SEARCH BAR ---------*/}
            <Form>
              <InputGroup>
                <Form.Control type="search" placeholder="Search Products" onChange={onChange} />
              </InputGroup>
            </Form>
          </div>
        </div>

        {loading ? (
          <Container className="text-center mt-4">
            <OaLoader />
          </Container>
        ) : error ? (
          <Container className="text-center mt-5">
            <p>Error loading page...</p>
          </Container>
        ) : (
          <ProductsList products={filteredProducts} />
        )}
      </Container>
    </div>
  );
}

export default ProductsMenu;