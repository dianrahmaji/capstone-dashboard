import { useSelector } from "react-redux";

const getProfileFromFullName = (fullName) => {
  const names = fullName.split(" ");

  if (names.length < 2) return fullName.slice(0, 2).toUpperCase();
  return `${names[0][0]}${names[1][0]}`;
};

function DetailProfile() {
  const { data: user } = useSelector((state) => state.user);

  return (
    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Profil Peneliti</h1>
      <div className="ml-8 mt-5 flex sm:gap-5 lg:gap-20">
        {user.pictureUrl ? (
          <img
            className="h-40 w-40 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        ) : (
          // TODO: Fix Responsive
          <div className="my-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 lg:ml-8 lg:h-40 lg:w-40">
            <div className=" text-xl text-primary md:text-3xl lg:text-7xl">
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
  );
}

export default DetailProfile;
