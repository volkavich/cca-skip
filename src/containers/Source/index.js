import React from 'react';
import styles from './Source.module.css';
import useSourceStore from '../../store/sourceStore';
import { Button } from '@mui/material';
import SourceChainsDialog from './SourceChainsDialog';
import SourceTokensDialog from './SourceTokensDialog';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Image from 'next/image';

const Source = () => {
  const {
    fetchSourceChainData,
    fetchSourceTokenData,
    sourceChainsData,
    sourceChain,
    sourceToken,
    showSourceChainDialog,
    showSourceTokenDialog,
    sourceTokenDialogOpen,
    sourceChainDialogOpen,
  } = useSourceStore();

  React.useEffect(() => {
    if (sourceChainDialogOpen && sourceChainsData && !sourceChainsData.length) {
      fetchSourceChainData();
    }
  }, [sourceChainDialogOpen]);

  React.useEffect(() => {
    if (
      sourceTokenDialogOpen &&
      sourceChain &&
      Object.keys(sourceChain).length > 0 &&
      sourceToken.chain_id !== sourceChain.chain_id
    ) {
      fetchSourceTokenData(sourceChain.chain_id);
    }
  }, [sourceTokenDialogOpen]);

  return (
    <div className={styles.source}>
      <h2>Source</h2>
      <div className={styles.main_section}>
        <div className={styles.col1}>
          <Button onClick={() => showSourceChainDialog()}>
            {sourceChain && Object.keys(sourceChain).length > 0 ? (
              <div className={styles.selected_chain}>
                <Image
                  src={sourceChain.logo_uri}
                  alt={sourceChain.chain_name}
                  width={30}
                  height={30}
                />
                <p>{sourceChain.chain_name}</p>
              </div>
            ) : (
              'Select Chain'
            )}
            <RiArrowDropDownLine />
          </Button>
          <Button
            disabled={!sourceChain || !Object.keys(sourceChain).length}
            onClick={() => showSourceTokenDialog()}
          >
            {sourceToken && Object.keys(sourceToken).length > 0 ? (
              <div className={styles.selected_chain}>
                <Image
                  src={sourceToken.logo_uri}
                  alt={sourceToken.name}
                  width={30}
                  height={30}
                />
                <p>{sourceToken.name}</p>
              </div>
            ) : (
              'Select Token'
            )}
            <RiArrowDropDownLine />
          </Button>
        </div>
      </div>
      <SourceChainsDialog />
      <SourceTokensDialog />
    </div>
  );
};

export default Source;
