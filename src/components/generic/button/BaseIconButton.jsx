import clsx from 'clsx'

const BaseIconButton = ({
  children,
  className,
  secondary = false,
  ...props
}) => {
  return (
    <button
      className={clsx(
        `${className} rounded-full p-3 sm:text-sm text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2`,
        {
          'text-secondary bg-primary hover:bg-accent focus:ring-primary':
            !secondary,
          'text-primary hover:text-accent border-gray-300 bg-white hover:bg-gray-50 focus:ring-primary':
            secondary
        }
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default BaseIconButton
