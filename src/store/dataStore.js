import { create } from 'zustand';
import { SKIP_API as URL } from '../../config';
import axios from 'axios';

const useDataStore = create((set) => ({
  chains: [],
  tokens: [],
  fetchChainsInProgress: false,
  fetchTokensInProgress: false,

  fetchChains: async () => {
    set({ fetchChainsInProgress: true });
    const options = {
      method: 'GET',
      url: `${URL}/v1/info/chains?include_evm=false&include_svm=false&include_testnets=false`,
      headers: { accept: 'application/json' },
    };
    try {
      const response = await axios.request(options);
      set({ chains: response.data && response.data.chains });
    } catch (error) {
      console.error(error);
    } finally {
      set({ fetchChainsInProgress: false });
    }
  },

  fetchTokens: async (chainID) => {
    set({ fetchTokensInProgress: true });
    const options = {
      method: 'GET',
      url: `${URL}/v1/fungible/assets?chain_id=${chainID}&include_evm_assets=false&include_svm_assets=false`,
      headers: { accept: 'application/json' },
    };
    try {
      const response = await axios.request(options);
      set({ tokens: response.data && response.data.chain_to_assets_map });
    } catch (error) {
      console.error(error);
    } finally {
      set({ fetchTokensInProgress: false });
    }
  },
}));

export default useDataStore;
