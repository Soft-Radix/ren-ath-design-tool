import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { motion } from "framer-motion";
import React, { useState } from "react";
import back from "../../../assets/images/products/placement/back.png";
import front from "../../../assets/images/products/placement/front.png";
import { CrossIcon, TickIcon } from "../../../assets/svg/icons";
import ThemeButton from "../../../components/common/ThemeButton";
import { useProductStore } from "../../../store";
import styles from "./properties.module.scss";

const Name = () => {
  const {
    modelName,
    updateName,
    namePosition,
    updateNamePosition,
    nameFont,
    updateNameFont,
    nameColor,
    updateNameColor,
    nameOutline,
    updateNameOutline,
  } = useProductStore((state) => state);

  const colorList = [
    "#D14E24",
    "#EF7E15",
    "#E9ED23",
    "#AED124",
    "#D1AB24",
    "#85D124",
    "#24D169",
  ];

  const [type, setType] = useState(1);

  return (
    <div className={styles.numberWrap}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          + Add Name
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.addNumberWrap}>
            <div
              className={styles.colorViewer}
              style={{ backgroundColor: "transparent" }}
              onClick={() => updateNamePosition(0)}
            >
              <CrossIcon />
            </div>
            <div className={styles.layers}>
              <div
                className={`${styles.imgWrap} ${
                  namePosition === 1 ? styles.selected : ""
                }`}
                onClick={() => updateNamePosition(1)}
              >
                <img src={front} alt="" />
              </div>
              <div
                className={`${styles.imgWrap} ${
                  namePosition === 2 ? styles.selected : ""
                }`}
                onClick={() => updateNamePosition(2)}
              >
                <img src={back} alt="" />
              </div>
            </div>
          </div>
          <input
            className={styles.numberInput}
            placeholder="Enter name"
            value={modelName}
            onChange={(e) => updateName(e.target.value)}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Change Font
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.fontWrap}>
            <motion.div
              className={`${styles.fontItem1} ${
                nameFont === 1 ? styles.selected : ""
              }`}
              onClick={() => updateNameFont(1)}
              whileHover={{ scale: 1.02 }}
            >
              F1 2345567789
            </motion.div>
            <motion.div
              className={`${styles.fontItem2} ${
                nameFont === 2 ? styles.selected : ""
              }`}
              onClick={() => updateNameFont(2)}
              whileHover={{ scale: 1.02 }}
            >
              F1 2345567789
            </motion.div>
            <motion.div
              className={`${styles.fontItem3} ${
                nameFont === 3 ? styles.selected : ""
              }`}
              onClick={() => updateNameFont(3)}
              whileHover={{ scale: 1.02 }}
            >
              F1 2345567789
            </motion.div>{" "}
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Color & Outline
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.fontColorWrap}>
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
                Outline
              </ThemeButton>
            </div>

            <div className={styles.colorPalletWrap}>
              <div
                className={styles.colorViewer}
                style={{ backgroundColor: "transparent" }}
                onClick={() =>
                  type === 1 ? updateNameColor("") : updateNameOutline("")
                }
              >
                <CrossIcon />
              </div>
              {colorList.map((itemColor, index) => (
                <div
                  key={index}
                  className={styles.colorViewer}
                  style={{ backgroundColor: itemColor }}
                  onClick={() =>
                    type === 1
                      ? updateNameColor(itemColor)
                      : updateNameOutline(itemColor)
                  }
                >
                  {type === 1
                    ? nameColor === itemColor && <TickIcon />
                    : nameOutline === itemColor && <TickIcon />}
                </div>
              ))}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Name;
