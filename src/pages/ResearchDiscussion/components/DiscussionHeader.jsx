import { InformationCircleIcon } from "@heroicons/react/outline";

import BaseIconButton from "~/components/generic/button/BaseIconButton";
import useSelectedTeam from "~/hooks/useSelectedTeam";

function DiscussionHeader({ setOpen }) {
  const team = useSelectedTeam();

  return (
    <div className="mx-auto w-full px-4 sm:px-6 md:px-8">
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <div className="flex items-center">
              {team && (
                <div className="ml-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {team.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {team.members.reduce(
                      (prev, curr) =>
                        prev === undefined
                          ? curr.fullName
                          : `${prev} , ${curr.fullName}`,
                      undefined,
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="ml-4 mt-4 flex shrink-0">
            <BaseIconButton secondary onClick={() => setOpen(true)}>
              <InformationCircleIcon className="h-6 w-6" />
            </BaseIconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscussionHeader;
