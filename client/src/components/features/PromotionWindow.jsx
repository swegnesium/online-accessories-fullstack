import * as styles from './PromotionWindow.css'

function PromotionWindow({text}) {
  return (
    <div className={styles.PromotionDiv}>

      <div className={styles.PromotionWindow}>
        <h2 className={styles.PromotionText}>{text}</h2>
      </div>

    </div>
  )
}

export default PromotionWindow