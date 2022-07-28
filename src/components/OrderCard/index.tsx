import React, {useEffect} from 'react';
import {ImageSourcePropType} from 'react-native';
import {useTheme} from 'styled-components';
import {useAuth} from '@global/context';
import {useFetch} from '@global/services/get';
import {
  CheckOrders,
  Container,
  FoodOrderName,
  OrderN,
  OrderNumber,
  RestaurantName,
  RestaurantPhoto,
  StatusOrder,
  WrapperRestaurantInfo,
  WrapperInfoPoduct,
} from './styles';

interface OrderProps {
  photo_url: string;
  restaurantName: string;
  statusOrder: string;
  orderNumber: number;
  foodName: string[];
  onPress: () => void;
  restaurantID: number;
  source: ImageSourcePropType;
}

interface Photo {
  id: number;
  code: string;
}

export function OrderCard({
  photo_url,
  restaurantName,
  statusOrder,
  orderNumber,
  foodName,
  onPress,
  source,
}: OrderProps) {
  const {token} = useAuth();

  const theme = useTheme();

  const {data, fetchData} = useFetch<Photo>(photo_url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    fetchData();
  }, [photo_url]);
  return (
    <Container onPress={onPress}>
      <RestaurantPhoto
        source={
          data.code
            ? {
                uri: `${data.code}`,
              }
            : theme.images.noImage
        }
      />
      <WrapperRestaurantInfo>
        <RestaurantName>{restaurantName}</RestaurantName>
        <CheckOrders source={source} />
        <WrapperInfoPoduct>
          <StatusOrder>{statusOrder}</StatusOrder>
          <OrderN>N° </OrderN>
          <OrderNumber>{orderNumber}</OrderNumber>
        </WrapperInfoPoduct>
        <FoodOrderName numberOfLines={3}>{foodName}</FoodOrderName>
      </WrapperRestaurantInfo>
    </Container>
  );
}
