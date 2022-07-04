import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LockClosedIcon } from '@heroicons/react/outline'

import { email, password } from '~/utils/validation'
import { login } from '~/store/actions/userActions'

import BaseButton from '~/components/generic/button/BaseButton'
import BaseCheckbox from '~/components/generic/form/BaseCheckbox'
import BaseForm from '~/components/generic/form/BaseForm'
import BaseInput from '~/components/generic/form/BaseInput'

const Login = () => {
  const initialValues = { email: '', password: '', remember: false }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector(state => state.userLogin)

  useEffect(() => {
    if (user) navigate('/', { replace: true })
  }, [user, navigate])

  const handleSubmit = values => {
    const { email, password } = values
    dispatch(login(email, password))
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
            validation={{ email, password }}
            handleSubmit={handleSubmit}
          >
            <BaseInput label="Email" name="email" type="email" />
            <BaseInput label="Password" name="password" type="password" />
            <div className="flex items-center justify-between">
              <BaseCheckbox label="Remember me" name="remember" />
              <div className="text-sm mt-3">
                <Link
                  to="#"
                  className="font-medium text-primary hover:text-accent"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <BaseButton className="w-full mt-6" type="submit">
              Sign In
            </BaseButton>
          </BaseForm>
          <div className="mt-6">
            <p className="mt-2 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-primary hover:text-accent"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
