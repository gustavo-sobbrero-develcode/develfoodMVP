/* eslint-disable @typescript-eslint/no-shadow */

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SectionList, StatusBar} from 'react-native';
import {useTheme} from 'styled-components';
import {ListEmptyComponent} from '../../components/ListEmptyComponent';
import {OrderCard} from '../../components/OrderCard';
import {useAuth} from '../../global/Context';
import {useFetch} from '../../global/services/get';
import moment from 'moment';
import 'moment/locale/pt-br';

import {
  Container,
  Content,
  OrderDate,
  SubTitle,
  WrapperInfo,
  Footer,
} from './styles';
import {useNavigation} from '@react-navigation/native';
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
    setIsLoading(false);
  }

  function handlerOrderInfo(
    name: string,
    photo_url: string,
    id: number,
    totalValue: number,
    date: Date,
    status: string,
  ) {
    navigation.navigate(
      'OrderInfo' as never,
      {name, photo_url, id, totalValue, date, status} as never,
    );
  }

  function getStatusImage(status: string) {
    var statusImage = {
      PEDIDO_REALIZADO: theme.icons.waitingorder,
      PEDIDO_EM_REALIZAÇÃO: theme.icons.deliveryorder,
      PEDIDO_À_CAMINHO: theme.icons.deliveryorder,
      PEDIDO_FINALIZADO: theme.icons.checkorder,
    }[status];
    return statusImage;
  }

  const renderItem = ({item}: {item: OrderProps}) => {
    const statusImage = getStatusImage(item.status);

    return item ? (
      <Content>
        <OrderCard
          restaurantID={item.restaurant.id}
          onPress={() =>
            handlerOrderInfo(
              item.restaurant.name,
              item.restaurant.photo_url,
              item.id,
              item.totalValue,
              item.date,
              item.status,
            )
          }
          photo_url={item.restaurant.photo_url}
          restaurantName={item.restaurant.name}
          statusOrder={
            item.status.charAt(0).toUpperCase() +
            item.status
              .slice(1)
              .toLowerCase()
              .replace('_', ' ')
              .replace('_', ' ')
          }
          orderNumber={item.id}
          foodName={listItems(item)}
          source={statusImage}
        />
      </Content>
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

  function handlerRefreshPage() {
    if (filter !== 0) {
      setOrder([]);
      setOrderSections([]);
      setFilter(0);
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }

  useEffect(() => {
    loadOrder();
  }, [filter]);

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
        <WrapperInfo>
          <SubTitle>Historico</SubTitle>
        </WrapperInfo>

        <SectionList
          sections={orderSections}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderItem({item})}
          renderSectionHeader={({section: {title}}) => (
            <OrderDate>{moment(title).format('llll').slice(0, -9)}</OrderDate>
          )}
          ListFooterComponent={() => (
            <Footer>
              <ActivityIndicator color={theme.colors.background_red} />
            </Footer>
          )}
          onEndReached={() => {
            handleLoadOnEnd();
          }}
          refreshing={isLoading}
          onRefresh={() => handlerRefreshPage()}
          ListEmptyComponent={
            !isLoading ? (
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
