import React, { useContext, useEffect } from "react";
import styles from "./forgotpassword.module.scss";
import { InputField } from "../../components/common/InputField/InputField";
import ThemeButton from "../../components/common/ThemeButton";
import { AuthContext } from "../../contexts/AuthContext";
import useFetch from "../../hook/CustomHook/usefetch";
import LoadingBars from "../../components/common/loader/LoadingBars";
import { useFormik } from "formik";
import { forgotPassValSchema } from "../../validations/AuthSchema";
import { toast } from "react-toastify";
const ForgotPassword = ({ setIsOpen }) => {
  const { setUser } = useContext(AuthContext);
  const [loadQuery, { response, loading, error }] = useFetch(
    "/auth/forgot-password",
    {
      method: "post",
    }
  );
  const handleForgotSubmit = (values) => {
    loadQuery(values);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPassValSchema,
    onSubmit: (values) => {
      handleForgotSubmit(values);
    },
  });

  useEffect(() => {
    toast.dismiss();
    if (response) {
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
      <div className={styles.forgotPasswordWrapper}>
        <div className={styles.formControl}>
          <InputField
            label="Email"
            formik={formik}
            name="email"
            type="email"
            placeholder="Enter email"
            fullWidth
          />
        </div>

        <div className={styles.formControl}>
          <ThemeButton
            sx={{ width: "100%", alignItem: "center", display: "flex" }}
            type="submit"
            disabled={loading}
          >
            {loading && <LoadingBars />} Get Link
          </ThemeButton>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
