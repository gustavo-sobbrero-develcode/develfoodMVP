import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.background_red};
  width: ${RFValue(99)}px;
  height: ${RFValue(28)}px;
  border-radius: ${RFValue(16)}px;
  justify-content: center;
  align-items: center;
  margin-right: ${RFValue(8)}px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.text_white};
  font-size: ${RFValue(12)}px;
`;
