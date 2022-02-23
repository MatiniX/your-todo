import { Formik, Form } from "formik";
import React, { useState } from "react";
import NextLink from "next/link";
import InputField from "../components/InputField";
import * as Yup from "yup";
import { forgotPassword } from "../utils/auth";
import Head from "next/head";

const ForgotPassword = () => {
  const [complete, setComplete] = useState(false);

  return (
    <main className="py-12 px-6 lg:px-8 min-h-screen bg-gray-50 flex flex-col justify-center">
      <Head>
        <title>Forgot Password</title>
      </Head>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email("Must be a valid email address").required("Required"),
        })}
        onSubmit={async (values) => {
          await forgotPassword(values.email);
          setComplete(true);
        }}
      >
        {(formik) =>
          complete ? (
            <div className="text-center">
              <h2 className="mb-1 text-2xl font-bold">Check your email for your link.</h2>
              <p>
                Return to{" "}
                <NextLink href="/login">
                  <a className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                    Log in.
                  </a>
                </NextLink>
              </p>
            </div>
          ) : (
            <>
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Forgot your password?
                </h2>
              </div>
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                  <Form className="mb-0 space-y-6">
                    <p className="text-lg text-center text-gray-900">
                      Provide an email and we will send you a link to change your password
                    </p>
                    <InputField name="email" label="Email address" type="text" />

                    <button
                      type="submit"
                      disabled={formik.isSubmitting}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {formik.isSubmitting ? "Sending..." : "Send"}
                    </button>
                  </Form>
                </div>
              </div>
            </>
          )
        }
      </Formik>
    </main>
  );
};

export default ForgotPassword;
