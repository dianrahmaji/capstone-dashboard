import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LockClosedIcon } from "@heroicons/react/outline";

import {
  fullName,
  email,
  userId,
  faculty,
  major,
  specialities,
  accountType,
  password,
} from "~/utils/validation";
import { register } from "~/store/actions/userActions";

import BaseButton from "~/components/generic/button/BaseButton";
import BaseForm from "~/components/generic/form/BaseForm";
import BaseInput from "~/components/generic/form/BaseInput";
import BaseMultipleInput from "~/components/generic/form/BaseMultipleInput";
import BaseSelect from "~/components/generic/form/BaseSelect";

function Register() {
  const initialValues = {
    fullName: "",
    email: "",
    userId: "",
    faculty: "",
    major: "",
    specialities: [],
    accountType: "",
    password: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: { token },
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) navigate("/", { replace: true });
  }, [token, navigate]);

  const handleSubmit = (values) => {
    const {
      fullName,
      email,
      userId,
      faculty,
      major,
      accountType,
      specialities,
      password,
    } = values;

    dispatch(
      register(
        fullName,
        email,
        userId,
        faculty,
        major,
        accountType,
        specialities,
        password,
      ),
    );
  };

  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <LockClosedIcon className="h-10 w-10 text-primary" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign Up
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
              specialities,
              accountType,
              password,
            }}
            handleSubmit={handleSubmit}
          >
            <BaseInput label="Nama" name="fullName" type="text" />
            <BaseInput label="Email" name="email" type="email" />
            <BaseInput label="NIM / NIP" name="userId" type="text" />
            <BaseInput label="Fakultas" name="faculty" type="text" />
            <BaseInput label="Program Studi" name="major" type="text" />
            <BaseMultipleInput label="Keahlian" name="specialities" />
            <BaseSelect label="Tipe Akun" name="accountType">
              <option value="" disabled defaultValue>
                Pilih tipe akun
              </option>
              <option value="lecturer">Dosen</option>
              <option value="student">Mahasiswa</option>
            </BaseSelect>
            <BaseInput label="Password" name="password" type="password" />
            <BaseButton className="mt-6 w-full" type="submit">
              Daftar
            </BaseButton>
          </BaseForm>
          <div className="mt-6">
            <p className="mt-2 text-center text-sm text-gray-600">
              Sudah memiliki akun?{" "}
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
  );
}

export default Register;
