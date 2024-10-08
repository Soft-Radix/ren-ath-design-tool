import React from "react";
import DashboardLayout from "../../../components/Layouts/DashboardLayout";
import PageHeading from "../../../components/common/theme/PageHeading";
import styles from "./AdminDashboard.module.scss";
import { Grid } from "@mui/material";
import cardImage from "./../../../assets/icons/dashboard-card.png";
import {
  ArrowRightIcon,
  DesignsIcon,
  UserIcon,
} from "../../../assets/icons/icons";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <DashboardLayout>
      <div>
        <PageHeading title="Dashboard" />
        <div className={styles.headerWrapper}>
          <Grid container spacing={2}>
            <Grid item xs={6} style={{ padding: "0 1rem" }}>
              <Link to={"/admin/users"} className={styles.decoNone}>
                <div
                  className={styles.cardOne}
                  style={{ backgroundImage: `url(${cardImage})` }}
                >
                  <div className={styles.cardContentWrapper}>
                    <div className={styles.avatarIcon}>
                      <UserIcon color="#fff" width={38} height={38} />
                    </div>
                    <div className={styles.cardContent}>
                      <p>Total Users</p>
                      <h5>1200</h5>
                    </div>
                  </div>
                  <div className={styles.arrowIconWrapper}>
                    <ArrowRightIcon />
                  </div>
                </div>
              </Link>
            </Grid>
            <Grid item xs={6} style={{ padding: "0 1rem" }}>
              <Link to={"/admin/designs"} className={styles.decoNone}>
                <div className={`${styles.cardOne} ${styles.cardOneBorder}`}>
                  <div className={styles.cardContentWrapper}>
                    <div className={styles.avatarIcon}>
                      <DesignsIcon color="#fff" width={38} height={38} />
                    </div>
                    <div className={styles.cardContent}>
                      <p>Total Designs</p>
                      <h5>1300</h5>
                    </div>
                  </div>
                  <div className={styles.arrowIconWrapper}>
                    <ArrowRightIcon color="#274350" />
                  </div>
                </div>
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
