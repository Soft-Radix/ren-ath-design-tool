import { useNavigate } from "react-router-dom";
import ThemeButton from "../ThemeButton";
import styles from "./productCard.module.scss";
import { useProductStore } from "../../../store";
import Cookies from "universal-cookie";

const ProductCard = ({ title, image, id, designCount, detail }) => {
  const navigate = useNavigate();
  const updateProduct = useProductStore((state) => state.updateProduct);
  const cookies = new Cookies(null, { path: "/" });

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
              updateProduct(id, title, designCount);
              window.location.href = `/product-view/${detail.styleCode}`;

              // navigate("/product-view");
              cookies.set("productDetails", {
                id: id,
                name: title,
                designCount: designCount,
              });
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
