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

  showDestinationChainDialog: () => {
    set({ destinationChainDialogOpen: true });
  },

  hideDestinationChainDialog: () => {
    set({ destinationChainDialogOpen: false });
  },

  showDestinationTokenDialog: () => {
    set({ destinationTokenDialogOpen: true });
  },

  hideDestinationTokenDialog: () => {
    set({ destinationTokenDialogOpen: false });
  },
}));

export default useDestinationStore;
