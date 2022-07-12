import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {BackButton} from '../../components/BackButton';
import {Category} from '../../components/CategoryButton';
import {HeaderComponent} from '../../components/HeaderComponent';
import {Input} from '../../components/Input';
import {Plates} from '../../components/Plates';
import {useAuth} from '../../global/Context';
import {useFetch} from '../../global/services/get';
import theme from '../../global/styles/theme';
import {CategorySelect} from '../Home/styles';
import {Plate} from '../RestaurantProfile';
import {PlatesWrapper} from '../RestaurantProfile/styles';
import {
  Container,
  Content,
  FavoriteIcon,
  FavoriteIconWrapper,
  Header,
  IconButton,
} from './styles';

interface FavoritesResponse {
  content: FavoritePlate[];
  totalPages: number;
}
interface FavoritePlate {
  id: number;
  name: string;
  description: string;
  price: number;
  foodType: FoodType;
  restaurantName: string;
  photo_url: string;
}

interface FoodType {
  id: number;
  name: string;
}

export function Favorites() {
  const [isLoading, setIsLoading] = useState(false);
  const {token} = useAuth();
  const [isFiltred, setIsFiltred] = useState({
    page: 0,
  });
  const {
    data: dataFavorites,
    fetchData,
    loading: loadingFavorite,
  } = useFetch<FavoritesResponse>(
    `/plate/favoritePlates?page=${isFiltred.page}&quantity=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const [favoritePlates, setFavoritePlates] = useState<FavoritePlate[]>([]);

  function onSuccess(dataFavorites: FavoritesResponse) {
    setFavoritePlates([...favoritePlates, ...dataFavorites.content]);
  }

  // console.log(data);

  async function handleLoadOnEnd() {
    if (dataFavorites.totalPages !== isFiltred.page) {
      setIsFiltred({...isFiltred, page: isFiltred.page + 1});
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    loadRestaurants();
  }, [isFiltred.page]);

  async function loadRestaurants() {
    setIsLoading(true);
    await fetchData(onSuccess);
    setIsLoading(false);
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
          // restaurantID={id}
          id={item.id}
          // restaurantFoodTypes={food_types}
          // restaurantName={name}
          // photoRestaurant={photo_url}
        />
      </PlatesWrapper>
    );
  };

  return (
    <Container>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={theme.colors.background}
      />
      <View style={{marginTop: 20}}>
        <HeaderComponent
          backgroudColor="#ffffff"
          name="Favoritos"
          Textcolor="#2b2b2e"
          source={theme.icons.arrow}
        />
      </View>

      <FlatList
        ListHeaderComponent={
          <View style={{marginBottom: RFValue(30)}}>
            <Content>
              <Input
                source={theme.icons.search}
                placeholder="Buscar restaurante"
                keyboardType="email-address"
                onChangeText={() => {}}
              />
            </Content>
            <CategorySelect
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <Category title="Pizza" />
              <Category title="Churrasco" />
              <Category title="Almoço" />
              <Category title="Massas" />
              <Category title="Coreana" />
              <Category title="Japonesa" />
              <Category title="Tailandesa" />
              <Category title="Chinesa" />
            </CategorySelect>
          </View>
        }
        data={favoritePlates}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onEndReached={() => {
          handleLoadOnEnd();
        }}
      />
    </Container>
  );
}
