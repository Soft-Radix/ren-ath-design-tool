import React from "react";
import styles from "./sectionHeading.module.scss";

const SectionHeading = ({ heading, subHeading }) => {
  return (
    <div className={styles.mainWrap}>
      <div className={styles.heading}>{heading}</div>
      <div className={styles.subHeading}>{subHeading}</div>
    </div>
  );
};

export default SectionHeading;
