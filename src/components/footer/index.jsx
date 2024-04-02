import { Container } from "@mui/material";
import mainLogo from "../../assets/images/mainLogo.png";
import poweredBy from "../../assets/images/poweredBy.png";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <Container maxWidth="xl">
      <div className={styles.mainWrap}>
        <img src={mainLogo} alt="" className={styles.mainLogo} />
        <img src={poweredBy} alt="" className={styles.mainLogo} />
        <div className={styles.policyWrap}>
          <span className={styles.text}>Privacy Policy</span>
          <span className={styles.line} />
          <span className={styles.text}>Terms of Service</span>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
