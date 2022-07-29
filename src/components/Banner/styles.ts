import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

const BannerWidth = Dimensions.get('screen').width * 0.93;

export const BannerImage = styled.Image`
  margin-left: ${RFValue(5)}px;
  margin-right: 2.5px;
  height: ${RFValue(120)}px;
  width: ${BannerWidth}px;
  border-radius: 8px;
`;
