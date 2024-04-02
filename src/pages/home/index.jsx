import Header from "../../components/header";
import styles from "./home.module.scss";
import bgImage from "../../assets/images/home/bgImage.png";
import text from "../../assets/images/home/text.png";
import model from "../../assets/images/home/model.png";
import category1 from "../../assets/images/home/category1.png";
import category2 from "../../assets/images/home/category2.png";
import { motion } from "framer-motion";
import SectionHeading from "../../components/common/sectionHeading";
import { Container } from "@mui/material";
import ProductCard from "../../components/common/productCard";
import instagramIcon from "../../assets/svg/instagram.svg";
import globalIcon from "../../assets/svg/global.svg";
import {
  womenImg1,
  womenImg2,
  womenImg3,
  womenImg4,
  womenImg5,
  womenImg6,
  womenImg7,
  womenImg8,
  menImg1,
  menImg2,
  menImg3,
  menImg4,
  menImg5,
  menImg6,
} from "./images";

const Home = () => {
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
        <SectionHeading
          heading="Our Categories"
          subHeading="Here are some of the categories we provides"
        />

        <div className={styles.categoryWrap}>
          <img src={category1} alt="" />
          <img src={category2} alt="" />
        </div>

        <SectionHeading
          heading="Women / Girls Products"
          subHeading="8 type of products available for women & girl"
        />

        <div className={styles.productsWrap}>
          <ProductCard
            image={womenImg1}
            title="Long Sleeve Hitting Tees with Hood"
          />
          <ProductCard
            image={womenImg2}
            title="Long Sleeve Hitting Tees without Hood"
          />
          <ProductCard image={womenImg3} title="Long Sleeve Jersey" />
          <ProductCard image={womenImg4} title="Short Sleeve Hitting Tee" />
          <ProductCard image={womenImg5} title="Short Sleeve Jersey" />
          <ProductCard
            image={womenImg6}
            title="Sleeveless Jersey with Sleeve"
          />
          <ProductCard
            image={womenImg7}
            title="Sleeveless Jersey without Sleeve"
          />
          <ProductCard image={womenImg8} title="Sleeve Only" />
        </div>

        <SectionHeading
          heading="Men / Boys Products"
          subHeading="6 type of products available for men & boys"
        />

        <div className={styles.productsWrap}>
          <ProductCard image={menImg1} title="Flex Custom Board Shorts" />
          <ProductCard
            image={menImg2}
            title="Long Sleeve Hitting Tees with Hood"
          />
          <ProductCard
            image={menImg3}
            title="Long Sleeve Hitting Tees without Hood"
          />
          <ProductCard image={menImg4} title="Short Sleeve Hitting Tee" />
          <ProductCard image={menImg5} title="Short Sleeve Jersey" />
          <ProductCard image={menImg6} title="Sleeveless Jersey" />
        </div>
      </Container>
      <div className={styles.learnAbout}>
        <div className={styles.text}>
          Learn More About<span> Custom Volleyball Uniform Builder</span>
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
    </>
  );
};

export default Home;
