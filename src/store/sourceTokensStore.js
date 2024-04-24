import { create } from 'zustand';
import { SKIP_API as URL } from '../../config';
import axios from 'axios';

const useSourceTokensStore = create((set) => ({
  sourceTokensData: [],
  fetchSourceTokensDataInProgress: false,
  selectedToken: [],
  sourceTokenDialogOpen: false,

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

  selectSourceToken: (token) => {
    set({ selectedToken: token });
  },
}));

export default useSourceTokensStore;
