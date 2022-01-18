import React from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../components/InputField";
import { changePassword } from "../../utils/auth";

const ChangePassword = () => {
  const router = useRouter();
  const { token } = router.query;
  return (
    <main className="py-12 px-6 lg:px-8 min-h-screen bg-gray-50 flex flex-col justify-center">
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(8, "Password must be at least 8 characters long.")
            .matches(/[0-9]/, "Password must contain numbers.")
            .required("Required"),
          confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
        })}
        onSubmit={async (values) => {
          try {
            await changePassword(token as string, values.password);
            router.replace("/login");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {(formik) => (
          <>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Change your password
              </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                <Form className="mb-0 space-y-6">
                  <InputField name="password" label="New Password" type="password" />
                  <InputField name="confirmPassword" label="Confirm Password" type="password" />
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {formik.isSubmitting ? "Changing..." : "Change"}
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

export default ChangePassword;
