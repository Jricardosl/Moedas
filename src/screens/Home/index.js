import React, { useState } from 'react';
import { Alert, Image } from 'react-native';
import {
    Container,
    Animation,
    Input,
    Button,
    ButtonText,
    AddressArea,
    Text
} from './styles';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function Home() {
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState(null);

    async function moedasBuscar() {
        try {
            const { status, data } = await api.get();
            console.log(data.rates)

            if (status != 200 || data.erro) {
                Alert.alert('Buscar', 'Digite um CEP válido.');
            } else {
                setAddress(data);
            }

        } catch (error) {
            Alert.alert('Buscar', 'Digite um CEP válido');
        }
    };

    async function handleLimpar() {
        setAddress(null);
        setCep('');
    }

    return (
        <Container>
            <Animation
                animation='bounceInDown'
                delay={100}
                duration={1500}
            >
                <Image source={logo} />
            </Animation>

            <Animation
                animation='bounceInRight'
                delay={100}
                duration={1500}
            >
                {/* {!address &&
                    <Input
                        keyboardType="numeric"
                        maxLength={8}
                        onChangeText={setCep}
                        onSubmitEditing={moedasBuscar}
                        placeholder="Digite o CEP que deseja buscar"
                        placeholderTextColor="#2F48D4"
                        value={cep}
                    />
                } */}
            
            <Text> Cotações de hoje em relação ao Dólar</Text>


                <Button
                    activeOpacity={0.8}
                    onPress={address ? handleLimpar : moedasBuscar}>
                    <ButtonText>
                        {address ? 'Limpar' : 'Cotações'}
                    </ButtonText>
                </Button>
            </Animation>

            {address &&
                <AddressArea>
                    <Text>Dólar dos Estados Unidos: {address.rates.USD}</Text>
                    <Text>AED: {address.rates.AED}</Text>
                    <Text>Euro: {address.rates.EUR}</Text>
                    <Text>Peso argentino: {address.rates.ARS}</Text>
                    <Text>Franco suíço: {address.rates.CHF}</Text>
                    <Text>Libra esterlina: {address.rates.GBP}</Text>
                </AddressArea>
            }
        </Container>
    );
}