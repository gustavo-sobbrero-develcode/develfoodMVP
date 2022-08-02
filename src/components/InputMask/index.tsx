import React from 'react';

import {Container, LoginIcon, TextMask, Error} from './styles';

import {ImageSourcePropType, TextInputProps} from 'react-native';
import {useTheme} from 'styled-components';

interface Props extends TextInputProps {
  error?: string;
  editable: boolean;
  source: ImageSourcePropType;
  placeholder?: string;
  defaultValue?: string;
  onChangeText?: (value: string) => void;
  value?: string;
}

export function InputMask({
  error,
  editable,
  source,
  placeholder,
  onChangeText,
  defaultValue,
  value,
}: Props) {
  const theme = useTheme();
  return (
    <>
      <Container>
        <LoginIcon source={source} />

        <TextMask
          type="cel-phone"
          defaultValue={defaultValue}
          options={{maskType: 'BRL', withDDD: true, dddMask: '(99) '}}
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
