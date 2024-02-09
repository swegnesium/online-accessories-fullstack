import { Fragment } from 'react';

// Component Imports
import Container from 'react-bootstrap/Container';

import OaBox from '../components/common/OaBox';
import PromotionWindow from '../components/features/PromotionWindow';
import SaleProducts from '../components/features/products/SaleProducts';

import FeaturedMobos from '../components/features/products/FeaturedMobos';
import FeaturedPeripherals from '../components/features/products/FeaturedPeripherals';


const Home = () => {
  return (
    <Fragment>
        <OaBox 
            link="Shop Here"
            linkTo="/store/products"
            title="OA"
            content="UPGRADE YOUR GAME"
            
          />
      <Container>
          <PromotionWindow
            text="MASSIVE SALE ON NOW"
          />

          <SaleProducts/>
          <FeaturedMobos/>
          <FeaturedPeripherals/>


      </Container>
    </Fragment>
  )
}

export default Home