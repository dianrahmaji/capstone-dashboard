import { MenuIcon } from "@heroicons/react/outline";

function Header({ setSidebarOpen }) {
  return (
    <div className="sticky top-0 z-10 flex h-16 shrink-0 bg-white shadow">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}

export default Header;
