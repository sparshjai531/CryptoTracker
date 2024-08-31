import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../main'
import { Button, Container, Heading, HStack, Image, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
import CoinCard from './CoinCard'

const Coins = () => {

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [page, setPage] = useState(1)
    const [currency, setCurrency] = useState("inr")

    const currencySymbol =
        currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    const changePage = (page) => {
        setPage(page);
        setLoading(true)
    }

    const btns = new Array(132).fill(1);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
                setCoins(response.data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchCoins()
    }, [currency, page])

    if (error) {
        return (
            <ErrorComponent message={"Some Error occured while Fetching the data!!!!!!!"} />
        )
    }

    return (
        <>
            <Container maxW={'container.xl'}>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <RadioGroup value={currency} onChange={setCurrency} p={8}>
                            <HStack spacing={4}>
                                <Radio value={'inr'}>INR</Radio>
                                <Radio value={'usd'}>USD</Radio>
                                <Radio value={'eur'}>EUR</Radio>
                            </HStack>
                        </RadioGroup>
                        <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
                            {coins.map((coin) => (
                                <CoinCard id={coin.id} key={coin.id} name={coin.name} price={coin.current_price} img={coin.image} symbol={coin.symbol} currencySymbol={currencySymbol} />
                            ))}
                        </HStack>
                        <HStack w={'full'} overflowX={'auto'} p={8}>
                            {
                                btns.map((item, index) => {
                                    return (
                                        <Button key={index} bgColor={'blackAlpha.900'} color={'white'} onClick={() => changePage(index + 1)}>{index + 1}</Button>
                                    )
                                })
                            }
                        </HStack>
                    </>
                )}
            </Container>
        </>
    )
}

export default Coins
