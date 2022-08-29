import React, {useEffect, useState} from 'react';
import {useTheme} from 'styled-components';
import {ListEmptyComponent} from '@components/ListEmptyComponent';
import {HeaderComponent} from '@components/HeaderComponent';
import {ActivityIndicator, FlatList, StatusBar} from 'react-native';
import {Container, Footer} from './styles';
import {CouponCard} from '@components/CouponCard';
import axios, {AxiosResponse} from 'axios';
import {useFetch} from '@global/services/get';
import {UserID} from '@global/context/Cart';
import {useAuth} from '@global/context';

interface Coupon {
  _id: number;
  percentage: number;
  restaurantId: string;
  restaurantName: string;
  userId: string;
  createdAt: Date;
}

export function Coupons() {
  const {token} = useAuth();
  const theme = useTheme();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {data, fetchData} = useFetch<UserID>('/auth', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const getCoupons = async () => {
    await axios
      .get(
        `https://3780-2804-14c-7d86-961f-7a32-7028-136e-6935.sa.ngrok.io/develfood/${data.id}`,
      )
      .then((response: AxiosResponse) => {
        setCoupons([...coupons, ...response.data]);
      })
      .catch(() => {});
    setIsLoading(false);
  };

  async function loadData() {
    await fetchData();
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (data.id) {
      getCoupons();
    }
  }, [data]);

  const renderItem = ({item}: {item: Coupon}) => {
    return (
      item && (
        <CouponCard
          restaurantName={item.restaurantName}
          id={item._id}
          percentage={item.percentage}
        />
      )
    );
  };

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        translucent={false}
        backgroundColor={theme.colors.background_red}
      />

      <HeaderComponent
        backgroudColor={theme.colors.background_red}
        name="Meus Cupons"
        Textcolor={theme.colors.text_light}
      />

      <Container>
        <FlatList
          data={coupons}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => renderItem({item})}
          ListEmptyComponent={
            !isLoading && coupons !== [] ? (
              <ListEmptyComponent
                source={theme.images.noFavorites}
                title="Você não possui cupons Develfood"
              />
            ) : null
          }
          ListFooterComponent={() => (
            <Footer>
              {isLoading && (
                <ActivityIndicator color={theme.colors.background_red} />
              )}
            </Footer>
          )}
        />
      </Container>
    </>
  );
}
