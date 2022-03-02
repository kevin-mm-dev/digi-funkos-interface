import {
    Stack,
    Heading,
    Text,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    Button,
    Tag,
    useToast
  } from "@chakra-ui/react";
  import { useWeb3React } from "@web3-react/core";
  import RequestAccess from "../../components/request-access";
  import FunkoCard from "../../components/funko-card";
  import { useDigiFunkoData } from "../../hooks/useDigiFunkosData";
  import { useParams } from "react-router-dom";
  import {useState }from 'react';
  import Loading from "../../components/loading";
  import useDigiFunkos  from "../../hooks/useDigiFunkos";
  
  const Funko = () => {
    const { active, account,library } = useWeb3React();
    const { tokenId } = useParams();
    const { isLoading, funko,update } = useDigiFunkoData(tokenId);
    const toast = useToast();
    const digiFunkos = useDigiFunkos();
    const [isTransfering,setTransfering]=useState(false);

    const transfer=()=>{
        setTransfering(true);
        const address=prompt("Ingresa la direccion");
        const isAddress=library.utils.isAddress(address);


        if (isAddress) {
            digiFunkos.methods.safeTransferFrom(funko.owner,address,funko.tokenId).send({
                from: account,
            }).on('error',()=>{

            }).on('transactionHash',(txHash)=>{
                toast({
                    title: 'Transacción enviada.',
                    description: txHash,
                    status: 'info',
                  });
            }).on('receipt',()=>{
                setTransfering(false);
                toast({
                    title: 'Transacción confirmada.',
                    description: `El funko ahora pertenece a ${address}`,
                    status: 'success',
                  });
                  update();
            });
        }else{
            toast({
                title:'Direccion Invalida',
                description:'La direccion no es valia en la red de Ethereum',
                status:"error",

            });
          setTransfering(false);

        }
    }
  
    if (!active) return <RequestAccess />;
  
    if (isLoading) return <Loading />;
  
    return (
      <Stack
        spacing={{ base: 8, md: 10 }}
        py={{ base: 5 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack>
          <FunkoCard
            mx={{
              base: "auto",
              md: 0,
            }}
            name={funko.name}
            image={funko.image}
          />
          <Button
            onClick={transfer}
            disabled={account !== funko.owner} colorScheme="blue"
            isLoading={isTransfering}
           >
            {account !== funko.owner ? "No eres el dueño" : "Transferir"}

          </Button>
        </Stack>
        <Stack width="100%" spacing={5}>
          <Heading>{funko.name}</Heading>
          <Text fontSize="xl">{funko.description}</Text>
          <Text fontWeight={600}>
            DNA:
            <Tag ml={2} colorScheme="blue">
              {funko.dna}
            </Tag>
          </Text>
          <Text fontWeight={600}>
            Owner:
            <Tag ml={2} colorScheme="blue">
              {funko.owner}
            </Tag>
          </Text>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Atributo</Th>
                <Th>Valor</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.entries(funko.attributes).map(([key, value]) => (
                <Tr key={key}>
                  <Td>{key}</Td>
                  <Td>
                    <Tag>{value}</Tag>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Stack>
      </Stack>
    );
  };
  
  export default Funko;