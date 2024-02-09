import * as styles from './OaCard.css'

function OaCard({title, authForm, children}) {
  return (
    <div className={styles.container}>   
        <div className={`${styles.leadCard} ${authForm ? styles.authForm : styles.generalForm}`}>
            <h2 className={styles.cardTitle}>{title}</h2>
            <div className={styles.cardChildren}>{children}</div>
        </div>
    </div>
  )
}

export default OaCard