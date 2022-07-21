import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const View = styled.View``;

export const WrapperDevs = styled.ScrollView`
  flex-direction: row;
`;

export const Container = styled.View`
  width: 35%;
  height: ${RFValue(60)}px;
  border-radius: ${RFValue(25)}px;
  margin-right: ${RFValue(8)}px;
  align-items: center;
  background-color: red;
  flex-direction: row;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.text_white};
  font-size: ${RFValue(12)}px;
  left: ${RFValue(10)}px;
`;

export const WrapperImage = styled.View`
  left: ${RFValue(20)}px;
`;

export const DevsImage = styled.Image`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(50)}px;
`;
