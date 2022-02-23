// import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/home';
import Funkos from './views/funkos';
import Funko from './views/funko';
// import Web3 from 'web3';
// import Web3 from "web3/dist/web3.min";
import MainLayout from "./layouts/main";

function App() {

  // useEffect(()=>{ // to check if has MetaMask or other Injected Provider
  //   if (window.ethereum) {
  //     // window.ethereum.request({
  //     //   method: 'eth_requestAccounts',
  //     // }).then(account => console.log(account));
  //     const web3=new Web3(window.ethereum);
  //     web3.eth.requestAccounts().then(account => console.log(account));
  //   }
  // }); 




return (
  <MainLayout>
    <Routes>
      <Route path="/" exact element={<Home/>} />
      <Route path="/funkos" exact element={<Funkos/>} />
      <Route path="/funkos/:tokenId" exact element={<Funko/>} />
    </Routes>
  </MainLayout>
);
}

export default App;