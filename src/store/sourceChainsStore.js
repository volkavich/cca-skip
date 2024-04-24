import { create } from 'zustand';
import { SKIP_API as URL } from '../../config';
import axios from 'axios';

const useSourceChainsStore = create((set) => ({
  sourceChainsData: [],
  fetchSourceChainsDataInProgress: false,
  selectedSourceChain: [],
  sourceChainDialogOpen: false,

  fetchSourceChainData: async () => {
    set({ fetchSourceChainsDataInProgress: true });
    const options = {
      method: 'GET',
      url: `${URL}/v1/info/chains?include_evm=false&include_svm=false&include_testnets=false`,
      headers: { accept: 'application/json' },
    };
    try {
      const response = await axios.request(options);
      set({ sourceChainsData: response.data && response.data.chains });
    } catch (error) {
      console.error(error);
    } finally {
      set({ fetchSourceChainsDataInProgress: false });
    }
  },

  showSourceChainDialog: () => {
    set({ sourceChainDialogOpen: true });
  },

  hideSourceChainDialog: () => {
    set({ sourceChainDialogOpen: false });
  },

  selectSourceChain: (chain) => {
    set({ selectedSourceChain: chain });
  },
}));

export default useSourceChainsStore;
