import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
  align-items: center;
`;

export const ContentScroll = styled.ScrollView`
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
`;

export const ContentScrollContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.background};
  padding-bottom: ${RFValue(30)}px;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  height: ${RFValue(56)}px;
`;

export const PerfilImage = styled.Image`
  width: ${RFValue(129)}px;
  height: ${RFValue(129)}px;
  align-self: center;
  background-color: aliceblue;
  border-radius: ${RFValue(129)}px;
  margin-bottom: ${RFValue(30)}px;
  border-width: 2px;
  border-color: ${({theme}) => theme.colors.text_gray};
`;

export const ModalContent = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.card};
  align-items: center;
  justify-content: center;
  padding-top: ${RFValue(30)}px;
  padding-bottom: 100%;
`;

export const ModalTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text_dark};
  margin-bottom: ${RFValue(20)}px;
`;

export const PickPhoto = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 60%;
  height: ${RFValue(60)}px;
  border-radius: ${RFValue(15)}px;
  background-color: ${({theme}) => theme.colors.background_red};
`;

export const TakePhoto = styled.TouchableOpacity`
  width: 60%;
  align-items: center;
  justify-content: center;
  height: ${RFValue(60)}px;
  margin-top: ${RFValue(20)}px;
  border-radius: ${RFValue(15)}px;
  background-color: ${({theme}) => theme.colors.background_red};
`;

export const ButtonText = styled.Text`
  font-size: ${RFValue(20)}px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text_light};
`;

export const TittleWrapper = styled.View`
  margin-left: ${RFValue(105)}px;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.primaryMed};
  font-size: ${RFValue(17)}px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const CircleWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;

export const CircleAdjust = styled.View`
  align-items: center;
  justify-content: space-around;
`;

export const Circle = styled.Image``;

export const CenterCircle = styled.Image`
  position: absolute;
  top: ${RFValue(4)}px;
`;

export const InputWrapper = styled.View``;

export const Wrapper = styled.View`
  z-index: 1;
`;

export const ButtonWrapper = styled.View`
  width: 100%;
`;

export const RowView = styled.View`
  flex-direction: row;
`;

export const NicknameWrapper = styled.View`
  width: 56%;
  margin-right: 2%;
`;

export const CepWrapper = styled.View`
  width: 42%;
`;

export const Content = styled.View``;

export const StateWrapper = styled.View`
  width: 48%;
  margin-right: 2%;
`;

export const NumberWrapper = styled.View`
  width: 48%;
  margin-left: 2%;
`;
