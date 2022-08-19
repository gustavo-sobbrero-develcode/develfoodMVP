import React, {useEffect, useState} from 'react';
import {useTheme} from 'styled-components';
import {ListEmptyComponent} from '@components/ListEmptyComponent';
import {HeaderComponent} from '@components/HeaderComponent';
import {ActivityIndicator, FlatList, StatusBar} from 'react-native';
import {Container, Footer} from './styles';
import {CouponCard} from '@components/CouponCard';
import axios, {AxiosError, AxiosResponse} from 'axios';

interface Coupon {
  _id: number;
  percentage: number;
  restaurantId: string;
  restaurantName: string;
  userId: string;
  createdAt: Date;
}

export function Coupons() {
  const theme = useTheme();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCoupons = async () => {
    setIsLoading(true);
    await axios
      .get('http://192.168.0.65:9001/develfood/all')
      .then((response: AxiosResponse) => {
        setCoupons([...coupons, ...response.data]);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    getCoupons();
  }, []);

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
            !isLoading ? (
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
