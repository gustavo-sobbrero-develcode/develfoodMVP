import theme from '@global/styles/theme';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {
  Container,
  Image,
  CameraIcon,
  CameraIconView,
  Content,
  NotFoundImage,
} from './styles';

interface Props {
  url: string;
  onPress: () => void;
  loading: boolean;
}

export function ProfileImage({url, onPress, loading}: Props) {
  return (
    <>
      <Container>
        <Content>
          {loading ? (
            <NotFoundImage>
              <ActivityIndicator color={theme.colors.background_red} />
            </NotFoundImage>
          ) : (
            <Image
              source={{
                uri: `data:image/jpg;base64,${url}`,
              }}
            />
          )}
          <CameraIconView onPress={onPress} activeOpacity={0.9}>
            <CameraIcon source={theme.icons.camera} />
          </CameraIconView>
        </Content>
      </Container>
    </>
  );
}
