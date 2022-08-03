import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Content = styled.View`
  padding: ${RFValue(5)}px;
`;

export const UserInfo = styled.View.attrs({
  elevation: 5,
})`
  width: 100%;
  height: ${RFValue(100)}px;
  padding-top: ${RFValue(16)}px;
  padding-left: ${RFValue(16)}px;
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.background};
`;

export const UserPhotoNoPhoto = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: ${RFValue(64)}px;
  height: ${RFValue(64)}px;
  position: absolute;
  margin-left: ${RFValue(16)}px;
  margin-top: ${RFValue(16)}px;
  border-radius: ${RFValue(10)}px;
`;

export const UserPhoto = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: ${RFValue(64)}px;
  height: ${RFValue(64)}px;
  border-radius: ${RFValue(10)}px;
`;

export const UserInfoWrapper = styled.View`
  left: ${RFValue(24)}px;
  top: ${RFValue(7)}px;
`;

export const modalBackground = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
  align-items: center;
  justify-content: center;
`;

export const UserName = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const UserEditInfoWrapper = styled.View`
  top: ${RFValue(7)}px;
  flex-direction: row;
  align-items: center;
`;

export const UserEditInfoText = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({theme}) => theme.colors.text_gray};
`;

export const UserEditInfoButton = styled.TouchableOpacity`
  left: ${RFValue(6)}px;
`;

export const EditInfoIcon = styled.Image`
  width: ${RFValue(13.5)}px;
  height: ${RFValue(13.5)}px;
`;

export const ModalContent = styled.View`
  align-items: center;
`;

export const LogOutImage = styled.Image``;

export const MessageLogOut = styled.Text`
  text-align: center;
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text_dark};
  top: ${RFValue(15)}px;
`;

export const CloseModal = styled.TouchableOpacity`
  width: ${RFValue(200)}px;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(30)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.modalButtonClose};
  top: ${RFValue(25)}px;
`;

export const CloseModalText = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text_light};
`;

export const LogOutButton = styled.TouchableOpacity`
  width: ${RFValue(200)}px;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(30)}px;
  border: ${RFValue(1)}px;
  border-color: ${({theme}) => theme.colors.modalButtonClose};
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.card};
  top: ${RFValue(35)}px;
  margin-bottom: ${RFValue(40)}px;
`;

export const LogOutButtonText = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.icon_black};
`;
