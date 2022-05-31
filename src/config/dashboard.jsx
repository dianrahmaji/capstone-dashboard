import {
  HomeIcon,
  FolderIcon,
  ChatAlt2Icon,
  CogIcon,
  PlusIcon,
  UserIcon
} from '@heroicons/react/outline'

import Home from '~/pages/Home'
import ResearchDocumentation from '~/pages/ResearchDocumentation'
import ResearchDiscussion from '~/pages/ResearchDiscussion'
import RepositorySettings from '~/pages/RepositorySettings'
import RepositoryProposal from '~/pages/RepositoryProposal'
import UserProfile from '~/pages/UserProfile'

const dashboard = [
  {
    route: { path: '/', element: <Home /> },
    navigation: { name: 'Beranda', path: '/', icon: HomeIcon }
  },
  {
    route: { path: '/documentation', element: <ResearchDocumentation /> },
    navigation: {
      name: 'Dokumentasi Penelitian',
      path: '/documentation',
      icon: FolderIcon
    }
  },
  {
    route: { path: '/discussion', element: <ResearchDiscussion /> },
    navigation: {
      name: 'Diskusi',
      path: '/discussion',
      icon: ChatAlt2Icon
    }
  },
  {
    route: { path: '/settings', element: <RepositorySettings /> },
    navigation: {
      name: 'Pengaturan Repository',
      path: '/settings',
      icon: CogIcon
    }
  },
  {
    route: { path: '/proposal', element: <RepositoryProposal /> },
    navigation: { name: 'Ajukan Repository', path: '/proposal', icon: PlusIcon }
  },
  {
    route: { path: '/profile', element: <UserProfile /> },
    navigation: { name: 'Profil', path: '/profile', icon: UserIcon }
  }
]

export default dashboard
