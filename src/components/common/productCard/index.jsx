import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useUpdateUniformStates } from "../../../hook/CustomHook/useUpdateUniformStates";
import { useProductStore } from "../../../store";
import ThemeButton from "../ThemeButton";
import styles from "./productCard.module.scss";

const ProductCard = ({ title, image, id, designCount, detail }) => {
  const navigate = useNavigate();
  const updateProduct = useProductStore((state) => state.updateProduct);
  const cookies = new Cookies(null, { path: "/" });

  // Call the custom hook at the top level of the component
  const updateUniformStates = useUpdateUniformStates();

  const handleClick = () => {
    updateUniformStates(); // Call the function to update states
  };
  console.log(title, image, id, designCount, detail);

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

              // navigate("/product-view");
              cookies.set("productDetails", {
                id: id,
                name: title,
                designCount: designCount,
              });
              navigate(`/product-view/${detail.styleCode}`);
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
