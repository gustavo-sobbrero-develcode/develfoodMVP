import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const CardHeight = Dimensions.get('window').height * 0.12;

export const Container = styled.View.attrs({elevation: 10})`
  height: ${CardHeight}px;
  width: 87%;
  background-color: ${({theme}) => theme.colors.card};
  align-self: center;
  margin-top: ${RFValue(18)}px;
  border-radius: ${RFValue(8)}px;
  flex-direction: row;
  justify-content: space-between;
  padding: ${RFValue(10)}px ${RFValue(10)}px;
`;

export const LeftWrapper = styled.View`
  width: 80%;
  justify-content: space-between;
`;

export const RestaurantName = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({theme}) => theme.colors.text_dark};
  font-weight: 700;
`;

export const Description = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({theme}) => theme.colors.text_gray};
  font-weight: 700;
`;

export const Percentage = styled.Text`
  font-size: ${RFValue(20)}px;
  font-weight: 500;
  width: 15%;
  color: #008000;
  align-self: center;
`;
