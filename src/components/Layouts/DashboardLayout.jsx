import { useEffect, useState } from "react";
import styles from "../../scss/layout/DashboardLayout.module.scss";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSideBarOpen] = useState(true);

  return (
    <div className={styles.dash_layout}>
      <div className={styles.dash_wrapper}>
        {/* {sidebarToggle.isOpen ? (
          <div
            className={styles.overlaySideBar}
            onClick={() => {
              console.log("Hello");
            }}
          ></div>
        ) : (
          ""
        )} */}
        <div className={`${styles.sidebar} ${!sidebarOpen ? styles.open : ""}`}>
          <Sidebar />
        </div>
        <div
          className={`${styles.dash_body_outer} ${
            !sidebarOpen ? styles.open : ""
          }`}
        >
          <div className={styles.dash_body}>
            <div className={styles.dash_body_container}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
