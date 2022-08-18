import clsx from 'clsx'

const BaseButton = ({ children, className, secondary, loading, ...props }) => {
  return (
    <button
      className={clsx(
        `${className} divide-xisabled:opacity-50 rounded-md px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-auto sm:text-sm`,
        {
          'bg-primary text-secondary hover:bg-accent focus:ring-primary': !secondary,
          'border-gray-300 bg-white text-primary hover:bg-gray-50 hover:text-accent focus:ring-primary':
            secondary
        }
      )}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <svg class="... ml-3 mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        children
      )}
    </button>
  )
}

export default BaseButton
