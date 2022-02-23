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
  } from "@chakra-ui/react";
  import { useWeb3React } from "@web3-react/core";
  import RequestAccess from "../../components/request-access";
  import FunkoCard from "../../components/funko-card";
  import { useDigiFunkoData } from "../../hooks/useDigiFunkosData";
  import { useParams } from "react-router-dom";
  import Loading from "../../components/loading";
  
  const Funko = () => {
    const { active, account } = useWeb3React();
    const { tokenId } = useParams();
    const { loading, funko } = useDigiFunkoData(tokenId);
  
    if (!active) return <RequestAccess />;
  
    if (loading) return <Loading />;
  
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
          <Button disabled={account !== funko.owner} colorScheme="green">
            {account !== funko.owner ? "No eres el dueño" : "Transferir"}
          </Button>
        </Stack>
        <Stack width="100%" spacing={5}>
          <Heading>{funko.name}</Heading>
          <Text fontSize="xl">{funko.description}</Text>
          <Text fontWeight={600}>
            DNA:
            <Tag ml={2} colorScheme="green">
              {funko.dna}
            </Tag>
          </Text>
          <Text fontWeight={600}>
            Owner:
            <Tag ml={2} colorScheme="green">
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