import { Web3Button, useAccount } from '@web3modal/react';

function App() {
  const { account } = useAccount()
  
  return (
    <div>
      {account.isConnected ? <h1>{account.address}</h1> : null}
      <Web3Button />
    </div>
  );
}

export default App;