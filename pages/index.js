import { useState } from 'react';
import { Wallet } from '../wallet';
import { CHAIN_NAME } from '../config';

export default function Home() {
  const [chainName, setChainName] = useState(CHAIN_NAME);

  function onChainChange(chainName) {
    setChainName(chainName);
  }

  return <Wallet chainName={chainName} onChainChange={onChainChange} />;
}
