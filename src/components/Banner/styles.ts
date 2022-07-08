import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const BannerImage = styled.Image`
margin-left: ${RFValue(5)}px;
margin-right: 2.5px;
height: ${RFValue(120)}px;
width: ${RFPercentage(51)}px;
border-radius: 8px;
`;