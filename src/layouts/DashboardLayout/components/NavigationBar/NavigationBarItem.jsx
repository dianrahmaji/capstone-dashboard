import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

function NavigationBarItem({ name, path, icon: NavIcon, notification = 0 }) {
  const { pathname } = useLocation();

  return (
    <Link
      key={name}
      to={path}
      className={clsx(
        "flex items-center justify-between rounded-md p-2 text-base font-medium text-white hover:text-secondary",
        {
          "bg-primary hover:bg-accent": pathname !== path,
          "bg-accent font-bold": pathname === path,
        },
      )}
    >
      <div className="flex items-center">
        <NavIcon className="mr-4 h-6 w-6 shrink-0 " aria-hidden="true" />
        {name}
      </div>
      {notification !== 0 && (
        <span className="rounded-full bg-red-400 px-2 !text-white">
          {notification}
        </span>
      )}
    </Link>
  );
}

export default NavigationBarItem;
