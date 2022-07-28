import React from 'react';

import {Container, LoginIcon, TextMask, Error} from './styles';

import {ImageSourcePropType, TextInputProps} from 'react-native';

interface Props extends TextInputProps {
  name: string;
  error?: string;
  editable: boolean;
  source: ImageSourcePropType;
  placeholder: string;
  onChangeText: (value: string) => void;
  value: string;
  onBlur: () => void;
}

export function InputMaskZipCode({
  error,
  editable,
  source,
  placeholder,
  onChangeText,
  value,
  onBlur,
}: Props) {
  return (
    <>
      <Container>
        <LoginIcon source={source} />

        <TextMask
          type="zip-code"
          placeholder={placeholder}
          autoCapitalize="none"
          onChangeText={onChangeText}
          value={value}
          editable={editable}
          onBlur={onBlur}
        />
      </Container>
      {error && <Error>{error}</Error>}
    </>
  );
}
