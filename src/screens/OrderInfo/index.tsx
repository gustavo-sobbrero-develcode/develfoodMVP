/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {RouteProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StatusBar} from 'react-native';
import {useTheme} from 'styled-components';
import {CardOrderInfo} from '../../components/CardOrderInfo';
import {HeaderComponent} from '../../components/HeaderComponent';
import {useAuth} from '../../global/Context';
import {useFetch} from '../../global/services/get';
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
} from './styles';

interface RouteParams {
  route: RouteProp<
    {
      params: {
        name: string;
        photo_url: string;
        id: number;
      };
    },
    'params'
  >;
}

interface PlateProps {
  name: string;
  description: string;
  source: string;
  id: number;
  unityPrice: number;
}

interface Photo {
  id: number;
  code: string;
}

export function OrderInfo({route}: RouteParams, {source}: PlateProps) {
  const theme = useTheme();

  const {token} = useAuth();

  const {name, photo_url, id} = route.params;

  const [order, setOrder] = useState<any[]>([]);

  const navigation = useNavigation();

  function handlerBackHome() {
    navigation.navigate('Home' as never);
  }

  const {fetchData} = useFetch<any[]>(`/request/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  function onSuccess(response: any) {
    setOrder([...order, ...response.content]);
  }

  async function loadOrder() {
    await fetchData(onSuccess);
  }

  const {fetchData: fetchPhotoFood} = useFetch<Photo>(source, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const {data, fetchData: fetchPhoto} = useFetch<Photo>(photo_url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const renderItem = ({item}: {item: PlateProps}) => {
    return (
      <WrapperCartPlates>
        <CardOrderInfo
          name={item.name}
          description={item.description}
          price={item.unityPrice}
          source={item.source ? item.source : theme.images.noImage}
          orderID={id}
        />
      </WrapperCartPlates>
    );
  };

  useEffect(() => {
    fetchPhoto();
    fetchPhotoFood();
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
        <MapImage source={theme.images.mapImage} />

        <WrapperAddresInfo>
          <SubTitle>Entregar em:</SubTitle>
          <Street>도산대로49길</Street>
          <Neighborhood>서울특별시 강남구 도산대로49길 22</Neighborhood>
        </WrapperAddresInfo>
        <DateCard>
          <Day>05</Day>
          <Month>Jul</Month>
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
          <StatusImage source={theme.images.waiting} />

          <WrapperText>
            <StatusText>Aguardando aprovação</StatusText>
          </WrapperText>
        </WrapperOrderInfo>
      </WrapperRestaurantInfo>

      <LineBetween />

      <WrapperPlates />

      <FlatList
        data={order}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        style={{
          width: '90%',
          marginRight: '10%',
        }}
      />
    </Container>
  );
}
