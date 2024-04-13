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

const colorList = [
  "#D14E24",
  "#EF7E15",
  "#E9ED23",
  "#AED124",
  "#D1AB24",
  "#85D124",
  "#24D169",
];

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
  } = useProductStore((state) => state);

  const children = ref?.current?.children || [];

  return (
    <div className={`${styles.colorWrap} ${styles.gradientWrap}`}>
      {children?.map((item, childIndex) => {
        const [type, setType] = useState(1);

        return (
          <Accordion key={item.uuid}>
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
                  onClick={() => setType(1)}
                  variant={type === 2 ? "outlined" : "contained"}
                >
                  Color
                </ThemeButton>
                <ThemeButton
                  onClick={() => setType(2)}
                  variant={type === 1 ? "outlined" : "contained"}
                >
                  Gradient
                </ThemeButton>
                <div
                  className={styles.gradientViewer}
                  style={{
                    background: `linear-gradient(90deg, ${
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
                      item.material.color = new ParceColor(0xffffff);
                    } else {
                      updateGradient({ [childIndex]: null });
                    }
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
                        item.material.color = new ParceColor(itemColor);
                      } else {
                        updateGradient({ [childIndex]: itemColor });
                      }
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
      })}
    </div>
  );
};

export default Gradient;
