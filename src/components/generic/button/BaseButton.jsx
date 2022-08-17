import clsx from 'clsx'

const BaseButton = ({ children, className, secondary, loading, ...props }) => {
  return (
    <button
      className={clsx(
        `${className} px-4 py-2 sm:text-sm text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 divide-xisabled:opacity-50 disabled:cursor-auto`,
        {
          'text-secondary bg-primary hover:bg-accent focus:ring-primary':
            !secondary,
          'text-primary hover:text-accent border-gray-300 bg-white hover:bg-gray-50 focus:ring-primary':
            secondary
        }
      )}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <svg class="animate-spin ml-3 h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
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
