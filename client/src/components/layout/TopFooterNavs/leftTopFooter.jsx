import * as styles from '../TopFooter.css'
import { Link } from 'react-router-dom'

function leftTopFooter() {
  return (
    <div>
        <h4>Shop Links</h4>
        <ul className={styles.NavStyling}>
            <Link className={styles.navLink}>
                <li>
                    Home
                </li>
            </Link>
            <Link  className={styles.navLink}>
                <li>
                    Products
                </li>
            </Link>

            <Link  className={styles.navLink}>
                <li>
                    Sign-up
                </li>
            </Link>
            <Link  className={styles.navLink}>
                <li>
                    Login
                </li>
            </Link>
        </ul>
    </div>
  )
}

export default leftTopFooter