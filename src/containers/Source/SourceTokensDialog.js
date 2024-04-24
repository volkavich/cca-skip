import * as React from 'react';
import { Dialog, IconButton, CircularProgress } from '@mui/material';
import useSourceStore from '../../store/sourceStore';
import styles from './Source.module.css';
import Image from 'next/image';
import { IoArrowBackOutline } from 'react-icons/io5';

const SourceTokensDialog = () => {
  const {
    sourceChain,
    hideSourceTokenDialog,
    sourceTokenDialogOpen,
    sourceTokensData,
    setSourceToken,
    fetchSourceTokensDataInProgress,
  } = useSourceStore();

  const handleClick = (value) => {
    setSourceToken(value);
    hideSourceTokenDialog();
  };

  return (
    <Dialog
      className={styles.dialog}
      onClose={() => hideSourceTokenDialog()}
      open={sourceTokenDialogOpen}
    >
      <div className={styles.dialog_content}>
        <div className={styles.dialog_heading}>
          <IconButton onClick={() => hideSourceTokenDialog()}>
            <IoArrowBackOutline />
          </IconButton>
          <h2>Select Source Token</h2>
        </div>
        {fetchSourceTokensDataInProgress ? (
          <div className={styles.loader}>
            <CircularProgress />
          </div>
        ) : (
          sourceTokensData &&
          sourceTokensData[`${sourceChain.chain_id}`] &&
          sourceTokensData[`${sourceChain.chain_id}`].assets &&
          sourceTokensData[`${sourceChain.chain_id}`].assets.map((token) => (
            <div
              className={styles.chain_info}
              key={token.chain_id}
              onClick={() => handleClick(token)}
            >
              <Image
                src={token.logo_uri}
                alt={token.denom}
                width={30}
                height={30}
              />
              <div className={styles.chain_name}>
                <p>{token.name}</p>
                <span>{token.chain_id}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </Dialog>
  );
};

export default SourceTokensDialog;
