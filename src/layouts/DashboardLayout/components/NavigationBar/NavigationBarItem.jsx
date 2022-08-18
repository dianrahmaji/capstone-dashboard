import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'

const NavigationBarItem = ({ name, path, icon: NavIcon }) => {
  const { pathname } = useLocation()

  return (
    <Link
      key={name}
      to={path}
      className={clsx(
        'group flex items-center rounded-md px-2 py-2 text-base font-medium text-white hover:text-secondary',
        {
          'bg-primary hover:bg-accent': pathname !== path,
          'bg-accent font-bold': pathname === path
        }
      )}
    >
      <NavIcon className="mr-4 h-6 w-6 flex-shrink-0 " aria-hidden="true" />
      {name}
    </Link>
  )
}

export default NavigationBarItem
