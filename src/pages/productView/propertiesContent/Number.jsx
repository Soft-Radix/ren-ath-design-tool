import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import styles from "./properties.module.scss";
import { CrossIcon, TickIcon } from "../../../assets/svg/icons";
import front from "../../../assets/images/products/placement/front.png";
import back from "../../../assets/images/products/placement/back.png";
import chest_left from "../../../assets/images/products/placement/chest_left.png";
import chest_right from "../../../assets/images/products/placement/chest_right.png";
import { useProductStore } from "../../../store";
import { motion } from "framer-motion";
import ThemeButton from "../../../components/common/ThemeButton";

const Number = () => {
  const {
    number,
    updateNumber,
    numberPosition,
    updateNumberPosition,
    numberFont,
    updateNumberFont,
    numberColor,
    updateNumberColor,
    numberOutline,
    updateNumberOutline,
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
          + Add Number
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.addNumberWrap}>
            <div
              className={styles.colorViewer}
              style={{ backgroundColor: "transparent" }}
              onClick={() => updateNumberPosition(0)}
            >
              <CrossIcon />
            </div>
            <div className={styles.layers}>
              <div
                className={`${styles.imgWrap} ${
                  numberPosition === 1 ? styles.selected : ""
                }`}
                onClick={() => updateNumberPosition(1)}
              >
                <img src={front} alt="" />
              </div>
              <div
                className={`${styles.imgWrap} ${
                  numberPosition === 2 ? styles.selected : ""
                }`}
                onClick={() => updateNumberPosition(2)}
              >
                <img src={back} alt="" />
              </div>
              <div
                className={`${styles.imgWrap} ${
                  numberPosition === 3 ? styles.selected : ""
                }`}
                onClick={() => updateNumberPosition(3)}
              >
                <img src={chest_left} alt="" />
              </div>
              <div
                className={`${styles.imgWrap} ${
                  numberPosition === 4 ? styles.selected : ""
                }`}
                onClick={() => updateNumberPosition(4)}
              >
                <img src={chest_right} alt="" />
              </div>
            </div>
          </div>
          <input
            type="number"
            className={styles.numberInput}
            max="999"
            placeholder="Enter a number"
            value={number}
            onChange={(e) =>
              e.target.value.length < 4 && updateNumber(e.target.value)
            }
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
                numberFont === 1 ? styles.selected : ""
              }`}
              onClick={() => updateNumberFont(1)}
              whileHover={{ scale: 1.02 }}
            >
              F1 2345567789
            </motion.div>
            <motion.div
              className={`${styles.fontItem2} ${
                numberFont === 2 ? styles.selected : ""
              }`}
              onClick={() => updateNumberFont(2)}
              whileHover={{ scale: 1.02 }}
            >
              F1 2345567789
            </motion.div>
            <motion.div
              className={`${styles.fontItem3} ${
                numberFont === 3 ? styles.selected : ""
              }`}
              onClick={() => updateNumberFont(3)}
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
                  type === 1 ? updateNumberColor("") : updateNumberOutline("")
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
                      ? updateNumberColor(itemColor)
                      : updateNumberOutline(itemColor)
                  }
                >
                  {type === 1
                    ? numberColor === itemColor && <TickIcon />
                    : numberOutline === itemColor && <TickIcon />}
                </div>
              ))}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Number;
