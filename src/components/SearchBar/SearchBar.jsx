import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  return (
    <header className={css.searchBar}>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          if (values.query.trim() !== "") {
            onSearch(values.query);
            actions.resetForm();
          } else {
            toast.error("The search field is empty. Please try again!");
          }
          return;
        }}
      >
        <Form className={css.searchForm}>
          <Field
            type="text"
            name="query"
            placeholder="Search images and photos"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      <Toaster position="top-right" reverseOrder={false} />
    </header>
  );
}