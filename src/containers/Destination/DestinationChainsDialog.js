import * as React from 'react';
import { Dialog, IconButton, CircularProgress } from '@mui/material';
import styles from './Destination.module.css';
import Image from 'next/image';
import { IoArrowBackOutline } from 'react-icons/io5';
import useDestinationStore from '../../store/destinationStore';
import useSourceStore from '../../store/sourceStore';

const DestinationChainsDialog = () => {
  const { destinationChainsDialogOpen, hideDestinationChainsDialog, setDestinationChain } =
    useDestinationStore();

  const { sourceChainsData, fetchSourceChainsDataInProgress } = useSourceStore();

  const handleClick = (value) => {
    setDestinationChain(value);
    hideDestinationChainsDialog();
  };

  return (
    <Dialog
      className={styles.dialog}
      onClose={() => hideDestinationChainsDialog()}
      open={destinationChainsDialogOpen}
    >
      <div className={styles.dialog_content}>
        <div className={styles.dialog_heading}>
          <IconButton onClick={() => hideDestinationChainsDialog()}>
            <IoArrowBackOutline />
          </IconButton>
          <h2>Select Destination Network</h2>
        </div>
        {fetchSourceChainsDataInProgress ? (
          <div className={styles.loader}>
            <CircularProgress />
          </div>
        ) : (
          sourceChainsData &&
          sourceChainsData.map((chain) => (
            <div
              className={styles.chain_info}
              key={chain.chain_id}
              onClick={() => handleClick(chain)}
            >
              <Image src={chain.logo_uri} alt={chain.chain_name} width={30} height={30} />
              <div className={styles.chain_name}>
                <p>{chain.chain_name}</p>
                <span>{chain.chain_id}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </Dialog>
  );
};

export default DestinationChainsDialog;
