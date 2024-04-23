// import { useState } from 'react';
// import { Wallet } from '../wallet';
// import { CHAIN_NAME } from '../config';
import Main from '../src/containers/Main';

export default function Home() {
  // const [chainName, setChainName] = useState(CHAIN_NAME);
  //
  // function onChainChange(chainName) {
  //   setChainName(chainName);
  // }

  return (
    <div className='home'>
      <Main />
      {/*<Wallet chainName={chainName} onChainChange={onChainChange} />*/}
    </div>
  );
}
