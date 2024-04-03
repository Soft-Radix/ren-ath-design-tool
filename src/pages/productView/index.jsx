import Header from "./header";
import styles from "./productView.module.scss";
import Sidebar from "./sidebar";

const ProductView = () => {
  return (
    <div className={styles.mainWrap}>
      <Sidebar />
      <Header />
    </div>
  );
};

export default ProductView;
