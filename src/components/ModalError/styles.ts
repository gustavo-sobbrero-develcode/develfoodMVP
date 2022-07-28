import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const ModalContent = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: ${RFValue(30)}px;
`;

export const ModalTitle = styled.Text`
  font-size: ${RFValue(16)}px;
  text-align: center;
  font-size: 20px;
  margin-left: 40;
  margin-right: 40;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text_dark};
  margin-bottom: ${RFValue(20)}px;
`;

export const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-top: ${RFValue(20)}px;
  width: 60%;
  height: ${RFValue(60)}px;
  border-radius: ${RFValue(15)}px;
  background-color: ${({theme}) => theme.colors.background_red};
`;

export const ButtonText = styled.Text`
  font-size: ${RFValue(20)}px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text_white};
`;
