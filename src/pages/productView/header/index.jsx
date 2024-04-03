import { BackButtonIcon, ShareButton } from "../../../assets/svg/icons";
import ThemeButton from "../../../components/common/ThemeButton";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <div className={styles.mainWrap}>
      <div className={styles.leftWrap}>
        <BackButtonIcon />
        <span className={styles.title}>Long Sleeve Hitting Tees with Hood</span>
      </div>
      <div className={styles.rightWrap}>
        <ShareButton />
        <ThemeButton>Save</ThemeButton>
      </div>
    </div>
  );
};

export default Header;
