import React, { useEffect } from "react";
import styles from "./properties.module.scss";
import { useProductStore } from "../../../store";

const Design = () => {
  const { id, designCount } = useProductStore((state) => state);
  const { designType, updateDesignType } = useProductStore((state) => state);

  const renderDivs = () => {
    const divs = [];
    for (let i = 1; i <= designCount; i++) {
      const imageUrl = new URL(
        `../../../assets/images/Design/${id}/design${i}.png`,
        import.meta.url
      ).href;
      divs.push(
        <div
          className={`${styles.imgWrap} ${
            designType === i ? styles.selected : ""
          }`}
          onClick={() => updateDesignType(i)}
          key={i}
        >
          <img src={imageUrl} alt="" />
        </div>
      );
    }
    return divs;
  };

  return <div className={styles.designWrap}>{renderDivs()}</div>;
};

export default Design;
