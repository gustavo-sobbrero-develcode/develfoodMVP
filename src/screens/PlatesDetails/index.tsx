import {BackButton} from '@components/BackButton';
import { HeaderComponent } from '@components/HeaderComponent';
import {ItemProps} from '@components/Plates';
import { Image } from '@components/ProfileImage/styles';
import {useAuth} from '@global/context';
import {useCreateCart} from '@global/context/Cart';
import {useDelete} from '@global/services/delete';
import {useFetch} from '@global/services/get';
import {usePut} from '@global/services/put';
import theme from '@global/styles/theme';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {
  AddButton,
  AddQuantityButton,
  AddQuantityButtonLabel,
  Container,
  Description,
  FavoriteIcon,
  FoodType,
  HeaderView,
  HeartButton,
  LitterButton,
  LitterImage,
  Number,
  NumberOfQuantityWrapper,
  PlateInfoWrapper,
  PlateName,
  PlatePhoto,
  PlateTotalPrice,
  RemoveCartButton,
  RemoveQuantityButtonLabel,
  RestaurantIcon,
  RestaurantName,
  RestaurantWrapper,
  TextButton,
  ViewCart,
  ViewScroll,
  WrapperCartButton,
} from './styles';

interface Photos {
  id: number;
  code: string;
}

interface PutResponse {
  id: number;
  name: string;
  description: string;
  price: null;
  foodType: null;
  restaurantName: null;
  photo_url: string;
  favorite: null;
}

export function PlatesDetails() {
  const {
    addProductToCart,
    removeProductFromCart,
    cart,
    addNewProductoCart,
    plateData,
  } = useCreateCart();

  const navigation = useNavigation();

  function handlerBackButton() {
    navigation.goBack();
  }

  const {token} = useAuth();

  const {data: dataPhoto, fetchData} = useFetch<Photos>(plateData.source, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [isFavorite, setIsFavorite] = useState<boolean>(plateData.favorite);

  useEffect(() => {
    fetchData();
  }, [plateData.source]);

  const itemCount = cart.find(
    (item: ItemProps) => item?.id === plateData.id,
  )?.quantity;

  function priceConverter() {
    const multipliedValue = itemCount
      ? plateData.price * itemCount
      : plateData.price;
    const priceWZeros = parseFloat(multipliedValue.toString()).toFixed(2);
    const priceFormatted = priceWZeros.toString().replace('.', ',');
    return priceFormatted;
  }

  const priceTotalFormatted = priceConverter();

  function handlerLikeButton() {
    if (isFavorite) {
      handlerDelete();
    } else {
      handlerPut();
    }
  }
  const {handlerDelete} = useDelete(`/plate/favorite/${plateData.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const {handlerPut} = usePut<null, PutResponse>(
    `/plate/favorite/${plateData.id}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  function likeButtonPressed() {
    setIsFavorite(!isFavorite);
    handlerLikeButton();
  }

  return (
    <Container>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={theme.colors.background}
      />

<HeaderView>
        <HeaderComponent
          backgroudColor={theme.colors.background}
          name={''}
          source={theme.icons.arrow}
          iconColor={theme.colors.icon_dark}
          onPress={handlerBackButton}
          Textcolor={theme.colors.icon_dark}
        />
        <HeartButton onPress={likeButtonPressed}>
          <FavoriteIcon
            source={theme.icons.favoriteRestaurant}
            style={isFavorite && {tintColor: 'red'}}
          />
        </HeartButton>
      </HeaderView>

      <ScrollView>
        <ViewScroll>
          <PlateInfoWrapper>
            <PlatePhoto
              source={
                dataPhoto.code ? {uri: dataPhoto.code} : theme.images.noImage
              }
              resizeMode={'cover'}
            />
            <PlateName numberOfLines={1}>{plateData.name}</PlateName>
            <FoodType numberOfLines={1}>
              {plateData.restaurantFoodTypes}
            </FoodType>
            <Description>{plateData.description}</Description>

            <RestaurantWrapper>
              <RestaurantIcon
                source={theme.icons.restaurant}
                resizeMode={'contain'}
              />

              <RestaurantName numberOfLines={1}>
                Vendido e entregue por {plateData.restaurantName}
              </RestaurantName>
            </RestaurantWrapper>
          </PlateInfoWrapper>
        </ViewScroll>
      </ScrollView>
      <ViewCart>
        <PlateTotalPrice>R$ {priceTotalFormatted}</PlateTotalPrice>

        {itemCount && itemCount > 0 ? (
          <WrapperCartButton>
            <AddQuantityButton
              onPress={() =>
                addProductToCart(
                  plateData.id,
                  plateData.price,
                  plateData.restaurantID,
                )
              }>
              <AddQuantityButtonLabel>+</AddQuantityButtonLabel>
            </AddQuantityButton>

            <NumberOfQuantityWrapper>
              <Number>
                {cart &&
                  cart.find((item: ItemProps) => item?.id === plateData.id)
                    ?.quantity}
              </Number>
            </NumberOfQuantityWrapper>

            {itemCount && itemCount > 1 ? (
              <RemoveCartButton
                onPress={() =>
                  removeProductFromCart(plateData.id, plateData.price)
                }>
                <RemoveQuantityButtonLabel>-</RemoveQuantityButtonLabel>
              </RemoveCartButton>
            ) : (
              <LitterButton
                onPress={() =>
                  removeProductFromCart(plateData.id, plateData.price)
                }>
                <LitterImage
                  source={theme.icons.trash}
                  style={{tintColor: `${theme.colors.text_white}`}}
                  resizeMode={'contain'}
                />
              </LitterButton>
            )}
          </WrapperCartButton>
        ) : (
          <AddButton
            onPress={() =>
              addNewProductoCart(
                plateData.id,
                plateData.price,
                plateData.restaurantID,
                plateData.name,
                plateData.description,
                plateData.source,
                plateData.restaurantFoodTypes,
                plateData.restaurantName,
                plateData.photoRestaurant,
              )
            }>
            <TextButton>Adicionar</TextButton>
          </AddButton>
        )}
      </ViewCart>
    </Container>
  );
}
