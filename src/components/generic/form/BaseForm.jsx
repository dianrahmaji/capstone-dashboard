import { Form, Formik } from 'formik'
import * as Yup from 'yup'

const BaseForm = ({ initialValues, validation, handleSubmit, children }) => {
  const onSubmit = (values, { setSubmitting }) => {
    handleSubmit(values)
    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object(validation)}
      onSubmit={onSubmit}
    >
      <Form>{children}</Form>
    </Formik>
  )
}

export default BaseForm
