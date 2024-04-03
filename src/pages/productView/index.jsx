import { useProductStore } from "../../store";
import Header from "./header";
import styles from "./productView.module.scss";
import Sidebar from "./sidebar";

const ProductView = () => {
  const selectedSidebarItemName = useProductStore(
    (state) => state.selectedSidebarItemName
  );

  return (
    <div className={styles.mainWrap}>
      <Sidebar />
      <div className={styles.rightWrap}>
        <Header />
        <div className={styles.contentWrap}>
          <div className={styles.propertiesWrap}>
            <div className={styles.title}>{selectedSidebarItemName}</div>
            <div className={styles.content}></div>
          </div>
          <div className={styles.canvasWrap}></div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
