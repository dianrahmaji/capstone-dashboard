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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <BaseBreadcrumbs pages={pages} separator={ChevronRightIcon} />
        </div>
        <div className="flex items-center mt-4" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <ActionContainer />
        <div className="max-w-7xl mx-auto pt-4 px-4 sm:px-6 md:px-8">
          <DocumentContainer />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ResearchDocumentation
