import PropTypes from 'prop-types'
import * as styles from './OaButtonSecondary.css'
import { Button } from 'react-bootstrap'

const OaButton = ({ children, loadingState, onClick }) => {
  return (
    <Button 
      className={styles.button}
      type={onClick ? "button" : "submit"} 
      onClick={onClick}
      disabled={loadingState ? 1 : 0}
    >
      {children}
    </Button>
  )
}

OaButton.propTypes = {
  children: PropTypes.any,
  loadingState: PropTypes.bool,
  onClick: PropTypes.func,
}

export default OaButton