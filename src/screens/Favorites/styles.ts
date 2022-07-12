import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;

  background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  height: ${RFValue(56)}px;
  top: ${RFValue(22)}px;
`;

export const FavoriteIconWrapper = styled.View`
  width: ${RFValue(42)}px;
  height: ${RFValue(42)}px;
  position: absolute;
  right: ${RFValue(16)}px;
  align-items: center;
  justify-content: center;
`;

export const IconButton = styled.TouchableOpacity``;

export const FavoriteIcon = styled.Image`
  width: ${RFValue(26)}px;
  height: ${RFValue(22)}px;
  border-color: ${({theme}) => theme.colors.icon_red};
`;

export const Content = styled.View`
  justify-content: center;
  align-items: center;
  margin: 0 ${RFValue(12)}px;
  margin-top: ${RFValue(12)}px;
`;
