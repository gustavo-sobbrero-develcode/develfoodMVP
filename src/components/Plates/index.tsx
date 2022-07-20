/* eslint-disable react-hooks/exhaustive-deps */
// import {useAuth} from '@global/context';
import {useAuth} from '@global/context';
import {useCreateCart} from '@global/context/Cart';
import {useNavigation} from '@react-navigation/native';
import {OrderDetails} from '@screens/OrderDetails';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';
import {number} from 'yup';
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
  AddQuantityButtonImage,
  RemoveCartButton,
  RemoveQuantityButtonImage,
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
} from './styles';

export interface ListPlatesProps {
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
  favorite: any;
  isTouchable?: boolean;
}

interface Photos {
  id: number;
  code: string;
}

interface ItemProps {
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
  isTouchable,
}: ListPlatesProps) {
  const theme = useTheme();

  const {token} = useAuth();

  const {
    addProductToCart,
    removeProductFromCart,
    cart,
    addNewProductoCart,
    cleanUpSamePlates,
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
        <View style={styles.deleteBox}>
          <CleanUpImage source={theme.icons.cleanUp} />
          <CleanUpTitle>Remover</CleanUpTitle>
        </View>
      </CleanUpButton>
    );
  };

  useEffect(() => {
    fetchData();
  }, [source]);

  const favoriteWhite = require('../../global/assets/Icons/favoriteRestaurant.png');

  const [isFavorite, setIsFavorite] = useState<boolean>(favorite);

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
  } = useDelete<any>(`/plate/favorite/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const {
    data: dataPut,
    handlerPut,
    error: errorPut,
  } = usePut<any, PutResponse>(`/plate/favorite/${id}`, undefined, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  function onpressss() {
    setIsFavorite(!isFavorite);
    handlerLikeButton();
  }
  const navigation = useNavigation();

  function goToOrderDetails(id: number) {
    navigation.navigate('OrderDetails' as never, {id} as never);
  }

  return Swipe ? (
    <PlateButton activeOpacity={0.9} onPress={() => goToOrderDetails(id)}>
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
                      <AddQuantityButtonImage source={theme.icons.add} />
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
                        <RemoveQuantityButtonImage
                          source={theme.icons.remove}
                        />
                      </RemoveCartButton>
                    ) : (
                      <RemoveCartButton
                        onPress={() => removeProductFromCart(id, price)}>
                        <RemoveQuantityButtonImage
                          source={theme.icons.remove}
                        />
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
    <PlateButton activeOpacity={0.8} onPress={() => goToOrderDetails(id)}>
      <Container>
        <FavoriteButton onPress={onpressss}>
          <FavoriteImage
            source={favoriteWhite}
            style={isFavorite && {tintColor: 'red'}}
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
              <WrapperCartButton insideCart={inside ? RFValue(5) : RFValue(20)}>
                <AddQuantityButton
                  onPress={() => addProductToCart(id, price, restaurantID)}>
                  <AddQuantityButtonImage source={theme.icons.add} />
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
                    <RemoveQuantityButtonImage source={theme.icons.remove} />
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

const styles = StyleSheet.create({
  deleteBox: {
    backgroundColor: '#FF0000',
    height: RFValue(103),
    borderRadius: RFValue(8),
    width: RFValue(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
