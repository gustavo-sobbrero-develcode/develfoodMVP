import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';
import {CheckoutComponent} from '@components/CheckoutComponent';
import {HeaderComponent} from '@components/HeaderComponent';
import {ListEmptyComponent} from '@components/ListEmptyComponent';
import {Plates} from '@components/Plates';
import {useAuth} from '@global/context';
import {useCreateCart} from '@global/context/Cart';
import {useFetch} from '@global/services/get';

import {
  Container,
  WrapperInfo,
  MapImage,
  WrapperAddresInfo,
  SubTitle,
  Street,
  Neighborhood,
  Content,
  LineBetween,
  WrapperInfoRestaurant,
  RestauratName,
  FoodType,
  WrapperPhoto,
  RestaurantPhoto,
  WrapperPlates,
  TitleCart,
  WrapperCartPlates,
  FooterComponent,
  PinImage,
} from './styles';

interface PlateProps {
  name: string;
  description: string;
  source: string;
  price: number;
  id: number;
  restaurantID: number;
  restaurantFoodTypes: string;
  restaurantName: string;
  unityPrice: number;
}

interface Photos {
  id: number;
  code: string;
  restaurantPhoto: string;
}

export function Checkout({
  source,
  restaurantName,
  restaurantFoodTypes,
}: PlateProps) {
  const theme = useTheme();

  const {token} = useAuth();

  const navigation = useNavigation();

  const {
    cart,
    restaurantId: id,
    nameRestaurant: name,
    foodTypes: food_types,
    restaurantPhoto: photo_url,
    loading,
  } = useCreateCart();

  function handlerBackHome() {
    navigation.goBack();
  }

  const {fetchData} = useFetch<Photos>(source, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const {data, fetchData: fetchPhoto} = useFetch<Photos>(photo_url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const renderItem = ({item}: {item: PlateProps}) => {
    return (
      <WrapperCartPlates>
        <Plates
          Swipe
          inside
          name={item.name}
          description={item.description}
          source={item.source ? item.source : theme.images.noImage}
          price={item.unityPrice}
          id={item.id}
          restaurantID={item.restaurantID}
          restaurantFoodTypes={restaurantFoodTypes}
          restaurantName={restaurantName}
          photoRestaurant={photo_url}
        />
      </WrapperCartPlates>
    );
  };

  const navigateToRestaurant = () => {
    navigation.navigate(
      'RestaurantProfile' as never,
      {
        id,
        name,
        photo_url,
        food_types,
      } as never,
    );
  };

  useEffect(() => {
    fetchData();
    fetchPhoto();
  }, [source, cart]);

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        translucent={false}
        backgroundColor={theme.colors.background_red}
      />

      <HeaderComponent
        backgroudColor={theme.colors.background_red}
        name="Compras"
        source={theme.icons.exitWhite}
        iconColor={theme.colors.icon_light}
        Textcolor={theme.colors.icon_light}
        onPress={handlerBackHome}
      />

      {cart.length > 0 ? (
        <>
          <WrapperInfo>
            <PinImage source={theme.images.pin} />

            <MapImage source={theme.images.mapImage} />

            <WrapperAddresInfo>
              <SubTitle>Entregar em:</SubTitle>
              <Street>도산대로49길</Street>
              <Neighborhood>서울특별시 강남구 도산대로49길 22</Neighborhood>
            </WrapperAddresInfo>
          </WrapperInfo>
          <Content>
            <LineBetween />

            <WrapperInfoRestaurant>
              <TouchableOpacity onPress={navigateToRestaurant}>
                <RestauratName>{name}</RestauratName>

                <FoodType>{food_types}</FoodType>
              </TouchableOpacity>
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
            </WrapperInfoRestaurant>
          </Content>
          <WrapperPlates>
            <TitleCart>Meus Itens</TitleCart>
          </WrapperPlates>
          <FlatList
            data={cart}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            style={{
              width: '90%',
              marginLeft: '10%',
              marginTop: RFValue(170),
            }}
            ListFooterComponent={() => <FooterComponent />}
          />
        </>
      ) : (
        <ListEmptyComponent
          source={theme.images.checkoutEmpty}
          title="Seu carrinho está vazio"
        />
      )}
      <CheckoutComponent loading={loading} />
    </Container>
  );
}
