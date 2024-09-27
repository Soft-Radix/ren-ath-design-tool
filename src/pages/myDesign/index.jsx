import React from "react";
import MainLayout from "../../components/Layouts/MainLayout";
import bgImage from "../../assets/images/home/bgImage.png";
import styles from "./myDesign.module.scss";
import SectionHeading from "../../components/common/sectionHeading";
import MyDesignList from "../../components/myDesigns/MyDesignList";
const Mydesign = () => {
  return (
    <MainLayout>
      <div className={styles.mainWrap}>
        <img src={bgImage} alt="" />
        <SectionHeading
          heading="My Designs"
          subHeading="Here is your fully customized design, tailored just for you."
        />
      </div>
      <MyDesignList />
    </MainLayout>
  );
};

export default Mydesign;
