import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'styled-components';
import {Container, Title} from './styles';

interface Props {
  title: string;
  onPressed: Function;
  loading?: boolean;
}

export function ContinueButton({title, onPressed, loading}: Props) {
  const theme = useTheme();
  return (
    <Container onPress={() => onPressed()} activeOpacity={0.95}>
      {loading ? (
        <ActivityIndicator color={theme.colors.background} size={25} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  );
}
