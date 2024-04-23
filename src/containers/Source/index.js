import React from 'react';
import styles from './Source.module.css';
import useSourceChainsStore from '../../store/sourceChainsStore';
import { Button } from '@mui/material';
import SourceChainsDialog from './SourceChainsDialog';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Image from 'next/image';

const Source = () => {
  const {
    fetchSourceChainData,
    sourceChainsData,
    sourceChainDialogOpen,
    showSourceChainDialog,
    selectedSourceChain,
  } = useSourceChainsStore();

  React.useEffect(() => {
    if (sourceChainDialogOpen && sourceChainsData && !sourceChainsData.length) {
      fetchSourceChainData();
    }
  }, [sourceChainDialogOpen]);

  return (
    <div className={styles.source}>
      <h2>Source</h2>
      <div className={styles.main_section}>
        <div className={styles.col1}>
          <Button onClick={() => showSourceChainDialog()}>
            {selectedSourceChain &&
            Object.keys(selectedSourceChain).length > 0 ? (
              <div className={styles.selected_chain}>
                <Image
                  src={selectedSourceChain.logo_uri}
                  alt={selectedSourceChain.chain_name}
                  width={30}
                  height={30}
                />
                <p>{selectedSourceChain.chain_name}</p>
              </div>
            ) : (
              'Select Chain'
            )}
            <RiArrowDropDownLine />
          </Button>
        </div>
      </div>
      <SourceChainsDialog />
    </div>
  );
};

export default Source;
