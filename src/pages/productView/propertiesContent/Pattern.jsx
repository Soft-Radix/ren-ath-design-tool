import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Slider from "rc-slider";
import React, { useEffect, useState } from "react";
import { useProductStore } from "../../../store";

import { IconButton, Tooltip } from "@mui/material";
import loaderGif from "../../../assets/gif/loader.gif";
import resetIcon from "../../../assets/svg/reset.svg";
import styles from "./properties.module.scss";

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
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
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

const Pattern = () => {
  const ref = useProductStore((state) => state.ref);
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(0);

  const children = ref?.current?.children || [];
  const {
    color,
    updatePattern,
    updateLayer,
    patternScale,
    updatePatternScale,
    updatePatternRotationDeegre,
    patternRotationDeegre,
  } = useProductStore((state) => state);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (expanded) {
      setCount((prev) => prev + 1);
      preloadImages();
    }
  }, [expanded]);

  const preloadImages = () => {
    setLoader(true);

    patterns.forEach((pattern) => {
      const img = new Image();
      img.src = pattern;
    });
    setTimeout(() => {
      setLoader(false);
    }, 10000);
  };

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
                      min={0}
                      max={10}
                      step={1}
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
                      onChange={(e) =>
                        updatePatternRotationDeegre({ [childIndex]: e })
                      }
                    />
                    <span>{patternRotationDeegre[childIndex]}</span>
                  </div>
                </div>
                <div className={styles.contentWrap}>
                  {count <= 1 && loader ? (
                    <div
                      className="modelLoader"
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <img src={loaderGif} alt="" />
                    </div>
                  ) : (
                    patterns?.map((pattern, index) => (
                      <div
                        key={index + 1}
                        className={`${styles.imgWrap}`}
                        onClick={() => {
                          updatePattern(index + 1);
                          updateLayer(childIndex);
                        }}
                      >
                        <LazyLoadImage
                          src={pattern}
                          alt={`pattern${index + 1}`}
                          effect="opacity"
                          placeholderSrc={loading}
                          visibleByDefault={true}
                        />
                      </div>
                    ))
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          );
        }
      })}
    </div>
  );
};
export default trackWindowScroll(Pattern);

// export default Pattern;
