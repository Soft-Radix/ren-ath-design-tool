import React, { useContext, useEffect } from "react";
import styles from "./signup.module.scss";
import { useFormik } from "formik";
import { InputField } from "../../components/common/InputField/InputField";
import ThemeButton from "../../components/common/ThemeButton";
import { signUpSchema } from "../../validations/AuthSchema";
import { AuthContext } from "../../contexts/AuthContext";
import useFetch from "../../hook/CustomHook/usefetch";
import { toast } from "react-toastify";
import LoadingBars from "../../components/common/loader/LoadingBars";
import { setUserLocalData } from "../../utils/common";
const SignUp = ({ setIsOpen }) => {
  const { setUser } = useContext(AuthContext);
  const [loadQuery, { response, loading, error }] = useFetch("/auth/signup", {
    method: "post",
  });
  const handleSignUp = (values) => {
    loadQuery(values);
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      teamName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      const params = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        team_name: values.teamName,
        password: values.password,
      };
      handleSignUp(params);
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
      <div className={styles.signUpWrapper}>
        <div className={styles.formControl}>
          <InputField
            label="First Name"
            formik={formik}
            name="firstName"
            placeholder="Enter first name"
            fullWidth
            required
          />
        </div>
        <div className={styles.formControl}>
          <InputField
            label="Last Name"
            formik={formik}
            name="lastName"
            placeholder="Enter last name"
            fullWidth
            required
          />
        </div>
        <div className={styles.formControl}>
          <InputField
            label="Email Address"
            formik={formik}
            name="email"
            type="email"
            placeholder="Enter email address"
            fullWidth
            required
          />
        </div>
        <div className={styles.formControl}>
          <InputField
            label="Team Name"
            formik={formik}
            name="teamName"
            placeholder="Enter team name"
            fullWidth
            required
          />
        </div>
        <div className={styles.formControl}>
          <InputField
            label="Password"
            formik={formik}
            name="password"
            type="password"
            placeholder="Enter password"
            fullWidth
            required
          />
        </div>
        <div className={styles.formControl}>
          <InputField
            label="Confirm Password"
            formik={formik}
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            fullWidth
            required
          />
        </div>
        <div className={styles.formControl}>
          <ThemeButton
            sx={{ width: "100%", alignItem: "center", display: "flex" }}
            type="submit"
            disabled={loading}
          >
            {loading && <LoadingBars />} Sign Up
          </ThemeButton>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
