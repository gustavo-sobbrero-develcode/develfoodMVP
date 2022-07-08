/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {RouteProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useTheme} from 'styled-components';
import {useDebouncedCallback} from 'use-debounce';
import {BackButton} from '../../components/BackButton';
import {CartComponent} from '../../components/CartComponent';
import {Input} from '../../components/Input';
import {ListEmptyComponent} from '../../components/ListEmptyComponent';
import {Plates} from '../../components/Plates';
import {useAuth} from '../../global/Context';
import {useCreateCart} from '../../global/Context/Cart';
import {useFetch} from '../../global/services/get';

import {
  Container,
  Header,
  FavoriteIconWrapper,
  IconButton,
  FavoriteIcon,
  WrapperRestaurantInfo,
  WrapperRestaurantTypes,
  NameRestaurant,
  TypeFood,
  WrapperPhoto,
  RestaurantPhoto,
  LineBetween,
  Content,
  Title,
  PlatesWrapper,
} from './styles';

interface Plate {
  id: number;
  name: string;
  description: string;
  price: number;
  photo_url: string;
}
interface Photo {
  id: number;
  code: string;
}

interface RouteParams {
  route: RouteProp<
    {
      params: {
        id: number;
        name: string;
        food_types: string;
        photo_url: string;
      };
    },
    'params'
  >;
}

export function RestaurantProfile({route}: RouteParams) {
  const navigation = useNavigation();

  const {id, name, photo_url, food_types} = route.params;

  const {token} = useAuth();

  const theme = useTheme();

  const [isPressed, setIsPressed] = useState(false);

  const [plate, setPlate] = useState<Plate[]>([]);

  const [filter, setFilter] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const {totalItems} = useCreateCart();

  const {fetchData} = useFetch<Plate[]>(
    `/plate/search?name=${filter}&restaurantid=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const {data, fetchData: fetchPhoto} = useFetch<Photo>(photo_url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  function onSuccess(response: Plate[]) {
    setPlate([...plate, ...response]);
  }

  async function loadPlates() {
    setIsLoading(true);
    await fetchData(onSuccess);
    setIsLoading(false);
  }

  function handleSearch(value: string) {
    setIsLoading(true);
    if (value.length > 1) {
      setPlate([]);
      setFilter(value);
    } else {
      setPlate([]);
      setFilter('');
    }
    setIsLoading(false);
  }

  const debounced = useDebouncedCallback(value => {
    handleSearch(value);
  }, 1500);

  function handlerBackButton() {
    navigation.navigate('Home' as never);
  }

  function handlerCheckoutScreen() {
    navigation.navigate('Checkout' as never);
  }

  const renderItem = ({item}: {item: Plate}) => {
    return (
      <PlatesWrapper>
        <Plates
          Swipe={false}
          inside={false}
          name={item.name}
          description={item.description}
          price={item.price}
          source={item.photo_url}
          restaurantID={id}
          id={item.id}
          restaurantFoodTypes={food_types}
          restaurantName={name}
          photoRestaurant={photo_url}
        />
      </PlatesWrapper>
    );
  };

  useEffect(() => {
    loadPlates();
    fetchPhoto();
  }, [filter]);

  return (
    <Container>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={theme.colors.background}
      />

      <Header>
        <BackButton onPressed={handlerBackButton} name="arrow" />

        <FavoriteIconWrapper>
          <IconButton onPress={() => setIsPressed(!isPressed)}>
            <FavoriteIcon
              source={theme.icons.favoriteRestaurant}
              style={
                isPressed ? {tintColor: theme.colors.background_red} : null
              }
            />
          </IconButton>
        </FavoriteIconWrapper>
      </Header>

      <WrapperRestaurantInfo>
        <WrapperRestaurantTypes>
          <NameRestaurant>{name}</NameRestaurant>
          <TypeFood>
            {food_types.charAt(0).toUpperCase() +
              food_types.slice(1).toLowerCase()}
          </TypeFood>
        </WrapperRestaurantTypes>

        <WrapperPhoto>
          <RestaurantPhoto
            source={
              data.code
                ? {
                    uri: `${data.code}`,
                  }
                : theme.images.noImage
            }
          />
        </WrapperPhoto>
      </WrapperRestaurantInfo>

      <LineBetween />

      <FlatList
        data={plate}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Content>
              <Title>Pratos</Title>

              <Input
                source={theme.icons.search}
                placeholder={`Buscar em ${name}`}
                keyboardType="email-address"
                onChangeText={value => debounced(value)}
              />
            </Content>
          </>
        }
        ListFooterComponent={() => (
          <View style={{height: 50, justifyContent: 'center'}}>
            {isLoading && (
              <ActivityIndicator color={theme.colors.background_red} />
            )}
          </View>
        )}
        renderItem={renderItem}
        ListEmptyComponent={
          !isLoading ? (
            <ListEmptyComponent
              source={theme.images.notFound}
              title="Nenhum prato encontrado"
            />
          ) : null
        }
      />
      {totalItems > 0 && (
        <CartComponent BottomBar={false} onPress={handlerCheckoutScreen} />
      )}
    </Container>
  );
}
