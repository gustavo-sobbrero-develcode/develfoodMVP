import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 ${RFValue(36)}px;
  margin-top: ${RFValue(12)}px;
  background-color: transparent;
  z-index: 1;
  align-items: center;
`;

export const StepBar = styled.View`
  flex-direction: row;
  height: ${RFValue(6)}px;
  margin-bottom: ${RFValue(56)}px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const SectionStep = styled.View`
  height: ${RFValue(5)}px;
  width: ${RFValue(70)}px;
  background-color: ${({theme}) => theme.colors.icon_gray};
  margin-right: ${RFValue(2)}px;
  border-radius: 8px;
  margin-left: ${RFValue(2)}px;
`;

export const SectionStepSelected = styled.View`
  height: ${RFValue(5)}px;
  width: ${RFValue(70)}px;
  background-color: ${({theme}) => theme.colors.background_red};
  margin-right: ${RFValue(2)}px;
  border-radius: 8px;
  margin-left: ${RFValue(2)}px;
`;

export const AuthText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.text_dark};
  padding-left: ${RFValue(10)}px;
  padding-right: ${RFValue(10)}px;
  margin-bottom: ${RFValue(57)}px;
`;

export const Description = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text_gray};
  margin-bottom: ${RFValue(25)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(28)}px;
  margin-top: ${RFValue(46)}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.text_dark};
`;
