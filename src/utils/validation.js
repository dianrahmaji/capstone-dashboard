import * as Yup from 'yup'

export const accountType = Yup.string().required('Account type is required')
export const description = Yup.string().required('Description is required')
export const email = Yup.string()
export const faculty = Yup.string().required('Faculty is required')
export const fullName = Yup.string().required('Full name is required')
export const major = Yup.string().required('Major is required')
export const password = Yup.string().required('Password is required')
export const title = Yup.string().required('Title is required')
export const userId = Yup.string()
  .required('User ID is required')
  .email('Invalid email address')
  .required('Email is required')
