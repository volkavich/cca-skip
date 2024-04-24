import { create } from 'zustand';

const useDestinationStore = create((set) => ({
  destinationChain: [],
  destinationToken: [],
  destinationChainDialogOpen: false,
  destinationTokenDialogOpen: false,

  setDestinationChain: (chain) => {
    set({ destinationChain: chain });
  },

  setDestinationToken: (token) => {
    set({ destinationToken: token });
  },

  showDestinationChainsDialog: () => {
    set({ destinationChainDialogOpen: true });
  },

  hideDestinationChainsDialog: () => {
    set({ destinationChainDialogOpen: false });
  },

  showDestinationTokensDialog: () => {
    set({ destinationTokenDialogOpen: true });
  },

  hideDestinationTokensDialog: () => {
    set({ destinationTokenDialogOpen: false });
  },
}));

export default useDestinationStore;
