/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useTheme} from 'styled-components';
import {useAuth} from '../../global/Context';
import {useFetch} from '../../global/services/get';
import {
  Container,
  PlateImage,
  PlateInfo,
  PlateTitle,
  Price,
  PriceWrapper,
  WrapperAdvancedInfo,
  WrapperImage,
  WrapperPlateInfo,
} from './styles';

interface Photos {
  id: number;
  code: string;
}

interface ṔlateProps {
  name: string;
  description: string;
  price: number;
  source: string;
  orderID: number;
}

export function CardOrderInfo({source, name, description, price}: ṔlateProps) {
  const {token} = useAuth();

  const theme = useTheme();

  const {data, fetchData} = useFetch<Photos>(source, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  function priceConverter() {
    const priceWZeros = parseFloat(price.toString()).toFixed(2);
    const priceFormatted = priceWZeros.toString().replace('.', ',');
    return priceFormatted;
  }

  const priceFormatted = priceConverter();

  useEffect(() => {
    fetchData();
  }, [source]);

  return (
    <Container>
      <WrapperImage>
        <PlateImage
          source={data.code ? {uri: `${data.code}`} : theme.images.noImage}
        />
      </WrapperImage>

      <WrapperPlateInfo>
        <PlateTitle>{name}</PlateTitle>
        <PlateInfo>{description}</PlateInfo>

        <WrapperAdvancedInfo>
          <PriceWrapper>
            <Price>R$ {priceFormatted}</Price>
          </PriceWrapper>
        </WrapperAdvancedInfo>
      </WrapperPlateInfo>
    </Container>
  );
}
