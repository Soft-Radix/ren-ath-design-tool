import React, { useEffect, useState, useMemo, useCallback } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Slider from "rc-slider";
import { useProductStore } from "../../../store";
import { IconButton, Tooltip } from "@mui/material";
import resetIcon from "../../../assets/svg/reset.svg";
import styles from "./properties.module.scss";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import { Grid, AutoSizer } from "react-virtualized";
import loading from "../../../assets/images/load.png";
import patternPaths from "./images";
import {
  handleAddNewUniform,
  modelRotationValue,
  nonRepeatingPatterns,
} from "../../../utils/funtions";

const Pattern = () => {
  const ref = useProductStore((state) => state.ref);
  const [expanded, setExpanded] = useState(false);
  const [loadedImages, setLoadedImages] = useState([]);

  const children = ref?.current?.children || [];
  const {
    pattern,
    patternRotationDeegre,
    patternScale,
    updatePatternLayers,
    patternLayers,
    updateLayer,
    updatePattern,
    updatePatternScale,
    updatePatternRotationDeegre,
    handleModelRotation,
  } = useProductStore((state) => state);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const loadImages = async () => {
    setLoadedImages(patternPaths);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const cellRenderer = useCallback(
    ({ columnIndex, key, rowIndex, style, parent }) => {
      const childIndex = parent.props.childIndex;
      const index = rowIndex * 3 + columnIndex;
      if (index >= loadedImages.length) {
        return (
          <div key={key} style={style} className={`${styles.imgWrap}`}>
            <img src={loading} alt="placeholder" />
          </div>
        );
      }

      const pattern = loadedImages[index];
      return (
        <div
          key={key}
          style={style}
          className={`${styles.imgWrap}`}
          onClick={() => {
            updatePatternLayers({ [childIndex]: index + 1 });
            updatePattern(index + 1);
            updateLayer(childIndex);
          }}
        >
          <LazyLoadImage
            src={pattern}
            alt={`pattern${index + 1}`}
            effect="opacity"
            placeholderSrc={loading}
          />
        </div>
      );
    },
    [loadedImages, updatePattern, updateLayer]
  );
  // useEffect(() => {
  //   console.log("patternLayers", patternLayers);
  //   handleAddNewUniform("pattern", {
  //     patternRotationDeegre,
  //     patternScale,
  //     patternLayers,
  //   });
  // }, [patternLayers, patternRotationDeegre, patternScale]);

  const memoizedPatternComponent = useMemo(() => {
    return (
      <div className={`${styles.colorWrap} ${styles.patternWrap}`}>
        {children?.map((item, childIndex) => {
          return (
            <Accordion
              key={item.uuid}
              onChange={handleChange(item?.uuid)}
              expanded={expanded === item?.uuid}
              onClick={() => {
                handleModelRotation(modelRotationValue(childIndex));
              }}
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
                        updatePatternLayers({ [childIndex]: 31 });
                        updateLayer(childIndex);
                      }}
                    >
                      <img src={resetIcon} alt="Reset Pattern" />
                    </IconButton>
                  </Tooltip>
                </div>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  padding: 0,
                }}
              >
                <div className={styles.scaleAngleWrap}>
                  <div className={styles.sliderWrap}>
                    <span>Scale</span>
                    <Slider
                      min={0.5}
                      disabled={nonRepeatingPatterns.includes(pattern)}
                      max={2}
                      step={0.2}
                      value={patternScale[childIndex]}
                      onChange={(e) => {
                        if (childIndex === 0 || childIndex % 2 == 0) {
                          updatePatternScale({ [childIndex]: e });
                          updatePatternScale({ [childIndex + 1]: e });
                        } else {
                          updatePatternScale({ [childIndex]: e });
                        }
                      }}
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
                      onChange={(e) => {
                        if (childIndex === 0 || childIndex % 2 == 0) {
                          updatePatternRotationDeegre({ [childIndex]: e });
                          updatePatternRotationDeegre({ [childIndex + 1]: e });
                        } else {
                          updatePatternRotationDeegre({ [childIndex]: e });
                        }
                      }}
                    />
                    <span>{patternRotationDeegre[childIndex]}</span>
                  </div>
                </div>
                <div className={styles.contentWrap}>
                  <AutoSizer disableHeight>
                    {({ width }) => (
                      <Grid
                        cellRenderer={cellRenderer}
                        columnCount={3}
                        columnWidth={125}
                        height={300}
                        rowCount={Math.ceil(patternPaths.length / 3)}
                        rowHeight={120}
                        width={width}
                        childIndex={childIndex}
                      />
                    )}
                  </AutoSizer>
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    );
  }, [
    children,
    expanded,
    patternScale,
    patternRotationDeegre,
    updatePattern,
    updateLayer,
    handleChange,
    cellRenderer,
    patternLayers,
  ]);

  return memoizedPatternComponent;
};

export default trackWindowScroll(Pattern);
