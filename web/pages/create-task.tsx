import axios from "axios";
import { Form, Formik } from "formik";
import React, { ReactElement, useState } from "react";
import * as Yup from "yup";
import ErrorDialog from "../components/ErrorDialog";
import InfoDialog from "../components/InfoDialog";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import FriendSelectbox from "../components/FriendSelectbox";
import TextareaInput from "../components/TextareaInput";
import createTask from "../utils/createTask";
import TaskDifficultySelectbox from "../components/TaskDifficultySelectbox";

const CreateTask = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [dialogCloseMessage, setDialogCloseMessage] = useState("");
  const [errorDialog, setErrorDialog] = useState(false);

  return (
    <>
      <h1 className="page-header">Create Task</h1>
      <Formik
        initialValues={{ title: "", description: "", to: -1, difficulty: "easy" }}
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

          setDialogCloseMessage("Close");
          setDialogOpen(true);
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Title is required!"),
          to: Yup.number().positive("Select a friend!"),
          difficulty: Yup.string().oneOf(["easy", "medium", "hard"]),
        })}
      >
        {(formik) => (
          <Form className="flex flex-col md:block pb-4 md:mt-8 md:mr-16 space-y-4">
            <div className="flex flex-col md:flex-row gap-4  md:gap-8">
              <FriendSelectbox name="to" />
              <TaskDifficultySelectbox name="difficulty" />
            </div>

            <InputField
              largeLabel={true}
              name="title"
              id="title"
              label="Task Title"
              type="text"
              className="max-w-4xl"
            />
            <TextareaInput
              name="description"
              id="description"
              label="Description (optional)"
              largeLabel={true}
              className="max-w-4xl"
            />
            <button
              disabled={formik.isSubmitting}
              type="submit"
              className="px-3 py-2 rounded font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
            >
              {formik.isSubmitting ? "Creating..." : "Create Task"}
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
