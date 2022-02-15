import { Transition, Dialog } from "@headlessui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import React, { Fragment, useState } from "react";
import * as Yup from "yup";
import { sendFriendRequest } from "../utils/friendsUtils";
import InputField from "./InputField";

interface SendFriendRequestProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SendFriendRequest = ({ isOpen, setIsOpen }: SendFriendRequestProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Formik
                initialValues={{ username: "" }}
                onSubmit={async ({ username }, actions) => {
                  try {
                    const response = await sendFriendRequest(username);
                    setIsOpen(false);
                    alert(response);
                  } catch (error) {
                    if (axios.isAxiosError(error)) {
                      alert(error.response?.data.message);
                      actions.resetForm();
                    }
                  }
                }}
                validationSchema={Yup.object({
                  username: Yup.string()
                    .min(3, "Username must be at least 3 characters!")
                    .required("No username!"),
                })}
              >
                {(formik) => (
                  <Form>
                    <Dialog.Title
                      as="h3"
                      className=" text-lg text-center font-medium leading-6 text-gray-900"
                    >
                      Send a friend request.
                    </Dialog.Title>
                    <div className="mt-4">
                      <InputField
                        name="username"
                        label="Send to:"
                        placeholder="username"
                        type="text"
                      />
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        className="w-full justify-center px-4 py-2 text-sm font-medium text-white bg-sky-700 border border-transparent rounded-md hover:bg-sky-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
                        disabled={formik.isSubmitting}
                      >
                        {formik.isSubmitting ? "Sending..." : "Send Friend Request"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SendFriendRequest;
