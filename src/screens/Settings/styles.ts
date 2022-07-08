import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;

  background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(148)}px;

  background-color: ${({theme}) => theme.colors.header};
`;

export const BannerWrapper = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {paddingLeft: 12},
})`
  top: ${RFValue(20)}px;
`;

export const Banner = styled.Image`
  margin-right: ${RFValue(8)}px;
`;
