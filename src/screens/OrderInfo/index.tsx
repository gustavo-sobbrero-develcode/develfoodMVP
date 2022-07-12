/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {RouteProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';
import {CardOrderInfo} from '../../components/CardOrderInfo';
import {HeaderComponent} from '../../components/HeaderComponent';
import {useAuth} from '../../global/Context';
import {useFetch} from '../../global/services/get';
import moment from 'moment';
import 'moment/locale/pt-br';

import {
  Container,
  MapImage,
  Neighborhood,
  RestaurantPhoto,
  Street,
  SubTitle,
  WrapperAddresInfo,
  WrapperInfo,
  WrapperRestaurantInfo,
  Restaurant,
  RestaurantName,
  WrapperName,
  WrapperCartPlates,
  WrapperPlates,
  LineBetween,
  DateCard,
  Day,
  Month,
  WrapperOrderInfo,
  StatusImage,
  WrapperText,
  StatusText,
  TotalValueWrapper,
  TotalValue,
  TotalText,
  WrapperPrice,
  R$Text,
  PinImage,
} from './styles';

interface RouteParams {
  route: RouteProp<
    {
      params: {
        name: string;
        photo_url: string;
        id: number;
        totalValue: number;
        date: Date;
        status: string;
      };
    },
    'params'
  >;
}
interface OrderProps {
  id: number;
  date: Date;
  totalValue: number;
  status: string;
  requestItems: RequestiItemsProps[];
}
interface RequestiItemsProps {
  id: number;
  plateDTO: {
    id: number;
    name: string;
    description: string;
    price: number;
    photo_url: string;
  };
  quantity: number;
  price: number;
  observation: string;
}
interface Photo {
  id: number;
  code: string;
}

export function OrderInfo({route}: RouteParams) {
  const theme = useTheme();

  const {token} = useAuth();

  const {name, photo_url, id, totalValue, date, status} = route.params;

  const [order, setOrder] = useState<RequestiItemsProps[]>([]);

  const navigation = useNavigation();

  function handlerBackHome() {
    navigation.navigate('Home' as never);
  }

  const {fetchData} = useFetch<OrderProps>(`/request/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  function onSuccess(response: OrderProps) {
    setOrder([...order, ...response.requestItems]);
  }

  async function loadOrder() {
    await fetchData(onSuccess);
  }

  const {data, fetchData: fetchPhoto} = useFetch<Photo>(photo_url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const renderItem = ({item}: {item: RequestiItemsProps}) => {
    return item ? (
      <WrapperCartPlates>
        <CardOrderInfo
          name={item.plateDTO.name}
          description={item.plateDTO.description}
          source={item.plateDTO.photo_url}
          price={item.plateDTO.price}
          quantity={item.quantity}
        />
      </WrapperCartPlates>
    ) : null;
  };

  function priceConverter() {
    const priceWZeros = parseFloat(totalValue.toString()).toFixed(2);
    const priceFormatted = priceWZeros.toString().replace('.', ',');
    return priceFormatted;
  }

  const priceFormatted = priceConverter();

  useEffect(() => {
    fetchPhoto();
    loadOrder();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        translucent={false}
        backgroundColor={theme.colors.background_red}
      />

      <HeaderComponent
        backgroudColor={theme.colors.background_red}
        name={`Pedido N° ${id}`}
        source={theme.icons.exitWhite}
        iconColor={theme.colors.icon_white}
        Textcolor={theme.colors.text_white}
        onPress={handlerBackHome}
      />

      <WrapperInfo>
        <PinImage source={theme.images.pin} />
        <MapImage source={theme.images.mapImage} />

        <WrapperAddresInfo>
          <SubTitle>Entregar em:</SubTitle>
          <Street>도산대로49길</Street>
          <Neighborhood>서울특별시 강남구 도산대로49길 22</Neighborhood>
        </WrapperAddresInfo>
        <DateCard>
          <Day>{moment(date).format('DD')}</Day>
          <Month>
            {moment(date).format('MMM').charAt(0).toUpperCase() +
              moment(date).format('MMM').slice(1).toLowerCase()}
          </Month>
        </DateCard>
      </WrapperInfo>

      <WrapperRestaurantInfo>
        <RestaurantPhoto
          source={
            data.code
              ? {
                  uri: `${data.code}`,
                }
              : theme.images.noImage
          }
        />
        <WrapperName>
          <Restaurant>Restaurante</Restaurant>
          <RestaurantName>{name}</RestaurantName>
        </WrapperName>
        <WrapperOrderInfo>
          <StatusImage
            source={
              status === 'PEDIDO_REALIZADO'
                ? theme.images.waiting
                : status === 'PEDIDO_EM_REALIZAÇÃO'
                ? theme.images.doing
                : status === 'PEDIDO_À_CAMINHO'
                ? theme.images.inRoute
                : status === 'PEDIDO_FINALIZADO'
                ? theme.images.delivered
                : null
            }
          />

          <WrapperText>
            <StatusText>
              {status === 'PEDIDO_REALIZADO'
                ? 'Aguardando aprovação'
                : status === 'PEDIDO_EM_REALIZAÇÃO'
                ? 'Em Preparo'
                : status === 'PEDIDO_À_CAMINHO'
                ? 'Em Rota'
                : status === 'PEDIDO_FINALIZADO'
                ? 'Entregue'
                : null}
            </StatusText>
          </WrapperText>
        </WrapperOrderInfo>
      </WrapperRestaurantInfo>

      <LineBetween />

      <WrapperPlates>
        <TotalValueWrapper>
          <TotalText>Total pago:</TotalText>
          <WrapperPrice>
            <R$Text>R$</R$Text>
            <TotalValue>{priceFormatted}</TotalValue>
          </WrapperPrice>
        </TotalValueWrapper>
      </WrapperPlates>

      <FlatList
        data={order}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={{
          width: '90%',
          marginRight: '10%',
          marginTop: RFValue(120),
        }}
      />
    </Container>
  );
}
