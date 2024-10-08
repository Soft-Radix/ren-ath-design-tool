import React, { useEffect, useState } from "react";
import styles from "./resetpassword.module.scss";
import { InputField } from "../../components/common/InputField/InputField";
import ThemeButton from "../../components/common/ThemeButton";
import useFetch from "../../hook/CustomHook/usefetch";
import LoadingBars from "../../components/common/loader/LoadingBars";
import { useFormik } from "formik";
import { resetValSchema } from "../../validations/AuthSchema";
import { toast } from "react-toastify";
import mainLogo from "../../assets/images/mainLogo.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [loader, setLoader] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
  const [loadQuery, { response, loading, error }] = useFetch(
    "/auth/reset-password",
    {
      method: "post",
    }
  );
  const handleForgotSubmit = (values) => {
    loadQuery(values);
  };
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: resetValSchema(),
    onSubmit: (values) => {
      const data = {
        token: token,
        password: values.confirmPassword,
      };
      handleForgotSubmit(data);
    },
  });
  const callApi = () =>
    instance
      .post("/token-verify", {
        type: 1,
        token: token,
      })
      .then((response) => {
        setLoader(true);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error, "error");

        setLoader(true);
        if (error?.response?.status === 404) {
          setErrorMessage(error?.response?.data?.message);
        }
        setLoader(false);
      });
  useEffect(() => {
    toast.dismiss();
    if (response) {
      toast.success(response.message);
      navigate("/");
    }

    if (error) {
      const toastId = toast.error(error.message);
      return () => {
        toast.dismiss(toastId);
      };
    }
  }, [response, error]);

  useEffect(() => {
    callApi();
  }, []);
  return (
    <div className={styles.resetPasswordContainer}>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.resetPasswordWrapper}>
          <div className={styles.logoWrapper}>
            <img src={mainLogo} alt="" className={styles.mainLogo} />
            <div className={styles.headerTitle}>
              <h2>Reset Password</h2>
              <p>Please fill the below form to reset your password.</p>
            </div>
          </div>
          {loader ? (
            <>
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
            </>
          ) : errorMessage ? (
            <p className="error-custom">{errorMessage}</p>
          ) : (
            <>
              <div className={styles.formControl}>
                <InputField
                  label="New Password"
                  formik={formik}
                  name="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  fullWidth
                />
              </div>
              <div className={styles.formControl}>
                <InputField
                  label="Confirm New Password"
                  formik={formik}
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  fullWidth
                />
              </div>

              <div className={styles.formControl}>
                <ThemeButton
                  sx={{ width: "100%", alignItem: "center", display: "flex" }}
                  type="submit"
                  disabled={loading}
                >
                  {loading && <LoadingBars />} Reset Password
                </ThemeButton>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
