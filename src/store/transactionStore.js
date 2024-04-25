import { create } from 'zustand';
import { SKIP_API as URL, CLIENT_ID } from '../../config';
import axios from 'axios';

const useTransactionStore = create((set) => ({
  msgResponse: [],
  postMsgInProgress: false,

  postMsgRequest: async (
    sourceTokenDenom,
    sourceChainId,
    destinationTokenDenom,
    destinationChainId,
    amountIn,
    amountOut,
    addressList,
    operations
  ) => {
    set({ postMsgInProgress: true });
    const options = {
      method: 'POST',
      url: `${URL}/v2/fungible/msgs`,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      data: {
        source_asset_denom: sourceTokenDenom,
        source_asset_chain_id: sourceChainId,
        dest_asset_denom: destinationTokenDenom,
        dest_asset_chain_id: destinationChainId,
        amount_in: amountIn,
        amount_out: amountOut,
        address_list: [...addressList],
        operations: [...operations],
        slippage_tolerance_percent: '3',
        client_id: CLIENT_ID,
      },
    };

    try {
      const response = await axios.request(options);
      set({
        msgResponse: response.data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({ postMsgInProgress: false });
    }
  },
}));

export default useTransactionStore;
