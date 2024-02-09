import { Link } from 'react-router-dom';
import * as styles from './OaLink.css'

const OaLink = ({ to, children }) => {
  return (
    <Link 
      className={styles.navlink}
      to={to}
    >
      {children}
    </Link>
  )
}

export default OaLink