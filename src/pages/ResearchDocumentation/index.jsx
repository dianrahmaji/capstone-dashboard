import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/solid";

import {
  fetchFolderById,
  setActiveFolderId,
} from "~/store/actions/folderActions";

import ActionContainer from "./components/ActionContainer";
import BaseBreadcrumbs from "~/components/generic/breadcrumbs/BaseBreadcrumbs";
import DashboardLayout from "~/layouts/DashboardLayout";
import FolderNote from "./components/folder/FolderNote";
import DocumentCardList from "./components/document/DocumentCardList";
import FolderCardList from "./components/folder/FolderCardList";

function ResearchDocumentation() {
  const dispatch = useDispatch();

  const { folderId } = useParams();
  const { name, parents } = useSelector((state) => state.folder.data);

  useEffect(() => {
    dispatch(fetchFolderById(folderId));
    dispatch(setActiveFolderId(folderId));
  }, [dispatch, folderId]);

  return (
    <DashboardLayout>
      <div className="pt-6 pb-40">
        <div className="mx-auto px-4 sm:px-6 md:px-8">
          {parents && (
            <BaseBreadcrumbs
              pages={[
                ...parents
                  .sort((a, b) => b.level - a.level)
                  .map(({ _id, name }) => ({
                    name,
                    redirect: `/documentation/${_id}`,
                    current: false,
                  })),
                { name, redirect: "#", current: true },
              ]}
              separator={ChevronRightIcon}
            />
          )}
        </div>
        <div className="mt-4 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <ActionContainer />
        <div className="mt-4 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <FolderCardList />
        <FolderNote />
        <DocumentCardList />
      </div>
    </DashboardLayout>
  );
}

export default ResearchDocumentation;
