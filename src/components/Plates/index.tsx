/* eslint-disable react-hooks/exhaustive-deps */
// import {useAuth} from '@global/context';
import {useAuth} from '@global/context';
import {useCreateCart} from '@global/context/Cart';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';
import {useDelete} from '../../global/services/delete';
import {useFetch} from '../../global/services/get';
import {usePut} from '../../global/services/put';

import {
  Container,
  WrapperImage,
  PlateImage,
  WrapperPlateInfo,
  PlateTitle,
  PlateInfo,
  WrapperAdvancedInfo,
  Price,
  AddButton,
  TextButton,
  WrapperCartButton,
  AddQuantityButton,
  AddQuantityButtonLabel,
  RemoveCartButton,
  RemoveQuantityButtonLabel,
  NumberOfQuantityWrapper,
  Number,
  LitterButton,
  LitterImage,
  PriceWrapper,
  CleanUpButton,
  CleanUpImage,
  CleanUpTitle,
  FavoriteButton,
  FavoriteImage,
  ContentContainer,
  PlateButton,
  DeleteView,
} from './styles';

interface ListPlatesProps {
  id: number;
  name: string;
  description: string;
  price: number;
  source: string;
  restaurantID?: number;
  restaurantFoodTypes?: string;
  restaurantName?: string;
  inside: boolean;
  photoRestaurant?: string;
  Swipe: boolean;
  favorite?: boolean;
}

interface Photos {
  id: number;
  code: string;
}

export interface ItemProps {
  id: number;
  quantity: number;
  price: number;
  restaurantID: number;
  name: string;
  description: string;
  source: string;
  restaurantFoodTypes?: string;
  restaurantName?: string;
  photoRestaurant?: string;
  unityPrice?: number;
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
export function Plates({
  name,
  description,
  price,
  source,
  restaurantID,
  id,
  restaurantFoodTypes,
  restaurantName,
  photoRestaurant,
  inside,
  Swipe,
  favorite,
  isButton,
}: ListPlatesProps) {
  const theme = useTheme();

  const {token} = useAuth();

  const {
    addProductToCart,
    removeProductFromCart,
    cart,
    addNewProductoCart,
    cleanUpSamePlates,
    paramsToOrderDetails,
  } = useCreateCart();

  const itemCount = cart.find((item: ItemProps) => item?.id === id)?.quantity;

  const {data, fetchData} = useFetch<Photos>(source, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  function priceConverter() {
    const priceWZeros = parseFloat(price.toString()).toFixed(2);
    const priceFormatted = priceWZeros.toString().replace('.', ',');
    return priceFormatted;
  }

  const priceFormatted = priceConverter();

  const leftSwipe = () => {
    return (
      <CleanUpButton onPress={() => cleanUpSamePlates(id, price)}>
        <DeleteView>
          <CleanUpImage source={theme.icons.cleanUp} />
          <CleanUpTitle>Remover</CleanUpTitle>
        </DeleteView>
      </CleanUpButton>
    );
  };

  useEffect(() => {
    fetchData();
  }, [source]);

  const [isFavorite, setIsFavorite] = useState<boolean>(
    favorite ? favorite : false,
  );

  const navigation = useNavigation();

  function handlerLikeButton() {
    if (isFavorite) {
      handlerDelete();
    } else {
      handlerPut();
    }
  }

  const {
    data: dataDelete,
    handlerDelete,
    error: errorDelete,
  } = useDelete(`/plate/favorite/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const {
    data: dataPut,
    handlerPut,
    error: errorPut,
  } = usePut<null, PutResponse>(`/plate/favorite/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  function likeButtonPressed() {
    setIsFavorite(!isFavorite);
    handlerLikeButton();
  }

  return Swipe ? (
    <PlateButton
      activeOpacity={0.9}
      onPress={() => {
        paramsToOrderDetails(
          name,
          price,
          description,
          source,
          id,
          restaurantFoodTypes,
          restaurantName,
          isFavorite,
          inside,
          restaurantID,
          photoRestaurant,
        );
        navigation.navigate('PlatesDetails' as never);
      }}>
      <ContentContainer>
        <Swipeable renderLeftActions={leftSwipe}>
          <Container>
            <WrapperImage>
              <PlateImage
                source={
                  data.code ? {uri: `${data.code}`} : theme.images.noImage
                }
              />
            </WrapperImage>

            <WrapperPlateInfo>
              <PlateTitle>{name}</PlateTitle>
              <PlateInfo numberOfLines={3}>{description}</PlateInfo>

              <WrapperAdvancedInfo>
                <PriceWrapper>
                  <Price>R$ {priceFormatted}</Price>
                </PriceWrapper>

                {itemCount && itemCount > 0 ? (
                  <WrapperCartButton
                    insideCart={inside ? RFValue(5) : RFValue(20)}>
                    <AddQuantityButton
                      onPress={() => addProductToCart(id, price, restaurantID)}>
                      <AddQuantityButtonLabel>+</AddQuantityButtonLabel>
                    </AddQuantityButton>

                    <NumberOfQuantityWrapper>
                      <Number>
                        {
                          cart.find((item: ItemProps) => item?.id === id)
                            ?.quantity
                        }
                      </Number>
                    </NumberOfQuantityWrapper>

                    {itemCount > 1 ? (
                      <RemoveCartButton
                        onPress={() => removeProductFromCart(id, price)}>
                        <RemoveQuantityButtonLabel>-</RemoveQuantityButtonLabel>
                      </RemoveCartButton>
                    ) : (
                      <RemoveCartButton
                        onPress={() => removeProductFromCart(id, price)}>
                        <RemoveQuantityButtonLabel>-</RemoveQuantityButtonLabel>
                      </RemoveCartButton>
                    )}
                  </WrapperCartButton>
                ) : (
                  <AddButton
                    onPress={() =>
                      addNewProductoCart(
                        id,
                        price,
                        restaurantID,
                        name,
                        description,
                        source,
                        restaurantFoodTypes,
                        restaurantName,
                        photoRestaurant,
                      )
                    }>
                    <TextButton>Adicionar</TextButton>
                  </AddButton>
                )}
              </WrapperAdvancedInfo>
            </WrapperPlateInfo>
          </Container>
        </Swipeable>
      </ContentContainer>
    </PlateButton>
  ) : (
    <PlateButton
      activeOpacity={0.9}
      onPress={() => {
        paramsToOrderDetails(
          name,
          price,
          description,
          source,
          id,
          restaurantFoodTypes,
          restaurantName,
          isFavorite,
          inside,
          restaurantID,
          photoRestaurant,
        );
        navigation.navigate('PlatesDetails' as never);
      }}>
      <Container>
        <FavoriteButton onPress={likeButtonPressed}>
          <FavoriteImage
            source={theme.icons.favorite}
            style={[
              isFavorite && {tintColor: theme.colors.background_red},
              {resizeMode: 'contain'},
            ]}
          />
        </FavoriteButton>

        <WrapperImage>
          <PlateImage
            source={data.code ? {uri: `${data.code}`} : theme.images.noImage}
          />
        </WrapperImage>

        <WrapperPlateInfo>
          <PlateTitle>{name}</PlateTitle>
          <PlateInfo numberOfLines={3}>{description}</PlateInfo>

          <WrapperAdvancedInfo>
            <PriceWrapper>
              <Price>R$ {priceFormatted}</Price>
            </PriceWrapper>

            {itemCount && itemCount > 0 ? (
              <WrapperCartButton insideCart={inside ? RFValue(5) : RFValue(35)}>
                <AddQuantityButton
                  onPress={() => addProductToCart(id, price, restaurantID)}>
                  <AddQuantityButtonLabel>+</AddQuantityButtonLabel>
                </AddQuantityButton>

                <NumberOfQuantityWrapper>
                  <Number>
                    {cart &&
                      cart.find((item: ItemProps) => item?.id === id)?.quantity}
                  </Number>
                </NumberOfQuantityWrapper>

                {itemCount && itemCount > 1 ? (
                  <RemoveCartButton
                    onPress={() => removeProductFromCart(id, price)}>
                    <RemoveQuantityButtonLabel>-</RemoveQuantityButtonLabel>
                  </RemoveCartButton>
                ) : (
                  <LitterButton
                    onPress={() => removeProductFromCart(id, price)}>
                    <LitterImage source={theme.icons.litter} />
                  </LitterButton>
                )}
              </WrapperCartButton>
            ) : (
              <AddButton
                onPress={() =>
                  addNewProductoCart(
                    id,
                    price,
                    restaurantID,
                    name,
                    description,
                    source,
                    restaurantFoodTypes,
                    restaurantName,
                    photoRestaurant,
                  )
                }>
                <TextButton>Adicionar</TextButton>
              </AddButton>
            )}
          </WrapperAdvancedInfo>
        </WrapperPlateInfo>
      </Container>
    </PlateButton>
  );
}
