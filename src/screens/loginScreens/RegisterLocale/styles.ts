import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
  align-items: center;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  height: ${RFValue(56)}px;
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

export const Wrapper = styled.View`
  padding: 0 ${RFValue(30)}px;
  z-index: 1;
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

export const ButtonWrapper = styled.View`
  width: 100%;
  padding: 0 ${RFValue(30)}px;
  margin-top: ${RFValue(-10)}px;
`;
