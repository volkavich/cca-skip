import * as React from 'react';
import { Dialog, IconButton, CircularProgress } from '@mui/material';
import styles from './Destination.module.css';
// import Image from 'next/image';
import { IoArrowBackOutline } from 'react-icons/io5';
import useDestinationStore from '../../store/destinationStore';

const DestinationChainsDialog = () => {
  const {
    destinationData,
    postDestinationInProgress,
    destinationChainsDialogOpen,
    hideDestinationChainsDialog,
    setDestinationChain,
  } = useDestinationStore();

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
          <h2>Select Source Network</h2>
        </div>
        {postDestinationInProgress ? (
          <div className={styles.loader}>
            <CircularProgress />
          </div>
        ) : (
          destinationData &&
          destinationData.dest_assets &&
          Object.keys(destinationData.dest_assets).map((chain) => (
            <div
              className={styles.chain_info}
              key={chain}
              onClick={() => handleClick(chain)}
            >
              {/*<Image*/}
              {/*  src={chain.logo_uri}*/}
              {/*  alt={chain.chain_name}*/}
              {/*  width={30}*/}
              {/*  height={30}*/}
              {/*/>*/}
              <div className={styles.chain_name}>
                <p>{chain}</p>
                {/*<span>{chain.chain_id}</span>*/}
              </div>
            </div>
          ))
        )}
      </div>
    </Dialog>
  );
};

export default DestinationChainsDialog;
