import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View.attrs({
  elevation: 10,
})`
  width: 100%;
  height: ${RFValue(103)}px;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${RFValue(18)}px;
  border-radius: ${RFValue(8)}px;
  background-color: ${({theme}) => theme.colors.background};
`;

export const WrapperImage = styled.View`
  left: ${RFValue(5)}px;
  margin: ${RFValue(5)}px;
`;

export const PlateImage = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
  border-radius: ${RFValue(8)}px;
`;

export const WrapperPlateInfo = styled.View`
  position: absolute;
  top: ${RFValue(10)}px;
  left: ${RFValue(95)}px;
  right: ${RFValue(20)}px;
`;

export const PlateTitle = styled.Text`
  text-align: justify;
  font-weight: 500;
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.icon_red};
`;

export const PlateInfo = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_gray};
`;

export const WrapperAdvancedInfo = styled.View`
  position: absolute;
  width: 100%;
  top: ${RFValue(62)}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const PriceWrapper = styled.View`
  width: ${RFValue(100)}px;
`;

export const Price = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text_dark};
`;
