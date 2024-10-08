import * as yup from "yup";

export const loginValSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Please enter valid email")
    .required("Please enter your email address"),
  password: yup.string().required("Please enter your password"),
});

export const forgotPassValSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Please enter valid email address")
    .required("Please enter registered email address"),
});

export const resetValSchema = (isSetPassword) =>
  yup.object().shape({
    newPassword: yup
      .string()
      .trim()
      .required(`Please enter ${isSetPassword ? "" : "new"} password`)
      .max(20, "Maximum 20 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
        "Minimum 8 Characters (1 uppercase, lowercase, number and special character)"
      ),
    confirmPassword: yup
      .string()
      .trim()
      .oneOf(
        [yup.ref("newPassword"), ""],
        `${isSetPassword ? "Password" : "New password"} and confirm ${
          isSetPassword ? "" : "new"
        } password does not match`
      )
      .required("Please enter confirm password"),
  });

export const setProfileValSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .max(20, "Maximum 20 characters")
    .required("Please enter your first name"),
  lastName: yup
    .string()
    .trim()
    .max(20, "Maximum 20 characters")
    .required("Please enter your last name"),
  city: yup.string().trim().max(20, "Maximum 20 characters"),
  phone: yup.string().trim().max(20, "Maximum 20 characters"),
  organization: yup.string().trim().max(20, "Maximum 20 characters"),
  club: yup.string().trim().max(20, "Maximum 20 characters"),
  teamName: yup.string().trim().max(20, "Maximum 20 characters"),
});
export const signUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .max(20, "Maximum 20 characters")
    .required("Please enter your first name"),
  lastName: yup
    .string()
    .trim()
    .max(20, "Maximum 20 characters")
    .required("Please enter your last name"),
  email: yup
    .string()
    .trim()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  teamName: yup
    .string()
    .trim()
    .max(20, "Maximum 20 characters")
    .required("Please enter your team name"),
  password: yup
    .string()
    .trim()
    .required("Please enter your password")
    .max(20, "Maximum 20 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
      "Minimum 8 Characters (1 uppercase, lowercase, number and special character)"
    ),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf(
      [yup.ref("password"), ""],
      "Password and confirm password does not match"
    )
    .required("Please enter your confirm password"),
});
