import ReactDOM from "react-dom/client";
import { Web3Modal } from '@web3modal/react'
import App from "./App";

const config = {
  projectId: "193d058eaacf98328ee7cc3e4c5709c6",
  theme: "dark",
  accentColor: "default",
  ethereum: {
    appName: 'web3Modal',
    autoConnect: true
  }
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
    <Web3Modal config={config} />
  </>

);