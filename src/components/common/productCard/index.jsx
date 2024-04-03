import { useNavigate } from "react-router-dom";
import ThemeButton from "../ThemeButton";
import styles from "./productCard.module.scss";
import { useProductStore } from "../../../store";

const ProductCard = ({ title, image, id }) => {
  const navigate = useNavigate();
  const updateProduct = useProductStore((state) => state.updateProduct);

  return (
    <div className={styles.outerWrap}>
      <div className={styles.mainWrap}>
        <div className={styles.imgContainer}>
          <img src={image} alt="" />
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.btnWrap}>
          <ThemeButton
            onClick={() => {
              updateProduct(id);
              navigate("product-view");
            }}
          >
            Customize Now
          </ThemeButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
