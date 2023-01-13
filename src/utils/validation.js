import * as Yup from "yup";

export const _id = Yup.string().required("_id is required");
export const accountType = Yup.string().required("Account type is required");
export const author = Yup.mixed().required("Author is required");
export const authors = Yup.array().min(1, "Authors are required");
export const contribution = Yup.number()
  .required("contribution is required")
  .min(1, "Must be more than 0");
export const contributions = Yup.array().min(1, "Contributions are required");
export const date = Yup.date().required("Date is required");
export const description = Yup.string().required("Description is required");
export const documentName = Yup.string().required("Document name is required");
export const document = Yup.string()
  .nullable()
  .required("Document is required!");
export const email = Yup.string().required("Email is required");
export const faculty = Yup.string().required("Faculty is required");
export const files = Yup.array().min(1, "File is required");
export const fullName = Yup.string().required("Full name is required");
export const major = Yup.string().required("Major is required");
export const name = Yup.string().required("Name is required");
export const note = Yup.string().required("Note is required");
export const password = Yup.string().required("Password is required");
export const reference = Yup.mixed();
export const references = Yup.array();
export const researcher = Yup.string().required("Researcher is required");
export const role = Yup.string().required("Role is required");
export const specialities = Yup.array().min(1, "Specialities are required");
export const status = Yup.string().required("Status is required");
export const topics = Yup.array().min(1, "Topics are required");
export const title = Yup.string().required("Title is required");
export const userId = Yup.string().required("User ID is required");
