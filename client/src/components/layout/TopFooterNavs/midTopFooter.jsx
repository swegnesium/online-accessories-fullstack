import { Link } from "react-router-dom"
import * as styles from '../TopFooter.css'

function midTopFooter() {
  return (
    <div>
        <h4>Service Centre</h4>
        <ul className={styles.NavStyling}>
        <Link  className={styles.navLink}>
                <li>
                    Support
                </li>
        </Link>
        <Link  className={styles.navLink}>
                <li>
                    My Account
                </li>
        </Link>
        <Link  className={styles.navLink}>
                <li>
                    Shipping & Return Policies
                </li>
        </Link>
        </ul>
    </div>
  )
}

export default midTopFooter