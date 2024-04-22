import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import React from "react";
import { useProductStore } from "../../../store";
import styles from "./properties.module.scss";

const Pattern = () => {
  const ref = useProductStore((state) => state.ref);
  const children = ref?.current?.children || [];

  const { color } = useProductStore((state) => state);

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
          <AccordionDetails>Hello Grin</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Pattern;
