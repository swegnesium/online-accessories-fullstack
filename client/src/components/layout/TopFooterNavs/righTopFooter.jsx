import { Link } from "react-router-dom"
import * as styles from '../TopFooter.css'

import { FaFacebookSquare, FaYoutube, FaInstagram  } from "react-icons/fa";

function righTopFooter() {
  return (
    <div>
        <h4>Follow Us</h4>
      <div className={styles.socialBox}>
        <ul>
          <li className={styles.socialLink}>
            <FaFacebookSquare/>
          </li>

          <li className={styles.socialLink}>
            <FaInstagram/>
          </li>

          <li className={styles.socialLink}>
            <FaYoutube/>
          </li>
        </ul>
      
      </div>

    </div>
  )
}

export default righTopFooter