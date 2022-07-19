import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const View = styled.View``;

export const Container = styled.TouchableOpacity`
  width: ${RFValue(99)}px;
  height: ${RFValue(28)}px;
  border-radius: 25px;
  margin-right: ${RFValue(8)}px;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.background_red};
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.text_white};
  font-size: ${RFValue(12)}px;
`;
