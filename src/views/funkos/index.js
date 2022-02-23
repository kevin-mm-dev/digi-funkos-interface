import FunkoCard from '../../components/funko-card';
import Loading from '../../components/loading';
import RequestAccess from '../../components/request-access';
import { useWeb3React } from '@web3-react/core';
import {useDigiFunkosData} from '../../hooks/useDigiFunkosData';
import {Link} from "react-router-dom";
import {Grid } from '@chakra-ui/react';

const Funkos=() => {
    const {active }= useWeb3React();
    const {funkos,isLoading,update}=useDigiFunkosData();
    if (!active) return <RequestAccess/>;

    return(
        <>
        {
            isLoading?
            <Loading/>:
            <Grid templateColumns="repeat(auto-fill,minmax(250px,1fr))" gap={6}>
                {funkos.map(({ name,image,tokenId},index)=>(
                    <Link key={tokenId} to={`/funkos/${tokenId}`}>
                        <FunkoCard image={image} name={name}/>
                    </Link>
                ))}

            </Grid>
        }
        </>
    )
}


export default Funkos;