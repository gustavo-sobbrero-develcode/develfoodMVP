import React from 'react';

import {Container, LoginIcon, TextMask, Error} from './styles';

import {ImageSourcePropType, TextInputProps} from 'react-native';
import {useTheme} from 'styled-components';

interface Props extends TextInputProps {
  error?: string;
  editable: boolean;
  source: ImageSourcePropType;
  placeholder: string;
  onChangeText: (value: string) => void;
  value: string;
}

export function InputMaskZipCode({
  error,
  editable,
  source,
  placeholder,
  onChangeText,
  value,
}: Props) {
  const theme = useTheme();
  return (
    <>
      <Container>
        <LoginIcon source={source} />

        <TextMask
          type="zip-code"
          placeholder={placeholder}
          autoCapitalize="none"
          placeholderTextColor={theme.colors.text_gray}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
        />
      </Container>
      {error && <Error>{error}</Error>}
    </>
  );
}
