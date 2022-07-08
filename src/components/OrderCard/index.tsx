/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from 'styled-components';
import {useAuth} from '../../global/Context';
import {useFetch} from '../../global/services/get';
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
  foodName: string;
  onPress: () => void;
  restaurantID: number;
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
    <TouchableOpacity onPress={onPress} activeOpacity={0}>
      <Container>
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
          <CheckOrders source={theme.icons.checkOrders} />
          <WrapperInfoPoduct>
            <StatusOrder>{statusOrder}</StatusOrder>
            <OrderN>N° </OrderN>
            <OrderNumber>{orderNumber}</OrderNumber>
          </WrapperInfoPoduct>
          <FoodOrderName>{foodName}</FoodOrderName>
        </WrapperRestaurantInfo>
      </Container>
    </TouchableOpacity>
  );
}
