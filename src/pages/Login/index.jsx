import React, { useContext, useEffect } from "react";
import styles from "./login.module.scss";
import { InputField } from "../../components/common/InputField/InputField";
import ThemeButton from "../../components/common/ThemeButton";
import { useFormik } from "formik";
import { loginValSchema } from "../../validations/AuthSchema";
import useFetch from "../../hook/CustomHook/usefetch";
import { setUserLocalData } from "../../utils/common";
import { toast } from "react-toastify";
import LoadingBars from "../../components/common/loader/LoadingBars";
import { AuthContext } from "../../contexts/AuthContext";
const Login = ({ setIsOpen }) => {
  const { setUser } = useContext(AuthContext);
  const [loadQuery, { response, loading, error }] = useFetch("/auth/login", {
    method: "post",
  });
  const handleLogin = (values) => {
    loadQuery(values);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  useEffect(() => {
    toast.dismiss();
    if (response) {
      setUserLocalData(response.data);
      setUser(response.data.user);
      toast.success(response.message);
      setIsOpen(false);
    }

    if (error) {
      const toastId = toast.error(error.message);
      return () => {
        toast.dismiss(toastId);
      };
    }
  }, [response, error]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.loginWrapper}>
        <div className={styles.formControl}>
          <InputField
            label="Email"
            name="email"
            type="email"
            formik={formik}
            placeholder="Enter email"
            fullWidth
          />
        </div>
        <div className={styles.formControl}>
          <InputField
            label="Password"
            name="password"
            type="password"
            formik={formik}
            placeholder="Enter password"
            fullWidth
          />
        </div>
        <div className={styles.formControl}>
          <ThemeButton
            sx={{ width: "100%", alignItem: "center", display: "flex" }}
            type="submit"
            disabled={loading}
          >
            {loading && <LoadingBars />} Login Your Account
          </ThemeButton>
        </div>
      </div>
    </form>
  );
};

export default Login;
