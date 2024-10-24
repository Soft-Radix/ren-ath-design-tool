import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Grid } from "react-virtualized";
import { useProductStore } from "../../../store";
import styles from "./properties.module.scss";
import { handleAddNewUniform } from "../../../utils/funtions";

const Design = () => {
  const { id, designCount } = useProductStore((state) => state);
  const { designType, updateDesignType, updateIsDesign, isDesign } =
  useProductStore((state) => state);

  useEffect(() => {
    handleAddNewUniform("design", {
      isDesign,
      designType,
    });
  }, [isDesign, designType]);
  
  const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    const index = rowIndex * 2 + columnIndex + 1;
    if (index > designCount) {
      return null;
    }

    const imageUrl = new URL(
      `../../../assets/images/Design/${id}/design${index}.png`,
      import.meta.url
    ).href;

    return (
      <div key={key} style={style} className={styles.imageContainer}>
        <div
          className={`${styles.imgWrap} ${
            designType === index ? styles.selected : ""
          }`}
          onClick={() => {
            if (designType === index) {
              updateIsDesign(!isDesign);
            } else {
              updateIsDesign(true);
            }
            updateDesignType(index);
          }}
        >
          <LazyLoadImage
            src={imageUrl}
            alt={`design${index}`}
            effect="opacity"
            placeholderSrc={"path/to/placeholder/image"} // Add a placeholder image path
            className={styles.loaded}
          />
        </div>
      </div>
    );
  };

  const rowCount = Math.ceil(designCount / 2);
  return (
    <div className={styles.designWrap}>
      <Grid
        cellRenderer={cellRenderer}
        columnCount={2}
        columnWidth={180}
        height={800}
        rowCount={rowCount}
        rowHeight={220}
        width={600}
      />
    </div>
  );
};

export default Design;
