import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: ${RFValue(30)}px;
  position: absolute;
  z-index: 1;
  right: ${RFValue(15)}px;
  top: ${RFValue(15)}px;
  width: 92px;
`;

export const Content = styled.TouchableOpacity`
  height: ${RFValue(30)}px;
  width: ${RFValue(30)}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: ${RFValue(15)}px;
  top: ${RFValue(15)}px;
`;

export const ModalizeContent = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({theme}) => theme.colors.background};
`;

export const ThemeContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 20px 50px 5px 50px;
  background-color: ${({theme}) => theme.colors.background};
`;

export const ThemeContent = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
`;

export const ThemeText = styled.Text`
  color: ${({theme}) => theme.colors.icon_black};
  font-weight: 700;
  font-size: ${RFValue(14)}px;
`;

export const ThemeTitle = styled.Text`
  color: ${({theme}) => theme.colors.icon_black};
  font-weight: 700;
  margin-top: ${RFValue(10)}px;
  font-size: ${RFValue(18)}px;
`;
