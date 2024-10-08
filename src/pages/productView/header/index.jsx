import { Tooltip } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BackButtonIcon,
  ShareButton
} from "../../../assets/svg/icons";
import CustomDrawer from "../../../components/common/drawer";
import ThemeButton from "../../../components/common/ThemeButton";
import { useProductStore } from "../../../store";
import { saveUniformDesign } from "../../../utils/funtions";
import styles from "./header.module.scss";

const Header = () => {
  const productName = useProductStore((state) => state.name);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };
  return (
    <div className={styles.mainWrap}>
      <div className={styles.leftWrap}>
        <span onClick={() => navigate(-1)}>
          <BackButtonIcon />
        </span>
        <span className={styles.title}>{productName}</span>
      </div>
      <div className={styles.rightWrap}>
        <Tooltip title="Add your own color palette">
          <img
            src="../../../../src/assets/svg/colorPallete.svg"
            alt=""
            style={{
              marginTop: 5,
              cursor: "pointer",
            }}
            onClick={toggleDrawer(true)}
          />
        </Tooltip>
        <CustomDrawer open={isOpen} toggleDrawer={toggleDrawer} />
        <ShareButton />
        <ThemeButton
          onClick={() => {
            saveUniformDesign();
            navigate("/");
          }}
        >
          Save
        </ThemeButton>
      </div>
    </div>
  );
};

export default Header;
