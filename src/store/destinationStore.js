import { create } from 'zustand';
import { SKIP_API as URL } from '../../config';
import axios from 'axios';

const useDestinationStore = create((set) => ({
  destinationData: [],
  destinationChainsDialogOpen: false,
  destinationTokensDialogOpen: false,
  postDestinationInProgress: false,
  destinationChain: null,
  destinationToken: [],

  postDestinationRequest: async (denom, chainId) => {
    set({ postDestinationInProgress: true });
    const options = {
      method: 'POST',
      url: `${URL}/v1/fungible/assets_from_source`,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      data: {
        allow_multi_tx: false,
        include_cw20_assets: false,
        source_asset_denom: denom,
        source_asset_chain_id: chainId,
      },
    };

    try {
      const response = await axios.request(options);
      set({
        destinationData: response.data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({ postDestinationInProgress: false });
    }
  },

  setDestinationChain: (chain) => {
    set({ destinationChain: chain });
  },

  setDestinationToken: (token) => {
    set({ destinationToken: token });
  },

  showDestinationChainsDialog: () => {
    set({ destinationChainsDialogOpen: true });
  },

  hideDestinationChainsDialog: () => {
    set({ destinationChainsDialogOpen: false });
  },

  showDestinationTokensDialog: () => {
    set({ destinationTokenDialogOpen: true });
  },

  hideDestinationTokensDialog: () => {
    set({ destinationTokenDialogOpen: false });
  },
}));

export default useDestinationStore;
