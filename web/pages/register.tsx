import React from "react";
import NextLink from "next/link";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import * as Yup from "yup";

const Register = () => {
  return (
    <main className="py-8 px-6 lg:px-8 min-h-screen bg-gray-50 flex flex-col justify-center">
      <Formik
        initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(3, "Username must be at least 3 characters long.")
            .required("Required"),
          email: Yup.string().email("Invalid email.").required("Required"),
          password: Yup.string()
            .min(8, "Password must be at least 8 characters long.")
            .matches(/[0-9]/, "Password must contain numbers."),
          confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {(formik) => (
          <>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Login to your Account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <NextLink href="/login">
                  <a className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                    Log in
                  </a>
                </NextLink>
              </p>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                <Form className="mb-0 space-y-6">
                  <InputField name="username" label="Username" type="text" />
                  <InputField name="email" label="Email" type="email" />
                  <InputField name="password" label="Password" type="password" />
                  <InputField name="confirmPassword" label="Confirm Password" type="password" />
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Register
                  </button>
                </Form>
              </div>
            </div>
          </>
        )}
      </Formik>
    </main>
  );
};

export default Register;
