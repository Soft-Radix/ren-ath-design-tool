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
  const { color, updateColor, gradient, updateGradient } = useProductStore(
    (state) => state
  );

  const children = ref?.current?.children || [];

  const [type, setType] = useState(1);

  useEffect(() => {
    console.log("color ==> ", color);
  }, [color]);

  return (
    <div className={`${styles.colorWrap} ${styles.gradientWrap}`}>
      {children?.map((item, childIndex) => (
        <Accordion key={item.uuid}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div
              className={`${styles.colorViewer} ${styles.mainColorViewer}`}
              style={{ backgroundColor: color[childIndex] }}
            />
            {item.name}
          </AccordionSummary>
          <AccordionDetails>
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
                  type === 1
                    ? updateColor({ [childIndex]: null })
                    : updateGradient({ [childIndex]: null });
                  item.material.color = new ParceColor(0xffffff);
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
                    type === 1
                      ? updateColor({ [childIndex]: itemColor })
                      : updateGradient({ [childIndex]: itemColor });
                    item.material.color = new ParceColor(itemColor);
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
      ))}
    </div>
  );
};

export default Gradient;
