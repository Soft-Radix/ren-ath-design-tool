import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import React from "react";
import { useProductStore } from "../../../store";
import styles from "./properties.module.scss";
import pattern1 from "../../../../public/textures/pattern.png";
import pattern2 from "../../../../public/textures/pattern2.png";
import pattern3 from "../../../../public/textures/pattern3.png";

const Pattern = () => {
  const ref = useProductStore((state) => state.ref);
  const children = ref?.current?.children || [];

  const { color, updatePattern } = useProductStore((state) => state);

  return (
    <div className={`${styles.colorWrap} ${styles.patternWrap}`}>
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
            <div className={styles.contentWrap}>
              <div
                className={`${styles.imgWrap}`}
                onClick={() => updatePattern(1)}
              >
                <img src={pattern1} alt="" />
              </div>
              <div
                className={`${styles.imgWrap}`}
                onClick={() => updatePattern(2)}
              >
                <img src={pattern2} alt="" />
              </div>{" "}
              <div
                className={`${styles.imgWrap}`}
                onClick={() => updatePattern(3)}
              >
                <img src={pattern3} alt="" />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Pattern;
