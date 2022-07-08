import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const WrapperIcon = styled.View`
  align-items: center;
  justify-content: center;
  bottom: ${RFValue(-5)}px;
`;

export const ButtonIcon = styled.TouchableOpacity``;

export const IconImage = styled.Image``;

export const Title = styled.Text`
  font-size: ${RFValue(12)}px;
  text-align: center;
  color: ${({theme}) => theme.colors.icon_gray};
  font-family: ${({theme}) => theme.fonts.primaryReg};
  bottom: ${RFValue(3)}px;
`;
