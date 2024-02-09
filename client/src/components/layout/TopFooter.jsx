import * as styles from './TopFooter.css'



// Nav Imports
import LeftTopFooter from './TopFooterNavs/leftTopFooter'
import RighTopFooter from './TopFooterNavs/righTopFooter'
import MidTopFooter from './TopFooterNavs/midTopFooter'

function TopFooter() {
  return (
    <div className={styles.TopFooter}>
        <div className={styles.TopFooterContent}>
            <div className={styles.TopFooterNav}>
                <LeftTopFooter/>
            </div>
            <div className={styles.TopFooterNav}>
                <MidTopFooter/>
            </div>
            <div className={styles.TopFooterNav}>
                <RighTopFooter/>
            </div>
        </div>
    </div>
  )
}

export default TopFooter