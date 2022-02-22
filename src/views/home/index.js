import {
    Stack,
    Flex,
    Heading,
    Text,
    Button,
    Image,
    useToast,
    Badge,
  } from "@chakra-ui/react";
  import { Link } from "react-router-dom";
  import { useWeb3React } from "@web3-react/core";
  import useDigiFunkos from "../../hooks/useDigiFunkos";
  import { useCallback, useEffect, useState } from "react";
  import useTruncatedAddress from "../../hooks/useTruncatedAddress";
  import Web3 from "web3/dist/web3.min";
  
  const Home = () => {
    const [isMinting, setIsMinting] = useState(false);
    const [imageSrc, setImageSrc] = useState("");
    const [totalSupply, setTotalSupply] = useState(0);
    const { active, account } = useWeb3React();
    const digiFunkos = useDigiFunkos();
    const [maxSupply, setMaxSupply]=useState();
    const toast = useToast(); 
    const truncatedAddress= useTruncatedAddress(account);
    const my_val=Web3.utils.toBN("50000000000000000");
    //     console.log('account ', my_val);
        console.log('Web3.utils.toBN ', my_val);

    const getMaxSupply = useCallback(async () => {
        if (digiFunkos) {
            const result = await digiFunkos.methods.maxSupply().call();//call cause only read data
            setMaxSupply(result)
        }
    }, [digiFunkos]);

    useEffect(() => {
        getMaxSupply();
    },[getMaxSupply]);
    const getDigiFunkosData = useCallback(async () => {
      if (digiFunkos) {
        const totalSupply=await digiFunkos.methods.totalSupply().call()
        setTotalSupply(totalSupply);
        const dnaPreview = await digiFunkos.methods
          .deterministicPseudoRandomDNA(totalSupply+1, account)
          .call();
        const image = await digiFunkos.methods.imageByDNA(dnaPreview).call();

        console.log('next totalSupply ',totalSupply);
        console.log('next image ',image);
        setImageSrc(image);
      }
    }, [digiFunkos, account]);
  
    useEffect(() => {
      getDigiFunkosData();
    }, [getDigiFunkosData]);
    const mint =()=>{
        setIsMinting(true);
        // console.log('account ', Web3.utils.toBN(5e-2));
        digiFunkos.methods.mint().send({
            //from
            //gasPrice  
            //gas
            value:my_val,
            // value:5e-2,
            from:account,
        }).on('transactionHash',(txHash)=>{
            toast({
                title: 'Transacción enviada.',
                description: txHash,
                status: 'info',
                // duration: 9000,
                // isClosable: true,
              });
            
        })
        .on('receipt',()=>{

            setIsMinting(false);
            getDigiFunkosData();

            toast({
                title: 'Transacción confirmada.',
                description: 'Ahora es tuyo!',
                status: 'success',
              });
            
        })
        .on('error',(error)=>{
            toast({
                title: 'Transacción fallida.',
                description: error.message,
                status: 'error',
              });
            setIsMinting(false);

        });
    };

    return (
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <p>Max Supply: {totalSupply} / {maxSupply} </p>
          
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "green.400",
                zIndex: -1,
              }}
            >
              Un DigiFunko
            </Text>
            <br />
            <Text as={"span"} color={"green.400"}>
              unico y detergente
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            DigiFunkos es una colección de Avatares randomizados cuya metadata
            es almacenada on-chain. Poseen características únicas y sólo hay 10000
            en existencia.
          </Text>
          <Text color={"green.500"}>
            Cada DigiFunko se genera de forma secuencial basado en tu address,
            usa el previsualizador para averiguar cuál sería tu DigiFunko si
            minteas en este momento
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"green"}
              bg={"green.400"}
              _hover={{ bg: "green.500" }}
              disabled={!digiFunkos}
              onClick={mint}
              isLoading={isMinting}
            >
              Obtén tu punk
            </Button>
            <Link to="/punks">
              <Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
                Galería
              </Button>
            </Link>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          direction="column"
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Image src={active ? imageSrc : "https://avataaars.io/"} />
          {active ? (
            <>
              <Flex mt={2}>
                <Badge>
                  Next ID:
                  <Badge ml={1} colorScheme="green">
                    {totalSupply}
                  </Badge>
                </Badge>
                <Badge ml={2}>
                  Address:
                  <Badge ml={1} colorScheme="green">
                    {/* 0x0000...0000 */}
                    {truncatedAddress}
                  </Badge>
                </Badge>
              </Flex>
              <Button
                onClick={getDigiFunkosData}
                mt={4}
                size="xs"
                colorScheme="green"
              >
                Actualizar
              </Button>
            </>
          ) : (
            <Badge mt={2}>Wallet desconectado</Badge>
          )}
        </Flex>
      </Stack>
    );
  };
  
  export default Home;