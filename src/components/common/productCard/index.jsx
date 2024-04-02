import ThemeButton from "../ThemeButton";
import styles from "./productCard.module.scss";

const ProductCard = ({ title, image }) => {
  return (
    <div className={styles.outerWrap}>
      <div className={styles.mainWrap}>
        <div className={styles.imgContainer}>
          <img src={image} alt="" />
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.btnWrap}>
          <ThemeButton>Customize Now</ThemeButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
