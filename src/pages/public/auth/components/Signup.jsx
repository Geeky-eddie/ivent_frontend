import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "../../../../components/TextError";
import axios from "axios";

const Signup = ({ setVisibleComponent }) => {
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    home_address: "",
    password: "",
    confirm_password: "",
  };

  const onSubmit = (values) => {
    console.log("Form data", values);
    axios
      .post("https://ivents-backend.onrender.com/api/auth/register", values)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", JSON.stringify(res.data.accessToken));
        window.location.replace("/");
      })
      .catch((error) => console.log(error.response.data));
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Your first name is required"),
    last_name: Yup.string().required("Your last name too"),
    email: Yup.string()
      .email("Invalid email format")
      .required("We need your email address"),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 characters minimum.")
      .required("Required"),
    confirm_password: Yup.string()
      .required("Input a value")
      .min(8, "Password is too short")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    home_address: Yup.string().required("Please provide your address"),
    phonenumber: Yup.number().required("Don't forget your phone number"),
  });

  // state to store if the password is showing or not
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="w-[90%] md:w-3/4 lg:w-1/2 mx-auto py-16">
        <h1 className="text-center font-bold text-4xl mb-16">Sign Up</h1>

        <div className="dynamic-grid gap-4 mb-4">
          <div>
            <label htmlFor="first_name">First name</label>
            <Field
              className="w-full px-4 py-2"
              type="text"
              name="first_name"
              id="first_name"
              placeholder="e.g. John"
              required
            />
            <ErrorMessage name="first_name" component={TextError} />
          </div>

          <div>
            <label htmlFor="last_name">Last name</label>
            <Field
              className="w-full px-4 py-2"
              type="text"
              name="last_name"
              id="last_name"
              placeholder="e.g. Doe"
              required
            />
            <ErrorMessage name="last_name" component={TextError} />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <Field
            className="w-full px-4 py-2"
            type="email"
            name="email"
            id="email"
            placeholder="e.g. email@gmail.com"
            required
          />
          <ErrorMessage name="email" component={TextError} />
        </div>

        <div className="mb-4">
          <label htmlFor="home_address">Home Address</label>
          <Field
            className="w-full px-4 py-2"
            type="text"
            name="home_address"
            id="home_address"
            placeholder="Type your home address here"
            required
          />
          <ErrorMessage name="home_address" component={TextError} />
        </div>

        <div className="mb-4">
          <div className="relative">
            <label htmlFor="password">Password</label>
            <Field
              className="w-full px-4 py-2"
              type={isShowingPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="********"
              required
            />
            <button
              type="button"
              onClick={() => setIsShowingPassword((prev) => !prev)}
              className="absolute right-4 bottom-3 text-xs font-bold text-gray-400"
            >
              {isShowingPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
          <ErrorMessage name="password" component={TextError} />
        </div>

        <div className="mb-4">
          <label htmlFor="confirm">Confirm password</label>
          <Field
            className="w-full px-4 py-2"
            type="password"
            name="confirm_password"
            id="confirm_password"
            placeholder="********"
            required
          />
          <ErrorMessage name="confirm_password" component={TextError} />
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="px-16 py-3 btn w-full bg-accent text-white rounded-md"
          >
            Sign Up
          </button>
        </div>

        <p className="text-center text-gray-600 mt-2">
          Do you have an account already?{" "}
          <button
            onClick={() => setVisibleComponent("login")}
            className="font-medium underline text-accent"
          >
            Log in
          </button>
        </p>
      </Form>
    </Formik>
  );
};

export default Signup;
