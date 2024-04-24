import { create } from 'zustand';
import { SKIP_API as URL } from '../../config';
import axios from 'axios';

const useSourceStore = create((set) => ({
  sourceChainsData: [],
  sourceTokensData: [],
  fetchSourceChainsDataInProgress: false,
  fetchSourceTokensDataInProgress: false,
  sourceChain: [],
  sourceToken: [],
  sourceChainDialogOpen: false,
  sourceTokenDialogOpen: false,

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

  setSourceChain: (chain) => {
    set({ sourceChain: chain });
  },

  fetchSourceTokenData: async (chainID) => {
    set({ fetchSourceTokensDataInProgress: true });
    const options = {
      method: 'GET',
      url: `${URL}/v1/fungible/assets?chain_id=${chainID}&include_evm_assets=false&include_svm_assets=false`,
      headers: { accept: 'application/json' },
    };
    try {
      const response = await axios.request(options);
      set({
        sourceTokensData: response.data && response.data.chain_to_assets_map,
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({ fetchSourceTokensDataInProgress: false });
    }
  },

  showSourceTokenDialog: () => {
    set({ sourceTokenDialogOpen: true });
  },

  hideSourceTokenDialog: () => {
    set({ sourceTokenDialogOpen: false });
  },

  setSourceToken: (token) => {
    set({ sourceToken: token });
  },
}));

export default useSourceStore;
