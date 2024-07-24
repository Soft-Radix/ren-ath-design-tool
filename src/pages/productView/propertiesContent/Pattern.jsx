import React, { useEffect, useState, useMemo, useCallback } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Slider from "rc-slider";
import { useProductStore } from "../../../store";
import { IconButton, Tooltip } from "@mui/material";
import loaderGif from "../../../assets/gif/loader.gif";
import resetIcon from "../../../assets/svg/reset.svg";
import styles from "./properties.module.scss";
import { LazyLoadImage, trackWindowScroll } from "react-lazy-load-image-component";
import { Grid, CellMeasurer, CellMeasurerCache } from "react-virtualized";


import pattern1 from "../../../../public/textures/pattern1.png";
import pattern10 from "../../../../public/textures/pattern10.png";
import pattern11 from "../../../../public/textures/pattern11.png";
import pattern12 from "../../../../public/textures/pattern12.png";
import pattern13 from "../../../../public/textures/pattern13.png";
import pattern14 from "../../../../public/textures/pattern14.png";
import pattern15 from "../../../../public/textures/pattern15.png";
import pattern16 from "../../../../public/textures/pattern16.png";
import pattern17 from "../../../../public/textures/pattern17.png";
import pattern18 from "../../../../public/textures/pattern18.png";
import pattern19 from "../../../../public/textures/pattern19.png";
import pattern2 from "../../../../public/textures/pattern2.png";
import pattern20 from "../../../../public/textures/pattern20.png";
import pattern21 from "../../../../public/textures/pattern21.png";
import pattern22 from "../../../../public/textures/pattern22.png";
import pattern23 from "../../../../public/textures/pattern23.png";
import pattern24 from "../../../../public/textures/pattern24.png";
import pattern25 from "../../../../public/textures/pattern25.png";
import pattern26 from "../../../../public/textures/pattern26.png";
import pattern27 from "../../../../public/textures/pattern27.png";
import pattern28 from "../../../../public/textures/pattern28.png";
import pattern29 from "../../../../public/textures/pattern29.png";
import pattern3 from "../../../../public/textures/pattern3.png";
import pattern30 from "../../../../public/textures/pattern30.png";
import pattern4 from "../../../../public/textures/pattern4.png";
import pattern5 from "../../../../public/textures/pattern5.png";
import pattern6 from "../../../../public/textures/pattern6.png";
import pattern7 from "../../../../public/textures/pattern7.png";
import pattern8 from "../../../../public/textures/pattern8.png";
import pattern9 from "../../../../public/textures/pattern9.png";
import loading from "../../../assets/images/load.png";

const patterns = [
  pattern1,
  pattern2,
  pattern3,
  pattern4,
  pattern5,
  pattern6,
  pattern7,
  pattern8,
  pattern9,
  pattern10,
  pattern11,
  pattern12,
  pattern13,
  pattern14,
  pattern15,
  pattern16,
  pattern17,
  pattern18,
  pattern19,
  pattern20,
  pattern21,
  pattern22,
  pattern23,
  pattern24,
  pattern25,
  pattern26,
  pattern27,
  pattern28,
  pattern29,
  pattern30,
];

const cache = new CellMeasurerCache({
  defaultHeight: 120,
  fixedWidth: true,
});

const useImageLoader = (patterns) => {
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const imageLoadHandler = (index) => {
      setLoadedImages((prev) => ({ ...prev, [index]: true }));
    };

    patterns.forEach((pattern, index) => {
      if (!loadedImages[index]) {
        const img = new Image();
        img.src = pattern;
        img.onload = () => imageLoadHandler(index);
      }
    });
  }, [patterns, loadedImages]);

  return loadedImages;
};

const Pattern = () => {
  const ref = useProductStore((state) => state.ref);
  const [loader, setLoader] = useState(false);
  const [children, setChildren] = useState();
  const {
    updatePattern,
    updateLayer,
    patternScale,
    updatePatternScale,
    updatePatternRotationDeegre,
    setModelLoading,
    patternRotationDeegre,
  } = useProductStore((state) => state);
  const [expanded, setExpanded] = useState(false);
  const loadedImages = useImageLoader(patterns);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const getChildren = sessionStorage.getItem("ref");
    setChildren(JSON.parse(getChildren));
  }, []);

  const cellRenderer = useCallback(
    ({ columnIndex, key, rowIndex, style, parent }) => {
      const childIndex = parent.props.childIndex; // Retrieve childIndex from Grid's parent props
      const index = rowIndex * 3 + columnIndex;
      if (index >= patterns.length) {
        return (
          <div key={key} style={style} className={`${styles.imgWrap}`}>
            <img src={loading} alt="placeholder" />
          </div>
        );
      }

      const pattern = patterns[index];

      return (
        <CellMeasurer
          cache={cache}
          columnIndex={columnIndex}
          key={key}
          parent={parent}
          rowIndex={rowIndex}
        >
          <div
            key={key}
            style={style}
            className={`${styles.imgWrap}`}
            onClick={() => {
              updatePattern(index + 1); // Use index + 1 as the pattern ID
              updateLayer(childIndex);
              setModelLoading(true);
              const time = setTimeout(() => {
                setModelLoading(false);
              }, 2000);
              return () => clearTimeout(time);
            }}
          >
            <LazyLoadImage
              src={pattern}
              alt={`pattern${index + 1}`}
              effect="opacity"
              placeholderSrc={loading}
              visibleByDefault={loadedImages[index]}
              afterLoad={() => setLoadedImages((prev) => ({ ...prev, [index]: true }))}
            />
          </div>
        </CellMeasurer>
      );
    },
    [loadedImages, updateLayer, updatePattern]
  );

  const memoizedPatternComponent = useMemo(() => {
    return (
      <div className={`${styles.colorWrap} ${styles.patternWrap}`}>
        {children?.map((item, childIndex) => {
          if (childIndex !== 4 && childIndex !== 5) {
            return (
              <Accordion
                key={item.uuid}
                onChange={handleChange(item?.uuid)}
                expanded={expanded === item?.uuid}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {item.name}
                    <Tooltip title="Reset Pattern" placement="right-start">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          updatePattern(31);
                          updateLayer(childIndex);
                        }}
                      >
                        <img src={resetIcon} alt="Reset Pattern" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={styles.scaleAngleWrap}>
                    <div className={styles.sliderWrap}>
                      <span>Scale</span>
                      <Slider
                        min={1}
                        max={5}
                        step={0.5}
                        value={patternScale[childIndex]}
                        onChange={(e) => updatePatternScale({ [childIndex]: e })}
                      />
                      <span>{patternScale[childIndex]}</span>
                    </div>
                    <div className={styles.sliderWrap}>
                      <span>Rotate</span>
                      <Slider
                        min={0}
                        max={360}
                        step={30}
                        value={patternRotationDeegre[childIndex]}
                        onChange={(e) => updatePatternRotationDeegre({ [childIndex]: e })}
                      />
                      <span>{patternRotationDeegre[childIndex]}</span>
                    </div>
                  </div>
                  <div className={styles.contentWrap}>
                    <Grid
                      cellRenderer={cellRenderer}
                      columnCount={3}
                      columnWidth={125}
                      height={300}
                      rowCount={Math.ceil(patterns.length / 3)}
                      rowHeight={120}
                      width={390}
                      childIndex={childIndex} // Pass childIndex to Grid
                      deferredMeasurementCache={cache} // Add this line
                    />
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          }
          return null;
        })}
      </div>
    );
  }, [
    children,
    expanded,
    loader,
    loadedImages,
    patternScale,
    patternRotationDeegre,
    updatePattern,
    updateLayer,
    handleChange,
  ]);

  return memoizedPatternComponent;
};

export default trackWindowScroll(Pattern);
