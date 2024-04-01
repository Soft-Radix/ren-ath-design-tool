import { Container } from "@mui/material";
import mainLogo from "../../assets/images/mainLogo.png";
import ThemeButton from "../common/ThemeButton";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <div className={styles.mainWrap}>
      <Container maxWidth="xl">
        <div className={styles.innerWrap}>
          <img src={mainLogo} alt="" className={styles.mainLogo} />
          <div className={styles.buttonsWrap}>
            <ThemeButton>Log In</ThemeButton>
            <ThemeButton variant="outlined">Sign Up</ThemeButton>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
