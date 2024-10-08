import React, { useEffect, useState } from "react";
import MainLayout from "../../components/Layouts/MainLayout";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import styles from "./Profile.module.scss";
import ThemeButton from "../../components/common/ThemeButton";
import useFetch from "../../hook/CustomHook/usefetch";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState(null);
  const [loadQuery, { response, loading, error }] = useFetch(
    "/auth/my-account-information",
    {
      method: "get",
    }
  );
  useEffect(() => {
    if (response?.status) {
      setUserDetail(response.data);
    }
  }, [response, error]);
  useEffect(() => {
    loadQuery();
  }, []);
  return (
    <MainLayout>
      <div className={styles.bredCrumb}></div>
      <Container>
        <Box className={styles.myProfileWrapper}>
          <Box className={styles.headerTitleWrapper}>
            <Typography variant="h4" className={styles.title}>
              My Profile
            </Typography>
            <Typography className={styles.desc}>
              Here is your profile details.
            </Typography>
          </Box>
          {loading ? (
            <Box className={styles.contentWrapper}>
              <span
                className="loadingBars custom_loader"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <RotatingLines
                  strokeColor="currentColor"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="20"
                />
              </span>
            </Box>
          ) : (
            <>
              <Box className={styles.contentWrapper}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem
                    disableGutters
                    secondaryAction={
                      <Typography className={styles.itemListValue}>
                        {userDetail?.first_name ?? "N/A"}
                      </Typography>
                    }
                  >
                    <ListItemText
                      primary={"First Name"}
                      className={styles.itemTitle}
                    />
                  </ListItem>
                  <ListItem
                    disableGutters
                    secondaryAction={
                      <Typography className={styles.itemListValue}>
                        {userDetail?.last_name ?? "N/A"}
                      </Typography>
                    }
                  >
                    <ListItemText
                      primary={"Last Name"}
                      className={styles.itemTitle}
                    />
                  </ListItem>
                  <ListItem
                    disableGutters
                    secondaryAction={
                      <Typography className={styles.itemListValue}>
                        {userDetail?.email ?? "N/A"}
                      </Typography>
                    }
                  >
                    <ListItemText
                      primary={"Email Address"}
                      className={styles.itemTitle}
                    />
                  </ListItem>
                  <ListItem
                    disableGutters
                    secondaryAction={
                      <Typography className={styles.itemListValue}>
                        {userDetail?.phone_number ?? "N/A"}
                      </Typography>
                    }
                  >
                    <ListItemText
                      primary={"Phone Number"}
                      className={styles.itemTitle}
                    />
                  </ListItem>
                  <ListItem
                    disableGutters
                    secondaryAction={
                      <Typography className={styles.itemListValue}>
                        {userDetail?.organization ?? "N/A"}
                      </Typography>
                    }
                  >
                    <ListItemText
                      primary={"Organization"}
                      className={styles.itemTitle}
                    />
                  </ListItem>
                  <ListItem
                    disableGutters
                    secondaryAction={
                      <Typography className={styles.itemListValue}>
                        {userDetail?.club ?? "N/A"}
                      </Typography>
                    }
                  >
                    <ListItemText
                      primary={"Club"}
                      className={styles.itemTitle}
                    />
                  </ListItem>
                  <ListItem
                    disableGutters
                    secondaryAction={
                      <Typography className={styles.itemListValue}>
                        {userDetail?.team_name ?? "N/A"}
                      </Typography>
                    }
                  >
                    <ListItemText
                      primary={"Team Name"}
                      className={styles.itemTitle}
                    />
                  </ListItem>
                  <ListItem
                    disableGutters
                    secondaryAction={
                      <Typography className={styles.itemListValue}>
                        {userDetail?.city && userDetail?.state?.state_name
                          ? `${userDetail?.city} / ${userDetail?.state?.state_name}`
                          : "N/A"}
                      </Typography>
                    }
                  >
                    <ListItemText
                      primary={"City / State"}
                      className={styles.itemTitle}
                    />
                  </ListItem>
                </List>
              </Box>
              <Box className={styles.contentWrapperFooter}>
                <ThemeButton
                  className={styles.saveButton}
                  onClick={() => {
                    navigate("/edit-profile");
                  }}
                >
                  Edit Profile
                </ThemeButton>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </MainLayout>
  );
};

export default Profile;
