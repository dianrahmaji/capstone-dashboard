import { ChevronRightIcon } from '@heroicons/react/solid'

import ActionContainer from './components/ActionContainer'
import BaseBreadcrumbs from '~/components/generic/breadcrumbs/BaseBreadcrumbs'
import DashboardLayout from '~/layouts/DashboardLayout'
import DocumentContainer from './components/DocumentContainer'

const pages = [
  { name: 'Capstone Projects', redirect: '#', current: false },
  { name: 'C-251', redirect: '#', current: true }
]

const ResearchDocumentation = () => {
  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <BaseBreadcrumbs pages={pages} separator={ChevronRightIcon} />
        </div>
        <div className="mt-4 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <ActionContainer />
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 md:px-8">
          <DocumentContainer />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ResearchDocumentation
