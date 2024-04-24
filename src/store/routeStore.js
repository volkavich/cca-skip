import { create } from 'zustand';
import { SKIP_API as URL } from '../../config';
import axios from 'axios';

const useRouteStore = create((set) => ({
  routeData: [],
  postRouteInProgress: false,

  postRouteRequest: async (
    sourceDenom,
    sourceChainId,
    destinationDenom,
    destinationChainId
  ) => {
    set({ postRouteInProgress: true });
    const options = {
      method: 'POST',
      url: `${URL}/v2/fungible/route`,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      data: {
        amount_in: '1000000',
        source_asset_denom: sourceDenom,
        source_asset_chain_id: sourceChainId,
        dest_asset_denom: destinationDenom,
        dest_asset_chain_id: destinationChainId,
        cumulative_affiliate_fee_bps: null,
        allow_multi_tx: false,
        allow_unsafe: false,
        smart_relay: true,
      },
    };

    try {
      const response = await axios.request(options);
      set({
        routeData: response.data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({ postRouteInProgress: true });
    }
  },
}));

export default useRouteStore;
