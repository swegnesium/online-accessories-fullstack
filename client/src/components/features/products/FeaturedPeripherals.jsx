import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { Toast } from "react-bootstrap"
import * as styles from './FeaturedPeripherals.css'

import Container from "react-bootstrap/Container"
import ProductsList from "./ProductsList"

function FeaturedPeripherals() {
      // State values
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const effectRan = useRef(false)
  useEffect(() => {
    if(effectRan.current === false) {
        fetchPeripherals();
        setLoading(false);

      return () => {
        effectRan.current = true
      }
    }
  }, [])

  async function fetchPeripherals(){
    try {
        const response = await axios.get('http://localhost:5000/api/products/peripherals')
        const data = response.data
        console.log(data)
        setData(data)
      } catch (error) {
        console.log(error)
        setError(true)
      }
  }

  return (
    <Container className="text-center m-3">
      <h1 className={styles.Heading}>SHOP PERIPHERALS</h1>
      <div className={styles.motherboardDiv}>
        <ProductsList products={data}/>

      </div>
    </Container>
  )
}

export default FeaturedPeripherals