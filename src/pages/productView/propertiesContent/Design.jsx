import React from "react";
import { useProductStore } from "../../../store";
import styles from "./properties.module.scss";

const Design = () => {
  const { id, designCount } = useProductStore((state) => state);
  const { designType, updateDesignType, updateIsDesign, isDesign } =
    useProductStore((state) => state);

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
          onClick={() => {
            if (designType === i) {
              updateIsDesign(!isDesign);
            } else {
              updateIsDesign(true);
            }
            updateDesignType(i);
          }}
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
