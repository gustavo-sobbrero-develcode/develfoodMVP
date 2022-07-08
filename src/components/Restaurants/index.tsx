/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useTheme} from 'styled-components';
import {useAuth} from '../../global/Context';
import {useFetch} from '../../global/services/get';
import {
  Wrapper,
  Container,
  RestaurantImage,
  FavoriteIconWrapper,
  IconButton,
  FavoriteIcon,
  Content,
  TitleWrapper,
  Title,
  Description,
  SubTitle,
  Avaliation,
  StarRatio,
  NumberRatio,
} from './styled';

interface ListRestaurantProps {
  name: string;
  category: string;
  source: string;
  onPress: () => void;
  avaliation: number;
  id: number;
}

interface CardData {
  id: number;
  code: string;
}

export function Restaurants({
  name,
  category,
  source,
  onPress,
  avaliation,
}: ListRestaurantProps) {
  const theme = useTheme();

  const [isPressed, setIsPressed] = useState(false);

  const {token} = useAuth();

  const {data, fetchData} = useFetch<CardData>(source, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const {data: dataRatio, fetchData: fetchRatio} = useFetch<CardData>(
    `/restaurantEvaluation/${avaliation}/grade`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  function ratio() {
    if (dataRatio.toString() === '[object Object]') {
      return '-';
    } else {
      return dataRatio.toString();
    }
  }

  useEffect(() => {
    fetchData();
    fetchRatio();
  }, [source, dataRatio]);

  return (
    <Wrapper onPress={onPress} activeOpacity={0}>
      <Container>
        <RestaurantImage
          source={data.code ? {uri: `${data.code}`} : theme.images.noImage}
        />

        <FavoriteIconWrapper>
          <IconButton onPress={() => setIsPressed(!isPressed)}>
            <FavoriteIcon
              source={theme.icons.favoriteRestaurant}
              style={
                isPressed ? {tintColor: theme.colors.background_red} : null
              }
            />
          </IconButton>
        </FavoriteIconWrapper>
        <Content>
          <TitleWrapper>
            <Title>{name}</Title>
          </TitleWrapper>

          <Description>
            <SubTitle>{category}</SubTitle>

            <Avaliation>
              <StarRatio source={theme.icons.starRatio} />
              <NumberRatio>{ratio()}</NumberRatio>
            </Avaliation>
          </Description>
        </Content>
      </Container>
    </Wrapper>
  );
}
