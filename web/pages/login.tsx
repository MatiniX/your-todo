import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import NextLink from "next/link";
import * as Yup from "yup";
import InputField from "../components/InputField";
import useUser from "../data/useUser";
import Router from "next/router";
import { login } from "../utils/auth";
import axios from "axios";
import Head from "next/head";

const Login = () => {
  const { user, loggedOut, mutate } = useUser();

  useEffect(() => {
    if (user && !loggedOut) {
      Router.replace("/");
    }
  }, [user, loggedOut]);

  return (
    <main className="py-12 px-6 lg:px-8 min-h-screen bg-gray-50 flex flex-col justify-center">
      <Head>
        <title>Log In</title>
      </Head>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        validationSchema={Yup.object({
          usernameOrEmail: Yup.string().required("Provide email or username"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={async (values, { setErrors }) => {
          try {
            await login(values.usernameOrEmail, values.password);
            await mutate();
          } catch (error) {
            if (axios.isAxiosError(error)) {
              const { field, message } = error.response?.data;
              console.log({ field, message });
              setErrors({ [field]: message });
            }
          }
        }}
      >
        {(formik) => (
          <>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Login to your Account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <NextLink href="/register">
                  <a className="font-medium text-sky-600 hover:text-sky-500 hover:underline">
                    Register
                  </a>
                </NextLink>
              </p>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                <Form className="mb-0 space-y-6">
                  <InputField name="usernameOrEmail" label="Username or Email" type="text" />
                  <InputField name="password" label="Password" type="password" />
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  >
                    {formik.isSubmitting ? "Logging in..." : "Log In"}
                  </button>
                  <div className="w-full border-b-2"></div>
                  <NextLink href="forgot-password">
                    <a className="block text-center font-medium text-sky-600 hover:text-sky-500 hover:underline">
                      Forgot your password?
                    </a>
                  </NextLink>
                </Form>
              </div>
            </div>
          </>
        )}
      </Formik>
    </main>
  );
};

export default Login;
