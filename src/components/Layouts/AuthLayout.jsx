import styles from "../../scss/layout/AuthLayout.module.scss";
import mainLogo from "../../assets/images/mainLogo.png";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className={styles.layout_page}>
      <div className={styles.layout_box}>
        <div className={styles.layout_heading}>
          <img src={mainLogo} alt="logo" />
          <h3>{title}</h3>
          <h5>{subtitle}</h5>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
