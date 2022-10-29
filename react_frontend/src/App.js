import { Web3Button, useAccount } from '@web3modal/react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"

function App() {
  const { account } = useAccount()
  
  return (
    <div>
      <div class="connection">
        {account.isConnected ? <h1>{account.address}</h1> : null}
        <Web3Button />
      </div>

      <div class="container">
        <h2>Solarium</h2>
      </div>
    </div>
  );
}

export default App;