import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useEffect } from "react";
import { CrossIcon, TickIcon } from "../../../assets/svg/icons";
import { useProductStore } from "../../../store";
import { Color as ParceColor } from "three";
import styles from "./properties.module.scss";
import { colorList } from "../../../components/data/colors";
import { handleAddNewUniform, modelRotationValue } from "../../../utils/funtions";

const Color = () => {
  const ref = useProductStore((state) => state.ref);
  const children = ref?.current?.children || [];

  const {
    color,
    updateColor,
    updateColorIndex,
    updateLayer,
    handleDesignColor,
    designColor,
    patternColor,
    handlePatternColor,
    handleIsDesignGradientEnabled,
    handleModelRotation,
  } = useProductStore((state) => state);
  console.log("🚀 ~ Color ~ patternColor:", patternColor);
  console.log("🚀 ~ Color ~ designColor:", designColor);
  console.log("🚀 ~ Color ~ color:", color);

  const [expanded, setExpanded] = React.useState(false > false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    handleAddNewUniform("color", {
      color,
      designColor,
      patternColor,
    });
  }, [color, designColor, patternColor]);
  
  return (
    <div className={styles.colorWrap}>
      {children?.map((item, childIndex) => (
        <Accordion
          key={item.uuid}
          onChange={handleChange(item?.uuid)}
          expanded={expanded === item?.uuid}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() => {
              handleModelRotation(modelRotationValue(childIndex));
            }}
          >
            <div
              className={`${styles.colorViewer} ${styles.mainColorViewer}`}
              style={{ backgroundColor: color[childIndex] }}
            />
            {item.name}
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.colorPalletWrap}>
              <div
                className={styles.colorViewer}
                style={{ backgroundColor: "transparent" }}
                onClick={() => {
                  if (childIndex == 0 || childIndex % 2 === 0) {
                    item.material.color = new ParceColor(0xffffff);
                    children[childIndex + 1].material.color = new ParceColor(
                      0xffffff
                    );
                    updateColor({ [childIndex]: null, [childIndex + 1]: null });
                  } else {
                    updateColor({ [childIndex]: null });
                    item.material.color = new ParceColor(0xffffff);
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
                    updateColorIndex(childIndex);
                    // updateLayer(childIndex);
                    if (childIndex == 0 || childIndex % 2 === 0) {
                      updateColor({
                        [childIndex]: itemColor,
                        [childIndex + 1]: itemColor,
                      });
                      item.material.color = new ParceColor(itemColor);
                      children[childIndex + 1].material.color = new ParceColor(
                        itemColor
                      );
                    } else {
                      updateColor({
                        [childIndex]: itemColor,
                      });
                      item.material.color = new ParceColor(itemColor);
                    }
                  }}
                >
                  {color[childIndex] && color[childIndex] === itemColor && (
                    <TickIcon />
                  )}
                </div>
              ))}

              <div>
                <h4>Pattern Colors</h4>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  {/* <div
                    className={styles.colorViewer}
                    style={{ backgroundColor: "transparent" }}
                    onClick={() => {
                      handlePatternColor({ [childIndex]: null });
                    }}
                  >
                    <CrossIcon />
                  </div> */}
                  {colorList.map((itemColor, index) => (
                    <div
                      key={index}
                      className={styles.colorViewer}
                      style={{ backgroundColor: itemColor }}
                      onClick={() => {
                        handlePatternColor({ [childIndex]: itemColor });
                      }}
                    >
                      {patternColor[childIndex] &&
                        patternColor[childIndex] === itemColor && <TickIcon />}
                    </div>
                  ))}
                </div>
              </div>

              <h3>Design Color</h3>
              <div className={styles.colorPalletWrap}>
                {/* <div
              className={styles.colorViewer}
              style={{ backgroundColor: "transparent" }}
              onClick={() => {
                handleDesignColor(null);
              }}
            >
              <CrossIcon />
            </div> */}
                {colorList.map((itemColor, index) => (
                  <div
                    key={index}
                    className={styles.colorViewer}
                    style={{ backgroundColor: itemColor }}
                    onClick={() => {
                      handleDesignColor({ [childIndex]: itemColor });
                      handleIsDesignGradientEnabled(false);
                    }}
                  >
                    {designColor[childIndex] &&
                      designColor[childIndex] === itemColor && <TickIcon />}
                  </div>
                ))}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
      {/* <Accordion
        onChange={handleChange("design")}
        expanded={expanded === "design"}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div
            className={`${styles.colorViewer} ${styles.mainColorViewer}`}
            style={{ backgroundColor: "" }}
          />
          Design Colors
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.colorPalletWrap}>
            
            {colorList.map((itemColor, index) => (
              <div
                key={index}
                className={styles.colorViewer}
                style={{ backgroundColor: itemColor }}
                onClick={() => {
                  handleDesignColor(itemColor);
                  handleIsDesignGradientEnabled(false);
                }}
              >
                {designColor && designColor === itemColor && <TickIcon />}
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
};

export default Color;
