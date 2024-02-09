import * as styles from './DeletePanelList.css'
import OaPanelBox from '../../common/OaPanelBox'

function DeletePanelList({products}) {
  return (
    <div className={styles.listContainer}>
        <div className={styles.panelGrid}>
            {products.length === 0 && <p>Nothing available to delete</p>}
            {products.length > 0 && products.map((product, index) => 
                <OaPanelBox
                    key={index}
                    id={product.id}
                    name={product.name}
                />
            )}
        </div>
    </div>
  )
}

export default DeletePanelList