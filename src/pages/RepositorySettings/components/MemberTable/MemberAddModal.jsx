import { useEffect, useState } from 'react'
import axios from 'axios'
import { Form, Formik, useField } from 'formik'
import * as Yup from 'yup'
import debounce from 'lodash.debounce'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'

import { researcher } from '~/utils/validation'

import BaseButton from '~/components/generic/button/BaseButton'
import BaseModal from '~/components/generic/modal/BaseModal'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ResearcherCombobox = ({
  label,
  filteredItem,
  setQuery,
  members,
  ...props
}) => {
  const [field, meta, helpers] = useField(props)

  const { onBlur, value } = field
  const { touched, error } = meta
  const { setValue } = helpers

  const handleBlur = () => {
    onBlur({ target: { name: props.name } })
  }

  return (
    <div>
      <Combobox
        as="div"
        value={value}
        onBlur={handleBlur}
        onChange={val => setValue(val._id)}
      >
        <Combobox.Label
          htmlFor={props.id || props.name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </Combobox.Label>
        <div className="relative mt-1">
          <Combobox.Input
            className="w-full text-primary font-bold rounded-md border border-accent bg-white py-2 pl-3 pr-10 shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:text-sm"
            onChange={event => setQuery(event.target.value)}
            displayValue={value =>
              filteredItem.find(({ _id }) => value === _id)?.fullName
            }
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <SelectorIcon className="h-5 w-5 text-primary" aria-hidden="true" />
          </Combobox.Button>

          {filteredItem.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredItem.map(item => (
                <Combobox.Option
                  key={item._id}
                  value={item}
                  className={({ active }) =>
                    classNames(
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                      active ? 'bg-primary text-secondary' : 'text-primary'
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <div className="flex">
                        <span
                          className={classNames(
                            'truncate',
                            selected && 'font-semibold'
                          )}
                        >
                          {item.fullName}
                        </span>
                        <span
                          className={classNames(
                            'ml-2 truncate text-gray-500',
                            active ? 'text-indigo-200' : 'text-gray-500'
                          )}
                        >
                          {item.email}
                        </span>
                      </div>

                      {selected && (
                        <span
                          className={classNames(
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                            active ? 'text-white' : 'text-primary'
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
      {touched && error ? (
        <div className="mt-1 text-xs text-red-500">{error}</div>
      ) : null}
    </div>
  )
}

const MemberAddModal = ({ open, setOpen, members, teamId, setTeamDetail }) => {
  const [researchers, setResearchers] = useState([])
  const [selectedReseracher, setSelectedResearcher] = useState(null)

  useEffect(() => {
    fetchResearchers('')
  }, [])

  const fetchResearchers = async query => {
    const { data } = await axios.get(`/api/user/search?param=${query}`)
    setResearchers(data)
  }

  const handleQuery = debounce(query => {
    fetchResearchers(query)
  }, 500)

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    if (members.includes(values.researcher)) {
      setFieldError('researcher', 'Researcher already exists')
      return
    }

    await axios.put(`/api/team/${teamId}/member`, { userId: values.researcher })

    setTeamDetail(detail => ({
      ...detail,
      members: [
        ...detail.members,
        researchers.find(({ _id }) => _id === values.researcher)
      ]
    }))

    setSubmitting(false)
    setOpen(false)
  }

  return (
    <BaseModal title="Add Member" open={open} setOpen={setOpen}>
      <Formik
        initialValues={{ researcher: '' }}
        validationSchema={Yup.object({ researcher: '' })}
        validation={{ researcher }}
        onSubmit={handleSubmit}
      >
        <Form>
          <ResearcherCombobox
            label="Search by Fullname or Email"
            id="researcher"
            name="researcher"
            value={selectedReseracher}
            onChange={setSelectedResearcher}
            filteredItem={researchers}
            setQuery={handleQuery}
            members={members}
          />
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <BaseButton
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 focus:outline-none sm:col-start-2 sm:text-sm"
            >
              Simpan
            </BaseButton>
            <BaseButton
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 sm:mt-0 sm:col-start-1 sm:text-sm"
              secondary
              onClick={() => setOpen(false)}
            >
              Batal
            </BaseButton>
          </div>
        </Form>
      </Formik>
    </BaseModal>
  )
}

export default MemberAddModal
