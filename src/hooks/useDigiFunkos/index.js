import {useMemo} from 'react';
import {useWeb3React} from '@web3-react/core';
import DigiFunkosArtifact from '../../config/web3/artifacts';

const {address,abi}=DigiFunkosArtifact;
const useDigiFunkos=()=>{
    const { active,library,chainId}= useWeb3React();

    const digiFunkos= useMemo( ()=> {
       if(active) return new library.eth.Contract( abi,address[chainId]);
    
    },[active,library?.eth?.Contract,chainId])
    return digiFunkos;
}

export default useDigiFunkos;