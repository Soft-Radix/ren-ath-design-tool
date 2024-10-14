import { Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { arrowLeftIcon, menuToggle } from "../../../assets/icons/icons";
import ThemeButton from "../ThemeButton";

const useStyles = makeStyles({
  pageHead: {
    marginBottom: "2rem",
    display: "flex",
    alignItems: "flex-start",
    width: "100% !important",
    justifyContent: "space-between",
    "@media (max-width: 1024px)": {
      alignItems: "center",
    },
    "@media (max-width: 567px)": {
      display: "block",
    },
    "@media (max-width: 425px)": {
      marginBottom: "1rem",
    },
  },
  pageHead_left: {
    display: "flex",
    alignItems: "center",
    gap: "1.25rem",
    "@media (max-width: 567px)": {
      marginBottom: "1rem",
    },
  },
  pageHead_title: {},
  pageHead_btnWrap: {
    display: "flex",
    alignItems: "flex-start",
    minWidth: "max-content",
    "@media (max-width: 920px)": {
      marginTop: "5px",
      display: "flex",
      justifyContent: "flex-end",
    },
    "@media (max-width: 425px)": {
      minWidth: "100%",
    },
  },
  toggleSidebar: {
    display: "none",
    "@media (max-width: 920px)": {
      display: "block",
    },
  },
});

const PageHeading = ({ title, subtitle, backButton, children, backUrl }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleSideBarToggle = () => {};

  return (
    <div className={`${classes.pageHead} pageHeadCustom`}>
      <div className={classes.pageHead_left}>
        <div className={classes.toggleSidebar}>
          <ThemeButton variant="outlined" btnIcon onClick={handleSideBarToggle}>
            {menuToggle}
          </ThemeButton>
        </div>
        {backButton && (
          <Tooltip title="Back">
            <span>
              <ThemeButton
                variant="outlined"
                btnIcon
                onClick={() => (backUrl ? navigate(backUrl) : navigate(-1))}
              >
                {arrowLeftIcon}
              </ThemeButton>
            </span>
          </Tooltip>
        )}
        <div className={classes.pageHead_title}>
          <h2 style={{ wordBreak: "break-word", color: "#0E2B3A" }}>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      <div className={`pageHeadButtonCustom ${classes.pageHead_btnWrap}`}>
        {children}
      </div>
    </div>
  );
};

export default PageHeading;
