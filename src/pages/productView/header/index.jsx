import { useNavigate } from "react-router-dom";
import { BackButtonIcon, ShareButton } from "../../../assets/svg/icons";
import ThemeButton from "../../../components/common/ThemeButton";
import styles from "./header.module.scss";
import { useProductStore } from "../../../store";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const productId = useProductStore((state) => state.id);

  useEffect(() => {
    console.log("productId ==> ", productId);
  }, [productId]);

  return (
    <div className={styles.mainWrap}>
      <div className={styles.leftWrap}>
        <span onClick={() => navigate(-1)}>
          <BackButtonIcon />
        </span>
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
