import * as styles from './ProductDetails.css'

import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Container, Col, Row } from 'react-bootstrap'

import { priceFormatter } from '../../services/readUtils'
import useAuth from '../../hooks/useAuth'
import productService from '../../services/productServices'
import { useCart } from '../../contexts/CartContext'

import OaLoader from '../../components/common/OaLoader'
import OaButton from '../../components/common/OaButton'
import OaButtonSecondary from '../../components/common/OaButtonSecondary'
import OaLink from '../../components/common/OaLink'
import Spinner from 'react-bootstrap/Spinner'


function ProductDetails(props) {
  const { user } = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart()
  
  const [productData, setProductData] = useState({
    id: params.id,
    name: "",
    description: "",
    category: "",
    price: 0,
    manufacturer: "",
    onSale: false,
    isAvailable: true,
    image: ""
  });

  const [ loading, setLoading] = useState(true);
  const [error, setError] = useState(false)

  const { id, name, description, price, image, manufacturer, isAvailable} = productData

  const effectRan = useRef(false);
  useEffect(() => {
    if(effectRan.current == false){
      fetchProduct();
      setLoading(false)

      return () => {
        effectRan.current = true
      }
    }
  }, [id])

  async function fetchProduct(){
    try {
      const response = await productService.getById(id);
      const fetchedProduct = await response.data;
      console.log(fetchedProduct)

      setProductData(productOnMount => ({
        ...productOnMount,
        ...fetchedProduct
      }))


    } catch (error) {
      console.log(error?.response);
      setError(true)
    }
  }

  
   // Event handler for adding the product to the cart
   const handleAddToCart = () => {
    const newProduct = {
      id: params.id,
      name: productData.name,
      description: productData.description,
      category: productData.category,
      manufacturer: productData.manufacturer,
      image: productData.image,
      onSale: productData.onSale,
      price: productData.price,
      quantity: quantity,
    };

    addToCart(newProduct)
    console.log('Product added to cart!');
  };

  //  DELETE FUNCTION
  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      const response = await productService.del(id)
      console.log(response)
      setLoading(false)
      navigate('/store/products')
    } catch (error) {
      console.log(error?.response);
      setError(true);
      window.scroll({ top: 0, left: 0, behavior: 'smooth'})
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
    if (loading && effectRan.current === false) {
      return (
        <Container className='text-center mt-4'>
          <OaLoader />
        </Container>
      )
    }

  return (
    <Container>
      <div className={styles.detailsCard}>
{user && <div className={styles.adminPanel}>
          <h5>Admin Panel</h5>
          {/*-------- DELETE ITEM --------*/}
          <OaButtonSecondary onClick={handleDelete} loadingState={loading}
        >
          {loading ? <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          /> : 'Delete'}
        </OaButtonSecondary> 

          {/*----- EDIT ITEM ---------*/}
         <Link to={`/store/product/edit/${id}`}><OaButtonSecondary>edit</OaButtonSecondary></Link>
        </div>}

        <div className={styles.detailsCardContent}>
          <Row>
            <Col>
              <div className={styles.detailsLeftBox}>
                <img className='detailsImage' src={image} alt="product"/>
              </div>
            </Col>
            <Col>
              <div className='detailsRightBox'>
                <h3 className={styles.detailsTitle}>{name}</h3>
                <h5 className={styles.detailsManufacturer}>Manufacturer: {manufacturer}</h5>
                <p className={styles.detailsDescription}>{description}</p>
                <h5 className={styles.detailsManufacturer}>In Stock: {isAvailable}</h5>
                <p className={styles.detailsPrice}>{priceFormatter(price)}</p>
                <div className={styles.quantityDiv}> 
            <input
              type="number"
              className='w-25'
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <OaButton className={styles.addToCart} onClick={handleAddToCart}>Add to Cart</OaButton>
          </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  )
}

export default ProductDetails