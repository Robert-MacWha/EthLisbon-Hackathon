import './App.css';

// import { useConnected, ConnectButton, useConnectModal } from '@web3modal/react'
import { Web3Button, useAccount, useBalance, useToken, useContract } from '@web3modal/react';



function App() {
  const { account } = useAccount();
  console.log(account)
  const { data, error, isLoading, refetch } = useBalance({
    addressOrName: account.address
  })
  return (
    <div className="App">
      {
        account.isConnected && (
          <>
            <p>{data?.formatted.substring(0, 5) + ' ETH'}</p>
            <p>{account.address.substring(0, 5) + '...' + account.address.substring(account.address.length - 3, account.address.length)}</p>
          </>
        )
      }
      <Web3Button />
    </div>
  );

}

export default App;

