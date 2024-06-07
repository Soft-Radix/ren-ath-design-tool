import React, { useState, useEffect } from "react";
import { useProductStore } from "../../../store";
import styles from "./properties.module.scss";
import Skeleton from "@mui/material/Skeleton";

const Design = () => {
  const { id, designCount } = useProductStore((state) => state);
  const { designType, updateDesignType, updateIsDesign, isDesign } =
    useProductStore((state) => state);

  const [loadedImages, setLoadedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => [...prev, index]);
  };

  const renderDivs = () => {
    const divs = [];
    for (let i = 1; i <= designCount; i++) {
      const imageUrl = new URL(
        `../../../assets/images/Design/${id}/design${i}.png`,
        import.meta.url
      ).href;
      divs.push(
        <div key={i} className={styles.imageContainer}>
          {loading && (
            <Skeleton
              variant="rounded"
              width={130}
              height={110}
              animation="wave"
            />
          )}
          {!loading && (
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
            >
              <img
                src={imageUrl}
                alt=""
                onLoad={() => handleImageLoad(i)}
                className={styles.loaded}
                style={{ display: "block" }}
              />
            </div>
          )}
        </div>
      );
    }
    return divs;
  };

  return <div className={styles.designWrap}>{renderDivs()}</div>;
};

export default Design;
