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
  error?: string | null;
  editable?: boolean;
  source: ImageSourcePropType;
  placeholder?: string;
  keyboardType?: KeyboardType;
  sourcePassword?: boolean;
  onChangeText: (value: string) => void;
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
          secureTextEntry={sourcePassword && !isClicked}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
          maxLength={maxLength}
        />

        {sourcePassword && (
          <IconPassword onPress={() => updateSecureTextEntry()}>
            <LogoHide
              source={isClicked ? theme.icons.cleanEye : theme.icons.eye}
            />
          </IconPassword>
        )}
      </Container>
      {error && <Error>{error}</Error>}
    </>
  );
}
