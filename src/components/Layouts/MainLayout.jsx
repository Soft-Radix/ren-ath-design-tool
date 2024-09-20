import React from "react";
import Header from "../header";
import styles from "./MainLayout.module.scss";

import globalIcon from "../../assets/svg/global.svg";
import instagramIcon from "../../assets/svg/instagram.svg";
import Footer from "../footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <div className={styles.learnAbout}>
        <div className={styles.text}>
          Learn More About<span> REN Athletics</span>
        </div>
        <div className={styles.socialWrap}>
          <div className={styles.item}>
            <span>Follow Us</span>
            <img src={instagramIcon} alt="" />
          </div>
          <span className={styles.line} />
          <div className={styles.item}>
            <span>Visit Us</span>
            <img src={globalIcon} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
