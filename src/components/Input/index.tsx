import React from 'react';
import {useState} from 'react';

import {
  Container,
  InputLogin,
  LoginIcon,
  Error,
  IconPassword,
  LogoHide,
} from './styles';

import {ImageSourcePropType, KeyboardType, TextInputProps} from 'react-native';
import {useTheme} from 'styled-components';

interface Props extends TextInputProps {
  name?: string;
  error?: string;
  editable?: boolean;
  source: ImageSourcePropType;
  placeholder?: string;
  keyboardType?: KeyboardType;
  sourcePassword?: ImageSourcePropType;
  onChangeText?: (value: string) => void;
  value?: string;
  maxLength?: number;
  defaultValue?: string;
}

export function Input({
  error,
  editable,
  source,
  placeholder,
  keyboardType,
  sourcePassword,
  onChangeText,
  defaultValue,
  value,
  maxLength,
}: Props) {
  const [isClicked, setIsClicked] = useState(false);

  function updateSecureTextEntry() {
    setIsClicked(!isClicked);
  }

  const theme = useTheme();

  return (
    <>
      <Container>
        <LoginIcon source={source} />

        <InputLogin
          selectTextOnFocus
          placeholderTextColor={theme.colors.text_gray}
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoCapitalize="none"
          keyboardType={keyboardType}
          secureTextEntry={!isClicked}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
          maxLength={maxLength}
        />

        {sourcePassword && (
          <IconPassword onPress={() => updateSecureTextEntry()}>
            <LogoHide source={sourcePassword} />
          </IconPassword>
        )}
      </Container>
      {error && <Error>{error}</Error>}
    </>
  );
}
