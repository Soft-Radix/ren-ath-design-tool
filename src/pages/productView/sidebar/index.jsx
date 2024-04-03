import mainLogo from "../../../assets/images/mainLogo.png";
import styles from "./sidebar.module.scss";
import sidebarItems from "./sidebarItems";

const Sidebar = () => {
  const renderItem = ({ name, Icon }, index) => {
    return (
      <div className={styles.item} key={index}>
        <div className={`${styles.line} ${styles.hideLine}`} />
        <div className={styles.iconWrap}>
          <Icon />
        </div>
        <span className={styles.name}>{name}</span>
      </div>
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
