import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'

const NavigationBarItem = ({ name, path, icon: NavIcon }) => {
  const { pathname } = useLocation()

  return (
    <Link
      key={name}
      to={path}
      className={clsx(
        'group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:text-secondary',
        {
          'bg-primary hover:bg-accent': pathname !== path,
          'bg-accent font-bold': pathname === path
        }
      )}
    >
      <NavIcon className="mr-4 flex-shrink-0 h-6 w-6 " aria-hidden="true" />
      {name}
    </Link>
  )
}

export default NavigationBarItem
