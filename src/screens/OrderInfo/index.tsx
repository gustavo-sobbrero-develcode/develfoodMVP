import {RouteProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Keyboard, StatusBar, TouchableWithoutFeedback} from 'react-native';
import {EvaluationModal} from '@components/EvaluationModal';
import {FlatList} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';
import {CardOrderInfo} from '@components/CardOrderInfo';
import {HeaderComponent} from '@components/HeaderComponent';
import {useAuth} from '@global/context';
import {useFetch} from '@global/services/get';
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
        restaurantId: number;
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
  isEvaluated: boolean;
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

  const {name, photo_url, id, totalValue, date, status, restaurantId} =
    route.params;

  const [order, setOrder] = useState<RequestiItemsProps[]>([]);

  const [newStatus, setNewStatus] = useState(status);

  const [extraData, setExtraData] = useState(false);

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

  function onStatusSuccess(response: OrderProps) {
    setNewStatus(response.status);
    status !== 'PEDIDO_FINALIZADO' &&
      response.status !== 'PEDIDO_FINALIZADO' &&
      setExtraData(!extraData);
  }

  async function loadOrder() {
    await fetchData(onSuccess);
  }

  async function loadStatus() {
    await fetchData(onStatusSuccess);
  }

  const {data, fetchData: fetchPhoto} = useFetch<Photo>(photo_url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  function getStatus(status: string) {
    const statusText = {
      PEDIDO_REALIZADO: 'Aguardando aprovação',
      PEDIDO_EM_REALIZAÇÃO: 'Em Preparo',
      PEDIDO_À_CAMINHO: 'Em Rota',
      PEDIDO_FINALIZADO: 'Entregue',
    }[status];
    return statusText;
  }

  const statusText = getStatus(newStatus);

  function getStatusImage(status: string) {
    const statusImage = {
      PEDIDO_REALIZADO: theme.images.waiting,
      PEDIDO_EM_REALIZAÇÃO: theme.images.doing,
      PEDIDO_À_CAMINHO: theme.images.inRoute,
      PEDIDO_FINALIZADO: theme.images.delivered,
    }[status];
    return statusImage;
  }

  const statusImage = getStatusImage(newStatus);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      loadStatus();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [extraData]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={theme.colors.background_red}
        />

        <HeaderComponent
          backgroudColor={theme.colors.background_red}
          name={`Pedido N.° ${id}`}
          source={theme.icons.exitWhite}
          iconColor={theme.colors.icon_light}
          Textcolor={theme.colors.text_light}
          onPress={handlerBackHome}
        />

        <WrapperInfo>
          <PinImage source={theme.images.pin} />
          <MapImage source={theme.images.mapImage} />

          <WrapperAddresInfo>
            <SubTitle>Entregar em:</SubTitle>
            <Street>Rua Arcy da Rocha N., 559</Street>
            <Neighborhood>Jardim América</Neighborhood>
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
            <StatusImage source={statusImage} />

            <WrapperText>
              <StatusText numberOfLines={2}>{statusText}</StatusText>
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
        {status === 'PEDIDO_FINALIZADO' && (
          <EvaluationModal
            title="Deu bom?"
            description={
              'Obrigado por escolher nosso app, você faz toda a diferença. :D Agora, queremos saber o que você acha do nosso parceiro'
            }
            name={name}
            restaurantId={restaurantId}
            orderId={id}
          />
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
}
