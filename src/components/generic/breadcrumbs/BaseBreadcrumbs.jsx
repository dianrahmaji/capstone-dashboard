import { Link } from "react-router-dom";
import clsx from "clsx";

function BaseBreadcrumbs({ pages, separator: SeparatorIcon }) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center">
        {/* FIXME: update null checking */}
        {pages.map(
          (p, i) =>
            p.name && (
              <li key={p.name}>
                <div className="flex items-center">
                  {i !== 0 && (
                    <SeparatorIcon
                      className="mx-4 h-5 w-5 shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                  )}
                  <Link
                    to={p.redirect}
                    className={clsx("text-base font-medium ", {
                      "text-gray-500 hover:text-gray-700": !p.current,
                      "text-gray-900": p.current,
                    })}
                    aria-current={p.current ? "page" : undefined}
                  >
                    {p.name}
                  </Link>
                </div>
              </li>
            ),
        )}
      </ol>
    </nav>
  );
}

export default BaseBreadcrumbs;
