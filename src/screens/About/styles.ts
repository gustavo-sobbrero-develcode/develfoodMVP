import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Content = styled.View`
  width: 100%;
  height: ${RFValue(100)}px;
  align-items: center;
  top: ${RFValue(10)}px;
`;

export const AboutTitle = styled.Text`
  text-align: center;
  font-size: ${RFValue(20)}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const AboutContent = styled.View`
  flex-direction: row;
`;

export const AboutText = styled.Text`
  top: ${RFValue(30)}px;
`;

export const WrapperImage = styled.View`
  width: ${RFValue(100)}px;
  height: ${RFValue(100)}px;
  border-radius: ${RFValue(50)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.background_red};
`;

export const LogoDevelFood = styled.Image``;

export const TimeText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text_dark};
  top: ${RFValue(60)}px;
`;

export const WrapperDevs = styled.ScrollView`
  flex-direction: row;
  position: absolute;
  width: 100%;
`;

export const TimeDevelfood = styled.Image`
  width: ${RFValue(400)}px;
  height: ${RFValue(400)}px;
  top: ${RFValue(90)}px;
`;
