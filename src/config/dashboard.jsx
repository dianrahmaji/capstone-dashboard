import {
  FolderIcon,
  ChatAlt2Icon,
  CogIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/outline";

import ResearchDocumentation from "~/pages/ResearchDocumentation";
import ResearchDiscussion from "~/pages/ResearchDiscussion";
import RepositorySettings from "~/pages/RepositorySettings";
import RepositoryProposal from "~/pages/RepositoryProposal";
import UserProfile from "~/pages/UserProfile";

const dashboard = {
  documentation: {
    path: "/documentation/:folderId",
    name: "Dokumentasi Penelitian",
    icon: FolderIcon,
    element: <ResearchDocumentation />,
  },
  discussion: {
    path: "/discussion",
    name: "Diskusi",
    icon: ChatAlt2Icon,
    element: <ResearchDiscussion />,
  },
  settings: {
    path: "/settings",
    name: "Pengaturan Repository",
    icon: CogIcon,
    element: <RepositorySettings />,
  },
  proposal: {
    path: "/proposal",
    name: "Ajukan Repository",
    icon: PlusIcon,
    element: <RepositoryProposal />,
  },
  profile: {
    path: "/",
    name: "Profil",
    icon: UserIcon,
    element: <UserProfile />,
  },
};

export default dashboard;
