import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 ${RFValue(42)}px;
`;

export const Title = styled.Text`
  text-align: center;
  margin-top: ${RFValue(40)}px;
  font-size: ${RFValue(24)}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const Description = styled.Text`
  margin-top: ${RFValue(40)}px;
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

export const ObservationInput = styled.TextInput.attrs({
  multiline: true,
  numberOfLines: 8,
  placeholder: 'oi',
})`
  margin-top: ${RFValue(27)}px;
  border-color: ${({theme}) => theme.colors.text_gray};
  border-width: 1px;
  border-radius: 10px;
  height: 100px;
`;
