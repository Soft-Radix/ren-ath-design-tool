import React, { useEffect, useState } from "react";
import MainLayout from "../../components/Layouts/MainLayout";
import { Box, Container, Grid, Typography } from "@mui/material";
import styles from "./Profile.module.scss";
import ThemeButton from "../../components/common/ThemeButton";
import useFetch from "../../hook/CustomHook/usefetch";
import { RotatingLines } from "react-loader-spinner";
import { InputField } from "../../components/common/InputField/InputField";
import { SelectField } from "../../components/common/Select/Select";
import { useFormik } from "formik";
import { setProfileValSchema } from "../../validations/AuthSchema";
import { toast } from "react-toastify";
import LoadingBars from "../../components/common/loader/LoadingBars";
import { useNavigate } from "react-router-dom";
const EditProfile = () => {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState(null);
  const [statesList, setStatesList] = useState([]);
  const [loadQuery, { response, loading, error }] = useFetch(
    "/auth/my-account-information",
    {
      method: "get",
    }
  );
  const [fetchStates, { response: stateResponse, error: stateError }] =
    useFetch("/states?start=0&limit=-1", {
      method: "get",
    });
  const [
    updateProfile,
    {
      response: updateProfileResponse,
      loading: updateProfileLoading,
      error: updateProfileError,
    },
  ] = useFetch("/auth/update-account-information", {
    method: "post",
  });

  const formik = useFormik({
    initialValues: {
      firstName: userDetail?.first_name ?? "",
      lastName: userDetail?.last_name ?? "",
      email: userDetail?.email ?? "",
      phone: userDetail?.phone_number ?? "",
      organization: userDetail?.organization ?? "",
      club: userDetail?.club ?? "",
      team_name: userDetail?.team_name ?? "",
      city: userDetail?.city ?? "",
      state: userDetail?.state_id ?? "",
    },
    enableReinitialize: true,
    validationSchema: setProfileValSchema,
    onSubmit: (values) => {
      const params = {
        first_name: values.firstName,
        last_name: values.lastName,
        phone_number: values.phone,
        organization: values.organization,
        club: values.club,
        team_name: values.team_name,
        city: values.city,
        state_id: values.state !== "" ? Number(values.state) : 0,
      };
      updateProfile(params);
    },
  });

  useEffect(() => {
    if (response?.status) {
      setUserDetail(response.data);
    }
  }, [response, error]);

  useEffect(() => {
    if (stateResponse?.status) {
      const options = stateResponse?.data?.list?.map((data) => ({
        title: data.state_name,
        value: data?.id,
      }));
      setStatesList(options);
    }
  }, [stateResponse, stateError]);
  useEffect(() => {
    toast.dismiss();
    if (updateProfileResponse) {
      navigate("/profile");
      toast.success(updateProfileResponse.message);
    }

    if (updateProfileError) {
      const toastId = toast.error(updateProfileError.message);
      return () => {
        toast.dismiss(toastId);
      };
    }
  }, [updateProfileResponse, updateProfileError]);

  useEffect(() => {
    loadQuery();
    fetchStates();
  }, []);
  return (
    <MainLayout>
      <div className={styles.bredCrumb}></div>
      <Container>
        <Box className={styles.myProfileWrapper}>
          <Box className={styles.headerTitleWrapper}>
            <Typography variant="h4" className={styles.title}>
              Edit Profile
            </Typography>
            <Typography className={styles.desc}>
              Here is you can edit your profile details.
            </Typography>
          </Box>
          {loading ? (
            <Box className={styles.contentWrapperEdit}>
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
              <form onSubmit={formik.handleSubmit}>
                <Box className={styles.contentWrapperEdit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <InputField
                        label="First Name"
                        name="firstName"
                        formik={formik}
                        placeholder="Enter first name"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputField
                        label="Last Name"
                        name="lastName"
                        formik={formik}
                        placeholder="Enter last name"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputField
                        label="Email"
                        name="email"
                        type="email"
                        formik={formik}
                        placeholder="Enter email address"
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputField
                        label="Phone"
                        name="phone"
                        formik={formik}
                        placeholder="Enter phone number"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputField
                        label="Organization"
                        name="organization"
                        formik={formik}
                        placeholder="Enter organization"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <InputField
                            label="Club"
                            name="club"
                            formik={formik}
                            placeholder="Enter club"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <InputField
                            label="Team Name"
                            name="team_name"
                            formik={formik}
                            placeholder="Enter team name"
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" className={styles.subHeading}>
                        Address
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputField
                        label="City"
                        name="city"
                        formik={formik}
                        placeholder="Enter city"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SelectField
                        label="State"
                        name="state"
                        formik={formik}
                        placeholder="Select state"
                        options={statesList}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box className={styles.contentWrapperFooter}>
                  <ThemeButton
                    sx={{
                      alignItem: "center",
                      display: "flex",
                      margin: "0 auto",
                    }}
                    className={styles.saveButton}
                    type="submit"
                    disabled={updateProfileLoading}
                  >
                    {updateProfileLoading && <LoadingBars />} Save Changes
                  </ThemeButton>
                </Box>
              </form>
            </>
          )}
        </Box>
      </Container>
    </MainLayout>
  );
};

export default EditProfile;
