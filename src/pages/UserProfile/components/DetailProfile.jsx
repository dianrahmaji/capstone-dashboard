const profile = {
  name: 'Dian Rahmaji',
  faculty: 'Engineering',
  major: 'Information Engineering',
  speciality: ['Frontend Engineering', 'Web Development'],
  email: 'dianrahmaji@gmail.com',
  picture:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
}

const getProfileFromFullName = fullName => {
  const names = fullName.split(' ')

  if (names.length < 2) return fullName.slice(0, 2).toUpperCase()
  return `${names[0][0]}${names[1][0]}`
}

const DetailProfile = () => {
  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Profil Peneliti</h1>
      <div className="ml-8 flex gap-20 mt-5">
        {profile.picture ? (
          <img
            className="h-40 w-40 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        ) : (
          <div className="flex ml-8 my-auto items-center justify-center h-40 w-40 rounded-full bg-blue-100">
            <div className=" text-primary text-7xl">
              {getProfileFromFullName(profile.name)}
            </div>
          </div>
        )}
        <div className="grid grid-cols-[1fr_2fr]">
          <div className="font-medium">Name</div>
          <div>{profile.name}</div>
          <div className="font-medium">Email</div>
          <div>{profile.email}</div>
          <div className="font-medium">Faculty</div>
          <div>{profile.faculty}</div>
          <div className="font-medium">Major</div>
          <div>{profile.major}</div>
          <div className="font-medium">Speciality</div>
          <div>
            {profile.speciality.reduce((prev, curr) => prev + ', ' + curr)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProfile
