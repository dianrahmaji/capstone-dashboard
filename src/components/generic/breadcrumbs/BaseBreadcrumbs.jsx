import { Link } from 'react-router-dom'
import clsx from 'clsx'

const BaseBreadcrumbs = ({ pages, separator: SeparatorIcon }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center">
        {pages.map((p, i) => (
          <li key={p.name}>
            <div className="flex items-center">
              {i !== 0 && (
                <SeparatorIcon
                  className="flex-shrink-0 h-5 w-5 text-gray-400 mx-4"
                  aria-hidden="true"
                />
              )}
              <Link
                to={p.redirect}
                className={clsx(`text-md font-medium `, {
                  'text-gray-500 hover:text-gray-700': !p.current,
                  'text-gray-900': p.current
                })}
                aria-current={p.current ? 'page' : undefined}
              >
                {p.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default BaseBreadcrumbs
