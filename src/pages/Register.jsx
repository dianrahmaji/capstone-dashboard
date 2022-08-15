import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LockClosedIcon } from '@heroicons/react/outline'

import {
  fullName,
  email,
  userId,
  faculty,
  major,
  accountType,
  password
} from '~/utils/validation'
import { register } from '~/store/actions/userActions'

import BaseButton from '~/components/generic/button/BaseButton'
import BaseForm from '~/components/generic/form/BaseForm'
import BaseInput from '~/components/generic/form/BaseInput'
import BaseSelect from '~/components/generic/form/BaseSelect'

const Register = () => {
  const initialValues = {
    fullName: '',
    email: '',
    userId: '',
    faculty: '',
    major: '',
    accountType: '',
    password: ''
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    data: { token }
  } = useSelector(state => state.user)

  useEffect(() => {
    if (token) navigate('/', { replace: true })
  }, [token, navigate])

  const handleSubmit = values => {
    const { fullName, email, userId, faculty, major, accountType, password } =
      values
    dispatch(
      register(fullName, email, userId, faculty, major, accountType, password)
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100">
          <LockClosedIcon className="h-108 w-10 text-primary" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
          <BaseForm
            initialValues={initialValues}
            validation={{
              fullName,
              email,
              userId,
              faculty,
              major,
              accountType,
              password
            }}
            handleSubmit={handleSubmit}
          >
            <BaseInput label="Full Name" name="fullName" type="text" />
            <BaseInput label="Email" name="email" type="email" />
            <BaseInput label="NIM / NIP" name="userId" type="text" />
            <BaseInput label="Faculty" name="faculty" type="text" />
            <BaseInput label="Major" name="major" type="text" />
            <BaseSelect label="Account Type" name="accountType">
              <option value="" disabled defaultValue>
                Select account type
              </option>
              <option value="lecturer">Lecturer</option>
              <option value="student">Student</option>
            </BaseSelect>
            <BaseInput label="Password" name="password" type="password" />
            <BaseButton className="w-full mt-6" type="submit">
              Register
            </BaseButton>
          </BaseForm>
          <div className="mt-6">
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary hover:text-accent"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
