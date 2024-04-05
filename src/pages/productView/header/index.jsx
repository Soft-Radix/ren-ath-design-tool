import { useNavigate } from "react-router-dom";
import { BackButtonIcon, ShareButton } from "../../../assets/svg/icons";
import ThemeButton from "../../../components/common/ThemeButton";
import styles from "./header.module.scss";
import { useProductStore } from "../../../store";

const Header = () => {
  const productName = useProductStore((state) => state.name);
  const navigate = useNavigate();

  return (
    <div className={styles.mainWrap}>
      <div className={styles.leftWrap}>
        <span onClick={() => navigate(-1)}>
          <BackButtonIcon />
        </span>
        <span className={styles.title}>{productName}</span>
      </div>
      <div className={styles.rightWrap}>
        <ShareButton />
        <ThemeButton>Save</ThemeButton>
      </div>
    </div>
  );
};

export default Header;
