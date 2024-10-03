import { useNavigate } from "react-router-dom";
import { BackButtonIcon, ShareButton } from "../../../assets/svg/icons";
import ThemeButton from "../../../components/common/ThemeButton";
import { useProductStore } from "../../../store";
import { saveUniformDesign } from "../../../utils/funtions";
import styles from "./header.module.scss";

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
        <ThemeButton
          onClick={() => {
            saveUniformDesign();
            navigate("/");
          }}
        >
          Save
        </ThemeButton>
      </div>
    </div>
  );
};

export default Header;
