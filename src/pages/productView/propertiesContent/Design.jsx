import React, { useEffect } from "react";
import styles from "./properties.module.scss";
import { useProductStore } from "../../../store";

const Design = () => {
  const { id, designCount } = useProductStore((state) => state);
  const { designPosition, updateDesignPosition } = useProductStore(
    (state) => state
  );

  const renderDivs = () => {
    const divs = [];
    for (let i = 1; i <= designCount; i++) {
      const imageUrl = new URL(
        `../../../assets/images/Design/${id}/img${i}.png`,
        import.meta.url
      ).href;
      divs.push(
        <div
          className={`${styles.imgWrap} ${
            designPosition === i ? styles.selected : ""
          }`}
          onClick={() => updateDesignPosition(i)}
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
