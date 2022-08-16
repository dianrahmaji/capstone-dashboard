import { useSelector } from 'react-redux'

const getProfileFromFullName = fullName => {
  const names = fullName.split(' ')

  if (names.length < 2) return fullName.slice(0, 2).toUpperCase()
  return `${names[0][0]}${names[1][0]}`
}

const DetailProfile = () => {
  const { data: user } = useSelector(state => state.user)

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Profil Peneliti</h1>
      <div className="ml-8 flex sm:gap-5 lg:gap-20 mt-5">
        {user.pictureUrl ? (
          <img
            className="h-40 w-40 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        ) : (
          // TODO: Fix Responsive
          <div className="flex lg:ml-8 my-auto items-center justify-center h-20 w-20 lg:h-40 lg:w-40 rounded-full bg-blue-100">
            <div className=" text-primary text-xl md:text-3xl lg:text-7xl">
              {getProfileFromFullName(user.fullName)}
            </div>
          </div>
        )}
        <div className="grid grid-cols-[1fr_2fr]">
          <div className="font-medium">Name</div>
          <div>{user.fullName}</div>
          <div className="font-medium">Email</div>
          <div>{user.email}</div>
          <div className="font-medium">Faculty</div>
          <div>{user.faculty}</div>
          <div className="font-medium">Major</div>
          <div>{user.major}</div>
          <div className="font-medium">Speciality</div>
          <div>
            {/* TODO: Add speciality */}
            Frontend Engineering, Web Development
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProfile
