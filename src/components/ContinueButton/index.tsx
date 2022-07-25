import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'styled-components';
import {Container, Title} from './styles';

interface Props {
  title: string;
  onPressed: Function;
  loading?: boolean;
  disabled?: boolean | undefined;
}

export function ContinueButton({title, onPressed, loading, disabled}: Props) {
  const theme = useTheme();
  return (
    <Container
      activeOpacity={0.9}
      style={{
        backgroundColor: disabled
          ? theme.colors.text_gray
          : theme.colors.background_red,
      }}
      onPress={() => onPressed()}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator color={theme.colors.background} size={25} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  );
}
