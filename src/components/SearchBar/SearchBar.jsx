import { Formik, Field, Form } from "formik";
import toast, { Toaster } from "react-hot-toast";

export default function SearchBar({ search }) {
  return (
    <div>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values) => {
          if (values.query.trim() !== "") {
            search(values.query);
          } else {
            toast.error("The search field is empty. Please, enter the name of the movie!");
          }
          return;
        }}
      >
        <Form>
          <Field name="query" placeholder="Write the movie name"></Field>
          <button type="submit">Search</button>
        </Form>
      </Formik>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}