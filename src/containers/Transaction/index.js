import React from 'react';
import styles from './Transaction.module.css';
import { Button } from '@mui/material';
import useRouteStore from '../../store/routeStore';
import useTransactionStore from '../../store/transactionStore';
import route from '../Route';

const Transaction = () => {
  const { routeData } = useRouteStore();
  const { msg, postMsgRequest } = useTransactionStore();
  const server = typeof window === 'undefined';
  let connectedChains;
  const addressList = [];

  const handleClick = () => {
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
  };

  return (
    <Button className={styles.transaction} onClick={handleClick}>
      Submit
    </Button>
  );
};

export default Transaction;
