/* eslint-disable @typescript-eslint/no-shadow */

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, SectionList, StatusBar} from 'react-native';
import {useTheme} from 'styled-components';
import {ListEmptyComponent} from '../../components/ListEmptyComponent';
import {OrderCard} from '../../components/OrderCard';
import {useAuth} from '@global/context';
import {useFetch} from '../../global/services/get';
import moment from 'moment';
import 'moment/locale/pt-br';

import {Container, OrderDate, SubTitle, WrapperInfo, Footer} from './styles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {HeaderComponent} from '../../components/HeaderComponent';

interface PlateDTOResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  foodType: ListFoodType;
  restaurantName: string;
  photo_url: string;
}

interface RequestItemsResponse {
  id: number;
  plateDTO: PlateDTOResponse;
  quantity: number;
  price: number;
  observation: string;
}

interface ListFoodType {
  id: number;
  name: string;
}

interface RestaurantProps {
  id: number;
  name: string;
  photo_url: string;
  food_types: ListFoodType[];
}

interface OrderProps {
  id: number;
  restaurant: RestaurantProps;
  date: Date;
  dateLastUpdate: Date;
  totalValue: number;
  paymentType: string;
  status: string;
  requestItems: RequestItemsResponse[];
}

interface OrderResponse {
  content: OrderProps[];
  totalPages: number;
}

interface SectionListData {
  title: Date;
  data: OrderProps[];
}

interface HandleOrderInfoProps {
  name: string;
  photo_url: string;
  id: number;
  totalValue: number;
  date: Date;
  status: string;
  restaurantId: number;
}

export function Orders() {
  const {token} = useAuth();

  const theme = useTheme();

  const [filter, setFilter] = useState(0);

  const navigation = useNavigation();

  const [order, setOrder] = useState<OrderProps[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [orderSections, setOrderSections] = useState<SectionListData[]>([]);

  const {data, fetchData} = useFetch<OrderResponse>(
    `request/costumer?page=${filter}&quantity=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  function onSuccess(response: OrderResponse) {
    setOrder([...order, ...response.content]);
    setIsLoading(false);
  }

  async function loadOrder() {
    setIsLoading(true);
    await fetchData(onSuccess);
  }

  function handlerOrderInfo({
    name,
    photo_url,
    id,
    totalValue,
    date,
    status,
    restaurantId,
  }: HandleOrderInfoProps) {
    navigation.navigate(
      'OrderInfo' as never,
      {
        name,
        photo_url,
        id,
        totalValue,
        date,
        status,
        restaurantId,
      } as never,
    );
  }

  function getStatusImage(status: string) {
    const statusImage = {
      PEDIDO_REALIZADO: theme.icons.waitingorder,
      PEDIDO_EM_REALIZAÇÃO: theme.icons.doingorder,
      PEDIDO_À_CAMINHO: theme.icons.deliveryorder,
      PEDIDO_FINALIZADO: theme.icons.checkorder,
    }[status];
    return statusImage;
  }

  const renderItem = ({item}: {item: OrderProps}) => {
    const statusImage = getStatusImage(item.status);

    return item ? (
      <OrderCard
        restaurantID={item.restaurant.id}
        onPress={() =>
          handlerOrderInfo({
            name: item.restaurant.name,
            photo_url: item.restaurant.photo_url,
            id: item.id,
            totalValue: item.totalValue,
            date: item.date,
            status: item.status,
            restaurantId: item.restaurant.id,
          })
        }
        photo_url={item.restaurant.photo_url}
        restaurantName={item.restaurant.name}
        statusOrder={
          item.status.charAt(0).toUpperCase() +
          item.status.slice(1).toLowerCase().replace('_', ' ').replace('_', ' ')
        }
        orderNumber={item.id}
        foodName={listItems(item)}
        source={statusImage}
      />
    ) : null;
  };

  function sectionDataFormatter(data: OrderProps[]) {
    const orderFormatted: SectionListData[] = [];
    data.forEach((order: OrderProps) => {
      const sectionFound = orderFormatted.find(
        (historicSection: SectionListData) =>
          historicSection.title === order.date,
      );
      if (sectionFound) {
        sectionFound.data.push(order);
      } else {
        orderFormatted.push({
          title: order.date,
          data: [order],
        });
      }
    });
    setOrderSections(orderFormatted);
  }

  const listItems = (item: OrderProps) => {
    let quantityVisible = item.requestItems.map(
      (requestItem: RequestItemsResponse, index) => {
        if (requestItem.quantity > 1) {
          return index !== 0
            ? ' + ' + requestItem.quantity + ' ' + requestItem.plateDTO.name
            : requestItem.quantity + ' ' + requestItem.plateDTO.name;
        } else {
          return index !== 0
            ? ' + ' + requestItem?.plateDTO.name
            : requestItem?.plateDTO.name;
        }
      },
    );
    return quantityVisible;
  };

  async function handleLoadOnEnd() {
    if (data.totalPages !== filter) {
      setFilter(filter + 1);
    }
  }

  useEffect(() => {
    filter !== 0 && loadOrder();
  }, [filter]);

  useFocusEffect(
    useCallback(() => {
      loadOrder();
      return () => {
        setOrder([]);
        setFilter(0);
        setOrderSections([]);
      };
    }, []),
  );

  useEffect(() => {
    data.content && sectionDataFormatter([...order, ...data.content]);
  }, [data]);

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        translucent={false}
        backgroundColor={theme.colors.background_red}
      />

      <HeaderComponent
        backgroudColor={theme.colors.background_red}
        name="Meus Pedidos"
        Textcolor={theme.colors.text_white}
      />

      <>
        <SectionList
          sections={orderSections}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderItem({item})}
          renderSectionHeader={({section: {title}}) => (
            <OrderDate>{moment(title).format('llll').slice(0, -9)}</OrderDate>
          )}
          ListHeaderComponent={
            data.totalPages > 0 ? (
              <WrapperInfo>
                <SubTitle>Historico</SubTitle>
              </WrapperInfo>
            ) : null
          }
          ListFooterComponent={() => (
            <Footer>
              {isLoading && (
                <ActivityIndicator color={theme.colors.background_red} />
              )}
            </Footer>
          )}
          onEndReached={() => {
            handleLoadOnEnd();
          }}
          refreshing={isLoading}
          ListEmptyComponent={
            !isLoading && data.totalPages === 0 ? (
              <ListEmptyComponent
                source={theme.images.noOrder}
                title="Você ainda não fez nenhum pedido"
              />
            ) : null
          }
        />
      </>
    </Container>
  );
}
