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

const Home = () => {
  return (
    <>
      <Header />
      <div
        className={styles.mainWrap}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <motion.div
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
        </motion.div>
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
      </Container>
    </>
  );
};

export default Home;
