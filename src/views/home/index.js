import {useWeb3React} from '@web3-react/core';
import { useState, useCallback, useEffect } from 'react';
import useDigiFunkos from '../../hooks/useDigiFunkos';

const Home=()=>{
    const {active}=useWeb3React();
    const [maxSupply, setMaxSupply]=useState();

    const digiFunkos = useDigiFunkos();

    const getMaxSupply = useCallback(async () => {
        if (digiFunkos) {
            const result = await digiFunkos.methods.maxSupply().call();//call cause only read data
            setMaxSupply(result)
        }
    }, [digiFunkos]);

    useEffect(() => {
        getMaxSupply();
    },[getMaxSupply]);


    if(!active) return 'Conecta tu wallet'; 
    return (
        <>
        <p>Max Supply:  {maxSupply}</p>
        </>
    );
};
export default Home;