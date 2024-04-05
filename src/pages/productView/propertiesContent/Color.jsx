import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useEffect } from "react";
import { CrossIcon, TickIcon } from "../../../assets/svg/icons";
import { useProductStore } from "../../../store";
import { Color as ParceColor } from "three";
import styles from "./properties.module.scss";

const colorList = [
  "#D14E24",
  "#EF7E15",
  "#E9ED23",
  "#AED124",
  "#D1AB24",
  "#85D124",
  "#24D169",
];

const Color = () => {
  const ref = useProductStore((state) => state.ref);
  const { color, updateColor } = useProductStore((state) => state);

  const children = ref?.current?.children || [];

  return (
    <div className={styles.colorWrap}>
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
            <div
              className={styles.colorViewer}
              style={{ backgroundColor: "transparent" }}
              onClick={() => {
                updateColor({ [childIndex]: null });
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
                  updateColor({ [childIndex]: itemColor });
                  item.material.color = new ParceColor(itemColor);
                }}
              >
                {color[childIndex] && color[childIndex] === itemColor && (
                  <TickIcon />
                )}
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Color;
