import { Derive } from './';
import store from 'store/dist/store.modern';

import {
  CurrentUser,
  Notification,
  Sandbox,
  UploadFile,
} from '@codesandbox/common/lib/types';

type State = {
  isPatron: boolean;
  isLoggedIn: boolean;
  hasLogIn: boolean;
  popularSandboxes: Sandbox[];
  hasLoadedApp: boolean;
  jwt: string;
  isAuthenticating: boolean;
  userMenuOpen: boolean;
  authToken: string;
  error: string;
  contributors: string[];
  user: CurrentUser;
  connected: boolean;
  notifications: Notification[];
  isLoadingCLI: boolean;
  isLoadingGithub: boolean;
  isLoadingZeit: boolean;
  contextMenu: {
    show: boolean;
    items: string[];
    x: number;
    y: number;
  };
  currentModal: string;
  currentModalMessage: string;
  uploadedFiles: UploadFile[];
  maxStorage: number;
  usedStorage: number;
  updateStatus: string;
  isContributor: Derive<State, (username: String) => boolean>;
};

export const state: State = {
  get isPatron() {
    const state: State = this;
    return Boolean(
      state.user && state.user.subscription && state.user.subscription.since
    );
  },
  get isLoggedIn() {
    const state: State = this;
    return Boolean(state.jwt) && Boolean(state.user);
  },
  // TODO: Should not reference store directly here, rather initialize
  // the state with "onInitialize" setting the jwt
  get hasLogIn() {
    const state: State = this;

    return !!this.jwt || !!store.get('jwt');
  },
  isContributor: state => username => {
    return (
      state.contributors.findIndex(
        contributor =>
          contributor.toLocaleLowerCase() === username.toLocaleLowerCase()
      ) > -1
    );
  },
  popularSandboxes: null,
  hasLoadedApp: false,
  jwt: null,
  isAuthenticating: true,
  authToken: null,
  error: null,
  user: null,
  connected: true,
  notifications: [],
  contributors: [],
  userMenuOpen: false,
  isLoadingZeit: false,
  isLoadingCLI: false,
  isLoadingGithub: false,
  contextMenu: {
    show: false,
    items: [],
    x: 0,
    y: 0,
  },
  currentModal: undefined,
  currentModalMessage: undefined,
  uploadedFiles: null,
  maxStorage: 0,
  usedStorage: 0,
  updateStatus: null,
};