import {BackButton} from '@components/BackButton';
import {ListPlatesProps} from '@components/Plates';
import {useCreateCart} from '@global/context/Cart';
import theme from '@global/styles/theme';
import {useNavigation} from '@react-navigation/native';
import {Text} from '@screens/loginScreens/RegisterSuccess/styles';
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

export function OrderDetails({id}: ListPlatesProps) {
  const navigation = useNavigation();

  console.log('id nos detalhes', id);

  function handlerBackButton() {
    navigation.goBack();
  }

  const {plateData} = useCreateCart();
  console.log('dataprice no OrderDetails:', plateData.price);

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
        <PlatePhoto source={reference} resizeMode={'contain'} />
        <PlateName numberOfLines={1}>Prato de camarão e fritas</PlateName>
        <FoodType numberOfLines={1}>Almoço</FoodType>
        <Description numberOfLines={3}>
          Um prato de camarão com fritas que é uma ótima opção para pedir quando
          se está com a família
        </Description>
        <RestaurantWrapper>
          <RestaurantIcon
            source={theme.icons.restaurant}
            resizeMode={'contain'}
          />
          <RestaurantName numberOfLines={1}>
            Vendido e entregue por nome_restaurante
          </RestaurantName>
        </RestaurantWrapper>
      </PlateInfoWrapper>
    </Container>
  );
}
