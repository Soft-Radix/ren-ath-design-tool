import { Container } from "@mui/material";
import bgImage from "../../assets/images/home/bgImage.png";
import category1 from "../../assets/images/home/category1.png";
import category2 from "../../assets/images/home/category2.png";
import globalIcon from "../../assets/svg/global.svg";
import instagramIcon from "../../assets/svg/instagram.svg";
import ProductCard from "../../components/common/productCard";
import SectionHeading from "../../components/common/sectionHeading";
import Footer from "../../components/footer";
import Header from "../../components/header";
import styles from "./home.module.scss";
import {
  menImg1,
  menImg7,
  menImg2,
  menImg3,
  menImg4,
  menImg5,
  menImg6,
  womenImg1,
  womenImg2,
  womenImg3,
  womenImg4,
  womenImg5,
  womenImg6,
  womenImg7,
  womenImg8,
  cover_up_short,
} from "./images";
import Tabs from "../../components/common/tabs";
import { Fragment, useState } from "react";

const Home = () => {
  const [womenTabValue, setWomenTabValue] = useState("1");
  const [menTabValue, setmenTabValue] = useState("1");

  return (
    <>
      <Header />
      <div
        className={styles.mainWrap}
        // style={{ backgroundImage: `url(${bgImage})` }}
      >
        <img src={bgImage} alt="" />
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={styles.textWrap}
        >
          <img src={text} alt="" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 400 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          className={styles.modelWrap}
        >
          <img src={model} className={styles.modelImg} alt="" />
        </motion.div> */}
      </div>
      <Container maxWidth="xl">
        <SectionHeading heading="Our Categories" subHeading="" />

        <div className={styles.categoryWrap}>
          <img src={category1} alt="" />
          <img src={category2} alt="" />
        </div>

        <SectionHeading heading="Women / Girls Products" subHeading="" />
        <Tabs
          tabHedings={[
            { name: "Jerseys & Shorts", value: "1" },
            { name: "Warm-ups", value: "2" },
          ]}
          setTabValue={setWomenTabValue}
          tabValue={womenTabValue}
        />

        <div className={styles.productsWrap}>
          {womenTabValue == 1 && (
            <Fragment>
              <ProductCard
                image={womenImg3}
                title="Long Sleeve Jersey"
                id="W3"
                designCount={10}
              />
              <ProductCard
                image={womenImg5}
                title="Short Sleeve Jersey"
                id="W5"
                designCount={3}
              />
              <ProductCard
                image={womenImg6}
                title="Sleeveless Jersey with Sleeve"
                id="W6"
                designCount={3}
              />{" "}
              <ProductCard
                image={cover_up_short}
                title="Cover Up Short"
                id="W11"
                designCount={3}
              />
            </Fragment>
          )}
          {womenTabValue == 2 && (
            <Fragment>
              <ProductCard
                image={womenImg1}
                title="Long Sleeve Hitting Tees with Hood"
                id="W1"
                designCount={4}
              />
              <ProductCard
                image={womenImg2}
                title="Long Sleeve Hitting Tees without Hood"
                id="W2"
                designCount={3}
              />
              <ProductCard
                image={womenImg4}
                title="Short Sleeve Hitting Tee"
                id="W4"
                designCount={3}
              />
            </Fragment>
          )}
          {/* <ProductCard
            image={womenImg7}
            title="Sleeveless Jersey without Sleeve"
            id="W7"
            designCount={3}
          />
          <ProductCard
            image={womenImg8}
            title="Sleeve Only"
            id="W8"
            designCount={3}
          /> */}
        </div>

        <SectionHeading
          heading="Men / Boys Products"
          subHeading=""
          designCount={3}
        />
        <Tabs
          tabHedings={[
            { name: "Jerseys & Shorts", value: "1" },
            { name: "Warm-ups", value: "2" },
          ]}
          setTabValue={setmenTabValue}
          tabValue={menTabValue}
        />
        <div className={styles.productsWrap}>
          {menTabValue == 1 && (
            <Fragment>
              <ProductCard
                image={menImg5}
                title="Short Sleeve Jersey"
                id="M5"
                designCount={3}
              />
              <ProductCard
                image={menImg6}
                title="Sleeveless Jersey"
                id="M6"
                designCount={3}
              />
              <ProductCard
                image={menImg1}
                title="Flex Custom Board Shorts"
                id="M1"
                designCount={3}
              />
              <ProductCard
                image={menImg7}
                title="Flex Custom Training Shorts"
                id="M7"
                designCount={3}
              />
            </Fragment>
          )}
          {menTabValue == 2 && (
            <Fragment>
              <ProductCard
                image={menImg2}
                title="Long Sleeve Hitting Tees with Hood"
                id="M2"
                designCount={3}
              />
              <ProductCard
                image={menImg3}
                title="Long Sleeve Hitting Tees without Hood"
                id="M3"
                designCount={3}
              />
              <ProductCard
                image={menImg4}
                title="Short Sleeve Hitting Tee"
                id="M4"
                designCount={3}
              />
            </Fragment>
          )}
        </div>
      </Container>
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

export default Home;
