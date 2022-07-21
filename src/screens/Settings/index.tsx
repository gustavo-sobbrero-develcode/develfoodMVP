import React from 'react';
import {StatusBar} from 'react-native';
import theme from '@global/styles/theme';
import {Container, Header} from './styles';

export function Settings() {
  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={theme.colors.background_red}
      />
      <Header />
    </Container>
  );
}
