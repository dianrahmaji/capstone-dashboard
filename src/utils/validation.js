import * as Yup from 'yup'

export const fullName = Yup.string().required('Full name is required')
export const password = Yup.string().required('Password is required')
export const email = Yup.string()
  .email('Invalid email address')
  .required('Email is required')
export const accountType = Yup.string().required('Account type is required')
export const major = Yup.string().required('Major is required')
