import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const UserInfo = styled.View.attrs({
  elevation: 5,
})`
  top: ${RFValue(20)}px;
  width: 100%;
  height: ${RFValue(81)}px;
  padding-top: ${RFValue(16)}px;
  padding-left: ${RFValue(16)}px;
  flex-direction: row;
`;

export const UserPhoto = styled.Image`
  width: ${RFValue(64)}px;
  height: ${RFValue(64)}px;
  border-radius: ${RFValue(10)}px;
`;

export const UserInfoWrapper = styled.View`
  left: ${RFValue(24)}px;
  top: ${RFValue(7)}px;
`;

export const UserName = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const UserEditInfoWrapper = styled.View`
  top: ${RFValue(7)}px;
  flex-direction: row;
`;

export const UserEditInfoText = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({theme}) => theme.colors.text_gray};
`;

export const UserEditInfoButton = styled.TouchableOpacity`
  left: ${RFValue(6)}px;
`;

export const EditInfoIcon = styled.Image``;

export const ModalContent = styled.View`
  align-items: center;
`;

export const ButtonModal = styled.TouchableOpacity``;
