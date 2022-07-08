import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const ButtonIcon = styled.TouchableOpacity`
  width: ${RFValue(20)}px;
  height: ${RFValue(30)}px;
  align-items: center;
  margin-left: ${RFValue(20)}px;
`;

export const Icon = styled.Image`
  width: ${RFValue(30)}px;
  height: ${RFValue(30)}px;
`;
