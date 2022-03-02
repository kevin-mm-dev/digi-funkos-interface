import {
    Box,
    Container,
    Stack,
    Text,
    Link,
    Image,
    useColorModeValue,
  } from "@chakra-ui/react";
  
  const Footer = () => {
    return (
      <Box
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Box>
          <svg xmlns="http://www.w3.org/2000/svg" margin-top="-100px" opacity="15%;" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,128L48,144C96,160,192,192,288,213.3C384,235,480,245,576,229.3C672,213,768,171,864,170.7C960,171,1056,213,1152,192C1248,171,1344,85,1392,42.7L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </Box>

        <Box
          borderTopWidth={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <Container
            as={Stack}
            maxW={"6xl"}
            py={4}
            direction={{ base: "column", md: "row" }}
            spacing={4}
            justify={{ base: "center"}}
            align={{ base: "center", md: "center" }}
          >
            <Text>
              © {new Date().getFullYear()} 
            </Text>
            <Image src="./images/linkedin.png" width="25px" />
            <Link ml={1} href="https://www.linkedin.com/in/kevin-m-m-dev/">
                Kevin Martinez Meraz 
            </Link>
          </Container>
        </Box>
      </Box>
    );
  };
  
  export default Footer;