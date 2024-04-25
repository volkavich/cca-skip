import React from 'react';
import styles from './Transaction.module.css';
import { Button, CircularProgress } from '@mui/material';
import useRouteStore from '../../store/routeStore';
import useTransactionStore from '../../store/transactionStore';
import { GasPrice, SigningStargateClient } from '@cosmjs/stargate';
import * as chainRegistry from "chain-registry";
import { useWalletClient } from "@cosmos-kit/react";
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';

const Transaction = () => {
  const { routeData } = useRouteStore();
  const { msgResponse, postMsgRequest, postMsgInProgress } = useTransactionStore();
  const {client} = useWalletClient();
  const server = typeof window === 'undefined';
  let connectedChains;
  const addressList = [];


  const handleClick = async () => {
    if (!server) {
      const chainsString = localStorage.getItem('cosmos-kit@2:core//accounts');
      connectedChains = chainsString && JSON.parse(chainsString);
    }

    if (routeData && Object.keys(routeData).length > 0) {
      for (const chainID of routeData.chain_ids) {
        const address = connectedChains.find((chain) => chain.chainId === chainID)?.address;
        if (address && !addressList.includes(address)) {
          addressList.push(address);
        }
      }
    }

    if (
      routeData &&
      Object.keys(routeData).length > 0 &&
      addressList.length === routeData.chain_ids.length
    ) {
      postMsgRequest(
        routeData.source_asset_denom,
        routeData.source_asset_chain_id,
        routeData.dest_asset_denom,
        routeData.dest_asset_chain_id,
        routeData.amount_in,
        routeData.amount_out,
        addressList,
        routeData.operations
      );
    }

    if (msgResponse && Object.keys(msgResponse).length > 0) {
      const txResult = await signAndSubmitTx(msgResponse);
      console.log(txResult);
    }
  };

  const signAndSubmitTx = async () => {
    const multiHopMsg = msgResponse.msgs[0].multi_chain_msg
    const msgJSON = JSON.parse(multiHopMsg && multiHopMsg.msg);

    // get signing client
    const RPC_URL = `https://ibc.fun/api/rpc/${multiHopMsg.chain_id}`;

    // const account = await WalletClient.getAccount(multiHopMsg.chain_id);
    const signer = await client.getOfflineSignerDirect(multiHopMsg.chain_id);
    const sourceChain = chainRegistry.chains.find(
      (chain) => chain.chain_id === multiHopMsg.chain_id
    );

    //fee
    const feeInfo = sourceChain.fees?.fee_tokens[0];
    let averageGasPrice = feeInfo?.average_gas_price ?? 0;

    //tx
    let msg = {};
    let client1;

    if (multiHopMsg.msg_type_url === "/ibc.applications.transfer.v1.MsgTransfer") {
      client1 = await SigningStargateClient.connectWithSigner(RPC_URL, signer, {
        gasPrice: GasPrice.fromString(`${averageGasPrice}${feeInfo.denom}`)
      });

      msg = {
        typeUrl: multiHopMsg.msg_type_url,
        value: {
          sourcePort: msgJSON.source_port,
          sourceChannel: msgJSON.source_channel,
          token: msgJSON.token,
          sender: msgJSON.sender,
          receiver: msgJSON.receiver,
          timeoutTimestamp: msgJSON.timeout_timestamp,
          memo: msgJSON.memo,
        },
      };
    } else {
      client1 = await SigningCosmWasmClient.connectWithSigner(RPC_URL, signer, options);

      msg = {
        typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
        value: {
          sender: msgJSON.sender,
          contract: msgJSON.contract,
          msg: Uint8Array.from(Buffer.from(JSON.stringify(msgJSON.msg))),
          funds: msgJSON.funds,
        },
      };
    }

    const tx = await client1.signAndBroadcast(msgJSON.sender, [msg], "auto");
    return tx;
  }

  if (routeData && Object.keys(routeData).length > 0) {
    return (
      <div className={styles.transaction}>
        <Button onClick={handleClick}>{postMsgInProgress ? <CircularProgress /> : 'Submit'}</Button>
      </div>
    );
  }
};

export default Transaction;
