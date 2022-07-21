import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

interface PhotoIndexProps {
  active: boolean;
}

export const Container = styled.View``;

export const Banners = styled.View`
  padding-bottom: ${RFValue(7)}px;
  margin-top: ${RFValue(10)}px;
  width: ${Dimensions.get('window').width}px;
`;

export const Banner = styled.Image`
  margin-left: 6.5px;
  margin-right: 2.5px;
  height: 120px;
  width: ${RFPercentage(44)}px;
`;

export const PhotoIndexes = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
  gap: 8px;
  width: 100%;
  height: 14px;
`;

export const PhotoIndex = styled.View<PhotoIndexProps>`
  height: ${({active}) => (active ? 6 : 4)}px;
  width: ${({active}) => (active ? 6 : 4)}px;
  background-color: ${({theme, active}) =>
    active ? theme.colors.background_red : theme.colors.icon_slider};
  border-radius: 6px;
  margin: 0 5px;
`;
