import * as styles from './Selection.css'

import Container from "react-bootstrap/Container"
import OaLinkBox from "../common/OaLinkBox"
import GPUs from '../../assets/images/GPUs.jpg'
import Aimboss from '../../assets/images/aimboss.jpg'

function Selection() {
  return (
    <Container>

            <div className={styles.ProductSelectDiv}>

                {/* Hardware */}
                <div className={styles.ProductSelectContent}>
                    <OaLinkBox 
                    title="HARDWARE"
                     image={GPUs}/>
                </div>

                <div className={styles.ProductSelectContent}>
                <OaLinkBox 
                title="SOFTWARE"
                image={Aimboss}
                />
                </div>

            </div>

    </Container>
  )
}

export default Selection