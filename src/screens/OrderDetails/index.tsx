import {BackButton} from '@components/BackButton';
import {ListPlatesProps} from '@components/Plates';
import {useCreateCart} from '@global/context/Cart';
import theme from '@global/styles/theme';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {
  Container,
  Description,
  FavoriteIcon,
  FavoriteIconWrapper,
  FoodType,
  Header,
  IconButton,
  PlateInfoWrapper,
  PlateName,
  PlatePhoto,
  RestaurantIcon,
  RestaurantName,
  RestaurantWrapper,
} from './styles';

export function OrderDetails() {
  const navigation = useNavigation();

  console.log('id nos detalhes');

  function handlerBackButton() {
    navigation.goBack();
  }

  const {plateData} = useCreateCart();
  console.log('foto no OrderDetails:');

  const reference = require('../../global/assets/Images/camarao.png');

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
        <PlatePhoto source={{uri: plateData.data}} resizeMode={'contain'} />
        <PlateName numberOfLines={1}>{plateData.name}</PlateName>
        <FoodType numberOfLines={1}>{plateData.restaurantFoodTypes}</FoodType>
        <Description numberOfLines={3}>{plateData.description}</Description>
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
    </Container>
  );
}
