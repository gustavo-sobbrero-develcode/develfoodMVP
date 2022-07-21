import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: ${RFValue(130)}px;
  height: ${RFValue(60)}px;
  border-radius: ${RFValue(30)}px;
  margin-right: ${RFValue(15)}px;
  align-items: center;
  background-color: ${({theme}) => theme.colors.devsBanner};
  flex-direction: row;
`;

export const WrapperName = styled.View`
  width: ${RFValue(55)}px;
  margin-left: ${RFValue(10)}px;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.text_white};
  font-size: ${RFValue(12)}px;
`;

export const WrapperImage = styled.View`
  margin-left: ${RFValue(5)}px;
`;

export const DevsImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(50)}px;
`;
