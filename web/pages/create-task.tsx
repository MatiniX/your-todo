import axios from "axios";
import { Form, Formik } from "formik";
import React, { ReactElement, useEffect, useState } from "react";
import ErrorDialog from "../components/ErrorDialog";
import InfoDialog from "../components/InfoDialog";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import Selectbox from "../components/Selectbox";
import TextareaInput from "../components/TextareaInput";
import createTask from "../utils/createTask";

const CreateTask = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [dialogCloseMessage, setdialogCloseMessage] = useState("");
  const [errorDialog, setErrorDialog] = useState(false);

  return (
    <>
      <h1 className="page-header">Create Task</h1>
      <Formik
        initialValues={{ title: "", description: "", to: -1 }}
        onSubmit={async (values, actions) => {
          setErrorDialog(false);
          try {
            const toUser = await createTask(values);
            setDialogTitle("Task sent!");
            setDialogText("You have sent a new task to " + toUser);
            actions.resetForm();
          } catch (error) {
            if (axios.isAxiosError(error)) {
              setErrorDialog(true);
              setDialogTitle("There was an error!");
              setDialogText(error.response?.data.message);
            }
          }

          setdialogCloseMessage("Close");
          setDialogOpen(true);
        }}
      >
        {(formik) => (
          <Form className="mt-8 mr-16 space-y-4">
            <Selectbox name="to" />
            <InputField
              largeLabel={true}
              name="title"
              label="Task Title"
              type="text"
              className="max-w-4xl"
            />
            <TextareaInput
              name="description"
              label="Description (optional)"
              largeLabel={true}
              className="max-w-4xl"
            />
            <button
              type="submit"
              className=" flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Create Task
            </button>
          </Form>
        )}
      </Formik>
      {errorDialog ? (
        <ErrorDialog
          title={dialogTitle}
          text={dialogText}
          closeMessage={dialogCloseMessage}
          open={dialogOpen}
          setIsOpen={setDialogOpen}
        />
      ) : (
        <InfoDialog
          title={dialogTitle}
          text={dialogText}
          closeMessage={dialogCloseMessage}
          open={dialogOpen}
          setIsOpen={setDialogOpen}
        />
      )}
    </>
  );
};

CreateTask.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CreateTask;