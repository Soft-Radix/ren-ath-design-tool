import mainLogo from "../../../assets/images/mainLogo.png";
import { useProductStore } from "../../../store";
import styles from "./sidebar.module.scss";
import sidebarItems from "./sidebarItems";
import { motion } from "framer-motion";

const Sidebar = () => {
  const selectedSidebarItem = useProductStore(
    (state) => state.selectedSidebarItem
  );
  const updateSelectedSidebarItem = useProductStore(
    
    (state) => state.updateSelectedSidebarItem

  );

  const renderItem = ({ id, name, Icon }) => {
    return (
      <motion.div
        className={styles.item}
        key={id}
        onClick={() => updateSelectedSidebarItem(id)}
        whileHover={{ scale: 1.04, backgroundColor: "#768f99" }}
      >
        <div
          className={`${styles.line} ${
            selectedSidebarItem !== id ? styles.hideLine : ""
          }`}
        />
        <div className={styles.iconWrap}>
          <Icon />
        </div>
        <span className={styles.name}>{name}</span>
      </motion.div>
    );
  };

  return (
    <div className={styles.mainWrap}>
      <div className={styles.logo}>
        <img src={mainLogo} alt="" className={styles.mainLogo} />
      </div>
      <div className={styles.itemsWrap}>{sidebarItems.map(renderItem)}</div>
    </div>
  );
};

export default Sidebar;
