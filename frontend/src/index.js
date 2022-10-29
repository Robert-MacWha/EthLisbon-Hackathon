function setProvider()
{
    if (window.ethereum)
    {
        const ethereum = window.ethereum;
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

        ethereum.enable().then((account) => {
            const defaultAccount = account[0];
            web3.eth.defaultAccount = defaultAccount;
        });

        return web3;
    }
}

const web3 = setProvider();