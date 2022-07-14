import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDebouncedCallback} from 'use-debounce';
import {Category} from '../../components/CategoryButton';
import {HeaderComponent} from '../../components/HeaderComponent';
import {Input} from '../../components/Input';
import {ListEmptyComponent} from '../../components/ListEmptyComponent';
import {Plates} from '../../components/Plates';
import {useAuth} from '../../global/Context';
import {useFetch} from '../../global/services/get';
import theme from '../../global/styles/theme';
import {CategorySelect} from '../Home/styles';
import {Plate} from '../RestaurantProfile';
import {PlatesWrapper} from '../RestaurantProfile/styles';
import {Container, Content, Footer} from './styles';

interface FavoritesResponse {
  content: Plate[];
  totalPages: number;
}

export function Favorites() {
  const [isLoading, setIsLoading] = useState(false);

  const {token} = useAuth();

  const [isFiltred, setIsFiltred] = useState({
    text: '',
    page: 0,
  });

  const {
    data: dataFavorites,
    fetchData,
    loading: loadingFavorite,
  } = useFetch<FavoritesResponse>(
    `/plate/favoritePlates/search?page=${isFiltred.page}&quantity=10&plateName=${isFiltred.text}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const [favoritePlates, setFavoritePlates] = useState<Plate[]>([]);

  function onSuccess(dataFavorites: FavoritesResponse) {
    setFavoritePlates([...favoritePlates, ...dataFavorites.content]);
  }

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
  }, [isFiltred]);

  async function loadRestaurants() {
    setIsLoading(true);
    await fetchData(onSuccess);
    setIsLoading(false);
  }

  function handleSearch(value: string) {
    setIsLoading(true);
    if (value.length > 1) {
      setFavoritePlates([]);
      setIsFiltred({text: value, page: 0});
    } else {
      setFavoritePlates([]);
      setIsFiltred({text: '', page: 0});
    }
    setIsLoading(false);
  }

  const debounced = useDebouncedCallback(value => {
    handleSearch(value);
  }, 1500);
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
          favorite={item.favorite}
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
                onChangeText={value => debounced(value)}
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
        ListFooterComponent={() =>
          isLoading ? (
            <Footer>
              <ActivityIndicator color={theme.colors.background_red} />
            </Footer>
          ) : null
        }
        ListEmptyComponent={
          !isLoading ? (
            <ListEmptyComponent
              source={theme.images.noFavorites}
              title="Você não possui favoritos"
            />
          ) : null
        }
      />
    </Container>
  );
}
