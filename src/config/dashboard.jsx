import {
  HomeIcon,
  FolderIcon,
  ChatAlt2Icon,
  ClipboardCheckIcon,
  CogIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/outline";

import Home from "~/pages/Home";
import RepositoryProposal from "~/pages/RepositoryProposal";
import RepositorySettings from "~/pages/RepositorySettings";
import ResearchDocumentation from "~/pages/ResearchDocumentation";
import ResearchDiscussion from "~/pages/ResearchDiscussion";
import ReserachEvaluation from "~/pages/ResearchEvaluation";
import UserProfile from "~/pages/UserProfile";

const dashboard = {
  root: {
    path: "/",
    name: "Beranda",
    icon: HomeIcon,
    element: <Home />,
  },
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
    name: "Pengaturan Project",
    icon: CogIcon,
    element: <RepositorySettings />,
  },
  evaluation: {
    path: "/evaluation",
    name: "Evaluasi Project",
    icon: ClipboardCheckIcon,
    element: <ReserachEvaluation />,
  },
  proposal: {
    path: "/proposal",
    name: "Ajukan Project",
    icon: PlusIcon,
    element: <RepositoryProposal />,
  },
  profile: {
    path: "/profile",
    name: "Profil",
    icon: UserIcon,
    element: <UserProfile />,
  },
};

export default dashboard;
