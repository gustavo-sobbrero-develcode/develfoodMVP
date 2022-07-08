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

export const Text = styled.Text`
  font-family: ${({theme}) => theme.fonts.primaryMed};
  font-size: ${RFValue(12)}px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text_gray};
  margin-top: ${RFValue(5)}px;
  text-align: justify;
`;

export const WrapperText = styled.View`
  width: 100%;
`;

export const WrapperTitle = styled.View`
  width: 100%;
`;

export const SubTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.primaryMed};
  font-size: ${RFValue(23)}px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const Content = styled.View`
  margin-top: ${RFValue(35)}px;
  width: 100%;
  padding: 0 ${RFValue(50)}px;
  margin-bottom: ${RFValue(70)}px;
`;

export const WomanImage = styled.Image`
  margin-top: ${RFValue(90)}px;
`;
