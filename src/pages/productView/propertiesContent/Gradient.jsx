import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useEffect, useState } from "react";
import { CrossIcon, TickIcon } from "../../../assets/svg/icons";
import { useProductStore } from "../../../store";
import { Color as ParceColor } from "three";
import styles from "./properties.module.scss";
import ThemeButton from "../../../components/common/ThemeButton";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { colorList } from "../../../components/data/colors";

const Gradient = () => {
  const ref = useProductStore((state) => state.ref);
  const {
    color,
    updateColor,
    gradient,
    updateGradient,
    gradientScale,
    gradientAngle,
    updateGradientScale,
    updateGradientAngle,
    updateColorIndex,
    updateIsGradient,
    handleDesignGradient1,
    handleDesignGradient2,
    handleIsDesignGradientEnabled,
    designGradient1,
    designGradient2,
  } = useProductStore((state) => state);

  const children = ref?.current?.children || [];
  const [designType, setDesignType] = useState(1);
  const [expanded, setExpanded] = React.useState(false > false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={`${styles.colorWrap} ${styles.gradientWrap}`}>
      {children?.map((item, childIndex) => {
        const [type, setType] = useState(1);

        if (childIndex !== 4 && childIndex !== 5) {
          return (
            <Accordion
              key={item.uuid}
              onChange={handleChange(item?.uuid)}
              expanded={expanded === item?.uuid}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div
                  className={`${styles.colorViewer} ${styles.mainColorViewer}`}
                  style={{
                    background: `linear-gradient(90deg, ${
                      color[childIndex] || "transparent"
                    }, ${gradient[childIndex] || "transparent"})`,
                  }}
                />
                {item.name}
              </AccordionSummary>
              <AccordionDetails>
                <div className={styles.scaleAngleWrap}>
                  <div className={styles.sliderWrap}>
                    <span>Scale</span>
                    <Slider
                      min={0.1}
                      max={1}
                      step={0.01}
                      value={gradientScale[childIndex]}
                      onChange={(e) => updateGradientScale({ [childIndex]: e })}
                    />
                  </div>
                  {/* <div className={styles.sliderWrap}>
                  <span>Angle</span>
                  <Slider
                    min={0}
                    max={360}
                    step={1}
                    value={gradientAngle[childIndex]}
                    onChange={(e) => updateGradientAngle({ [childIndex]: e })}
                  />
                </div> */}
                </div>
                <div className={styles.buttonWrap}>
                  <ThemeButton
                    onClick={() => {
                      updateGradientScale({ [childIndex]: 0.91 });
                      setType(1);
                      //updateIsGradient(true);
                    }}
                    variant={type === 2 ? "outlined" : "contained"}
                  >
                    Color
                  </ThemeButton>
                  <ThemeButton
                    onClick={() => {
                      updateGradientScale({ [childIndex]: 0.91 });
                      setType(2);
                      //updateIsGradient(true);
                    }}
                    variant={type === 1 ? "outlined" : "contained"}
                  >
                    Gradient
                  </ThemeButton>
                  <div
                    className={styles.gradientViewer}
                    style={{
                      background: `linear-gradient(110deg, ${
                        color[childIndex] || "transparent"
                      }, ${gradient[childIndex] || "transparent"})`,
                    }}
                  />
                </div>
                <div className={styles.colorPalletWrap}>
                  <div
                    className={styles.colorViewer}
                    style={{ backgroundColor: "transparent" }}
                    onClick={() => {
                      if (type === 1) {
                        updateColor({ [childIndex]: null });
                        updateColorIndex(childIndex);
                        // item.material.color = new ParceColor(0xffffff);
                      } else {
                        updateColorIndex(childIndex);
                        updateGradient({ [childIndex]: null });
                      }
                      updateIsGradient({ [childIndex]: false });
                    }}
                  >
                    <CrossIcon />
                  </div>
                  {colorList.map((itemColor, index) => (
                    <div
                      key={index}
                      className={styles.colorViewer}
                      style={{ backgroundColor: itemColor }}
                      onClick={() => {
                        if (type === 1) {
                          updateColor({ [childIndex]: itemColor });
                          updateColorIndex(childIndex);
                          // item.material.color = new ParceColor(itemColor);
                        } else {
                          updateColorIndex(childIndex);
                          updateGradient({ [childIndex]: itemColor });
                        }
                        updateIsGradient({ [childIndex]: true });
                      }}
                    >
                      {type === 1 &&
                        color[childIndex] &&
                        color[childIndex] === itemColor && <TickIcon />}
                      {type === 2 &&
                        gradient[childIndex] &&
                        gradient[childIndex] === itemColor && <TickIcon />}
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          );
        }
      })}
      <Accordion
        onChange={handleChange('design_gradient')}
        expanded={expanded === 'design_gradient'}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div
            className={`${styles.colorViewer} ${styles.mainColorViewer}`}
            style={{
              background: `linear-gradient(110deg, ${
                designGradient1 || "transparent"
              }, ${designGradient2 || "transparent"})`,
            }}
          />
          Design Gradient
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.buttonWrap}>
            <ThemeButton
              onClick={() => {
                // updateGradientScale({ [childIndex]: 0.91 });
                setDesignType(1);
                //updateIsGradient(true);
              }}
              variant={designType === 2 ? "outlined" : "contained"}
            >
              Color
            </ThemeButton>
            <ThemeButton
              onClick={() => {
                // updateGradientScale({ [childIndex]: 0.91 });
                setDesignType(2);
                //updateIsGradient(true);
              }}
              variant={designType === 1 ? "outlined" : "contained"}
            >
              Gradient
            </ThemeButton>
            <div
              className={styles.gradientViewer}
              style={{
                background: `linear-gradient(110deg, ${
                  designGradient1 || "transparent"
                }, ${designGradient2 || "transparent"})`,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {colorList.map((itemColor, index) => (
              <div
                className={styles.colorViewer}
                style={{ backgroundColor: itemColor }}
                onClick={() => {
                  if (designType === 1) {
                    handleDesignGradient1(itemColor);
                  } else {
                    handleDesignGradient2(itemColor);
                  }
                  handleIsDesignGradientEnabled(true);
                }}
              >
                {designType === 1 &&
                  designGradient1 &&
                  designGradient1 === itemColor && <TickIcon />}
                {designType === 2 &&
                  designGradient2 &&
                  designGradient2 === itemColor && <TickIcon />}
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Gradient;
