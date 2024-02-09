import * as styles from '../../../components/common/OaBox.css'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


import { Button } from 'react-bootstrap';
import { IoMdArrowRoundBack } from "react-icons/io";

import DeletePanelList from '../../../components/features/adminPanel/DeletePanelList';
import OaCard from "../../../components/common/OaCard"


function DeletePanel() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const effectRan = useRef(false);

    useEffect(() => {
        if(effectRan.current === false) {
          fetchProducts();
          setLoading(false);
    
          return () => {
            effectRan.current = true;
          }
        }
      }, [])

      async function fetchProducts() {
        try {
          // API Request
          const response = await axios.get('http://localhost:5000/api/products')
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
    <div>
        <OaCard title="DELETE A PRODUCT" generalForm>
            <div>
                <Link to='/dashboard'><Button className='float-start ' variant='link'><IoMdArrowRoundBack /></Button></Link>
            </div>
        <h4 className='mb-5'>Select a Product Below:</h4>
        <DeletePanelList products={data}/>
        </OaCard>
    </div>
  )
}

export default DeletePanel