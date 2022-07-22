import {BackButton} from '@components/BackButton';
import {ItemProps} from '@components/Plates';
import {useAuth} from '@global/context';
import {useCreateCart} from '@global/context/Cart';
import {useFetch} from '@global/services/get';
import theme from '@global/styles/theme';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  AddButton,
  AddQuantityButton,
  AddQuantityButtonImage,
  Container,
  Description,
  FavoriteIcon,
  FavoriteIconWrapper,
  FoodType,
  Header,
  IconButton,
  LitterButton,
  LitterImage,
  Number,
  NumberOfQuantityWrapper,
  PlateInfoWrapper,
  PlateName,
  PlatePhoto,
  PlateTotalPrice,
  RemoveCartButton,
  RemoveQuantityButtonImage,
  RestaurantIcon,
  RestaurantName,
  RestaurantWrapper,
  TextButton,
  ViewCart,
  WrapperCartButton,
} from './styles';

interface Photos {
  id: number;
  code: string;
}

export function OrderDetails() {
  const navigation = useNavigation();

  function handlerBackButton() {
    navigation.goBack();
  }

  const {plateData} = useCreateCart();

  const {token} = useAuth();

  const {data: dataPhoto, fetchData} = useFetch<Photos>(plateData.source, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    fetchData();
  }, [plateData.source]);

  function priceConverter() {
    const priceWZeros = parseFloat(plateData.price.toString()).toFixed(2);
    const priceFormatted = priceWZeros.toString().replace('.', ',');
    return priceFormatted;
  }

  const priceFormatted = priceConverter();

  const {
    addProductToCart,
    removeProductFromCart,
    cart,
    addNewProductoCart,
    cleanUpSamePlates,
    paramsToOrderDetails,
  } = useCreateCart();

  const itemCount = cart.find(
    (item: ItemProps) => item?.id === plateData.id,
  )?.quantity;

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
          <IconButton onPress={() => {}}>
            <FavoriteIcon source={theme.icons.favoriteRestaurant} />
          </IconButton>
        </FavoriteIconWrapper>
      </Header>

      <PlateInfoWrapper>
        <PlatePhoto
          source={dataPhoto.code ? {uri: dataPhoto.code} : theme.images.noImage}
          resizeMode={'contain'}
        />
        <PlateName numberOfLines={1}>{plateData.name}</PlateName>
        <FoodType numberOfLines={1}>{plateData.restaurantFoodTypes}</FoodType>
        <Description numberOfLines={10}>{plateData.description}</Description>

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

      <ViewCart>
        <PlateTotalPrice>R$ {priceFormatted}</PlateTotalPrice>

        {itemCount && itemCount > 0 ? (
          <WrapperCartButton
            insideCart={plateData.inside ? RFValue(5) : RFValue(20)}>
            <AddQuantityButton
              onPress={() =>
                addProductToCart(
                  plateData.id,
                  plateData.price,
                  plateData.restaurantID,
                )
              }>
              <AddQuantityButtonImage
                source={theme.icons.add}
                style={{tintColor: `${theme.colors.text_white}`}}
              />
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
                <RemoveQuantityButtonImage
                  source={theme.icons.remove}
                  style={{tintColor: `${theme.colors.text_white}`}}
                />
              </RemoveCartButton>
            ) : (
              <LitterButton
                onPress={() =>
                  removeProductFromCart(plateData.id, plateData.price)
                }>
                <LitterImage
                  source={theme.icons.litter}
                  style={{tintColor: `${theme.colors.text_white}`}}
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
