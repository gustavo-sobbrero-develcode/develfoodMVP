/* eslint-disable prettier/prettier */
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 ${RFValue(42)}px;
`;

export const Title = styled.Text`
  text-align: center;
  margin-top: ${RFValue(33)}px;
  font-size: ${RFValue(24)}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const Description = styled.Text`
  margin-top: ${RFValue(22)}px;
  font-size: ${RFValue(12)}px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.text_gray};
  text-align: justify;
`;

export const RestaurantName = styled.Text`
  margin-top: ${RFValue(40)}px;
  font-size: ${RFValue(12)}px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.text_dark};
  text-align: justify;
`;
