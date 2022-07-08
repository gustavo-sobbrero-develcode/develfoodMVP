import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(50)}px;
  background-color: ${({theme}) => theme.colors.background_red};
  align-items: center;
  justify-content: center;
  margin-top: ${RFValue(15)}px;
  border-radius: ${RFValue(10)}px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.primaryReg};
  color: ${({theme}) => theme.colors.text_white};
`;
