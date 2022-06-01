import clsx from 'clsx'

import BaseTable from '~/components/generic/table/BaseTable'
import BaseTableItem from '~/components/generic/table/BaseTableItem'

const header = ['Title', 'Time', 'Status', 'Year']
const repository = [
  {
    _id: 1,
    title: 'Capstone Project',
    time: 250,
    isDone: true,
    year: 2021
  },
  {
    _id: 2,
    title: 'Sistem Informasi Kesehatan',
    time: 500,
    isDone: false,
    year: 2020
  }
]

const RepositoryHistory = () => {
  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">
        Repository Penelitian
      </h1>
      <BaseTable header={header}>
        {repository &&
          repository.map(r => (
            <tr key={r._id}>
              <BaseTableItem>{r.title}</BaseTableItem>
              <BaseTableItem>{r.time} Jam</BaseTableItem>
              <BaseTableItem>
                <span
                  className={clsx(
                    'inline-flex rounded-full  px-2 text-xs font-semibold leading-5 ',
                    {
                      'bg-blue-100 text-blue-800': !r.isDone,
                      'bg-green-100 text-green-800': r.isDone
                    }
                  )}
                >
                  {r.isDone ? 'done' : 'active'}
                </span>
              </BaseTableItem>
              <BaseTableItem>{r.year}</BaseTableItem>
            </tr>
          ))}
      </BaseTable>
    </div>
  )
}

export default RepositoryHistory
