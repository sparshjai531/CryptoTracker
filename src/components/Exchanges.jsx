import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../main'
import { Container, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'

const Exchanges = () => {

    const [exchanges, setExchanges] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const response = await axios.get(`${server}/exchanges`);
                setExchanges(response.data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchExchanges()
    }, [])

    if(error){
        return(
            <ErrorComponent message={"Some Error occured while Fetching the data!!!!!!!"}/>
        )
    }

    return (
        <>
            <Container maxW={'container.xl'}>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
                            {exchanges.map((coin) => (
                                <Exchangecard key={coin.id} name={coin.name} img={coin.image} rank={coin.trust_score_rank} url={coin.url} />
                            ))}
                        </HStack>
                    </>
                )}
            </Container>
        </>
    )
}

const Exchangecard = ({ name, img, rank, url }) => {
    return (
        <a href={url} target={"blank"}>
            <VStack w={52} shadow={'lg'} p={8} borderRadius={'lg'} transition={'all 0.3s'} m={4} css={{
                "&:hover": {
                    transform: "scale(1.1)",
                },
            }}>
                <Image src={img} w={'10'} h={'10'} objectFit={'contain'} alt='Exchange' />
                <Heading size={'md'} noOfLines={1}>{rank}</Heading>
                <Text noOfLines={1}>{name}</Text>
            </VStack>
        </a>
    )
}

export default Exchanges
