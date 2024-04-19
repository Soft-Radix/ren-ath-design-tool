import { useProductStore } from "../../store";
import Scene from "./Scene";
import Header from "./header";
import styles from "./productView.module.scss";
import Color from "./propertiesContent/Color";
import Design from "./propertiesContent/Design";
import Gradient from "./propertiesContent/Gradient";
import Logo from "./propertiesContent/Logo";
import Name from "./propertiesContent/Name";
import Number from "./propertiesContent/Number";
import Pattern from "./propertiesContent/Pattern";
import Sidebar from "./sidebar";

const ProductView = () => {
  const { selectedSidebarItem, selectedSidebarItemName } = useProductStore(
    (state) => state
  );

  return (
    <div className={styles.mainWrap}>
      <Sidebar />
      <div className={styles.rightWrap}>
        <Header />
        <div className={styles.contentWrap}>
          <div className={styles.propertiesWrap}>
            <div className={styles.title}>{selectedSidebarItemName}</div>
            <div className={styles.content}>
              {selectedSidebarItem === 0.9 ? (
                <Design />
              ) : selectedSidebarItem === 1 ? (
                <Color />
              ) : selectedSidebarItem === 1.1 ? (
                <Pattern />
              ) : selectedSidebarItem === 2 ? (
                <Number />
              ) : selectedSidebarItem === 3 ? (
                <Name />
              ) : selectedSidebarItem === 5 ? (
                <Logo />
              ) : selectedSidebarItem === 6 ? (
                <Gradient />
              ) : null}
            </div>
          </div>
          <div className={styles.canvasWrap}>
            <Scene />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
