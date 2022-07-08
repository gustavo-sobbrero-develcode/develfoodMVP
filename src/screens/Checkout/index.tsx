/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';
import {CheckoutComponent} from '../../components/CheckoutComponent';
import {HeaderComponent} from '../../components/HeaderComponent';
import {ListEmptyComponent} from '../../components/ListEmptyComponent';
import {Plates} from '../../components/Plates';
import {useAuth} from '../../global/Context';
import {useCreateCart} from '../../global/Context/Cart';
import {useFetch} from '../../global/services/get';

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

  const {cart, nameRestaurant, foodTypes, restaurantPhoto} = useCreateCart();

  function handlerBackHome() {
    navigation.navigate('Home' as never);
  }

  const {fetchData} = useFetch<Photos>(source, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const {data, fetchData: fetchPhoto} = useFetch<Photos>(restaurantPhoto, {
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
          photoRestaurant={restaurantPhoto}
        />
      </WrapperCartPlates>
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
        iconColor={theme.colors.icon_white}
        Textcolor={theme.colors.text_white}
        onPress={handlerBackHome}
      />

      {cart.length > 0 ? (
        <>
          <WrapperInfo>
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
              <RestauratName>{nameRestaurant}</RestauratName>

              <FoodType>
                {foodTypes?.charAt(0).toUpperCase() +
                  foodTypes?.slice(1).toLowerCase()}
              </FoodType>

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
      <CheckoutComponent />
    </Container>
  );
}
