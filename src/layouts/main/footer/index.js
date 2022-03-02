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