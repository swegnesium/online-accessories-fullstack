import * as styles from './ProductItem.css'
import { Link } from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import OaButton from '../../common/OaButton'
import { useState } from 'react'

import useAuth from '../../../hooks/useAuth'
import { useCart } from '../../../contexts/CartContext'

function ProductItem(props) {

  const { user, logout } = useAuth()
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart()

   // Event handler for adding the product to the cart
   const handleAddToCart = () => {
    const newProduct = {
      id: props.id,
      name: props.name,
      description: props.description,
      category: props.category,
      manufacturer: props.manufacturer,
      image: props.image,
      onSale: props.onSale,
      price: props.price,
      quantity: quantity,
    };

    addToCart(newProduct)
    console.log('Product added to cart!');
  };

  return (
    <div className={styles.productCard}>
        <Link className={styles.productLink} to={`/store/product/${props.id}`}>
        <div className={styles.imageBox}>
          {props.onSale == "true" && <p className={styles.onSale}>ON SALE</p>}
          <Image src={props.image} alt={props.image} className={styles.productImage}/>
        </div>
        <div className={styles.productCardContent}>
          <p className={styles.productCardCategory}>Category: {props.category}</p>
          <h2 className={styles.productCardTitle}>{props.name}</h2>
          <p>{props.price}</p>
        </div>
        </Link>

      { user && 
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
      }  
      </div>
  )
}

export default ProductItem