import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
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

export const Description = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text_gray};
  margin-top: ${RFValue(8)}px;
  margin-bottom: ${RFValue(10)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(28)}px;
  font-weight: 500;
  margin-top: ${RFValue(82)}px;
  color: ${({ theme }) => theme.colors.text_dark};
`;
