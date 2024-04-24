import { create } from 'zustand';

const useSourceStore = create((set) => ({
  sourceChain: [],
  sourceToken: [],
  sourceAmount: null,
  sourceChainDialogOpen: false,
  sourceTokenDialogOpen: false,

  setSourceChain: (chain) => {
    set({ sourceChain: chain });
  },

  setSourceToken: (token) => {
    set({ sourceToken: token });
  },

  setSourceAmount: (value) => {
    set({ sourceAmount: value });
  },

  showSourceChainDialog: () => {
    set({ sourceChainDialogOpen: true });
  },

  hideSourceChainDialog: () => {
    set({ sourceChainDialogOpen: false });
  },

  showSourceTokenDialog: () => {
    set({ sourceTokenDialogOpen: true });
  },

  hideSourceTokenDialog: () => {
    set({ sourceTokenDialogOpen: false });
  },
}));

export default useSourceStore;
