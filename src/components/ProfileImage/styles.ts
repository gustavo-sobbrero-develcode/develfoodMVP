import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  width: 100%;
  align-items: center;
`;
export const Content = styled.View`
  width: ${RFValue(129)}px;
  height: ${RFValue(159)}px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${RFValue(13)}px;
`;

export const Label = styled.Text`
  font-size: 14px;
  align-self: flex-start;
  margin-left: ${RFValue(11)}px;
`;

export const Image = styled.Image`
  width: ${RFValue(129)}px;
  height: ${RFValue(129)}px;
  align-self: center;
  background-color: ${({theme}) => theme.colors.card};
  border-radius: ${RFValue(65)}px;
  border: 2px solid ${({theme}) => theme.colors.icon_gray};
`;

export const NotFoundImage = styled.View`
  width: ${RFValue(129)}px;
  height: ${RFValue(129)}px;
  align-items: center;
  justify-content: center;
  align-self: center;
  background-color: ${({theme}) => theme.colors.card};
  border-radius: ${RFValue(65)}px;
  border: 2px solid ${({theme}) => theme.colors.text_gray};
`;

export const CameraIconView = styled.TouchableOpacity`
  position: absolute;
  bottom: ${RFValue(25)}px;
  right: ${RFValue(0)}px;
  width: ${RFValue(24)}px;
  align-items: center;
  justify-content: center;
  height: ${RFValue(24)}px;
  background-color: ${({theme}) => theme.colors.favorite_border};
  border-radius: ${RFValue(12)}px;
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.text_gray};
`;

export const CameraIcon = styled.Image``;
