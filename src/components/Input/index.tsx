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

interface Props extends TextInputProps {
  name?: string;
  error?: string;
  editable?: boolean;
  source: ImageSourcePropType;
  placeholder: string;
  keyboardType?: KeyboardType;
  sourcePassword?: ImageSourcePropType;
  onChangeText: (value: string) => void;
  value?: string;
  maxLength?: number;
}

export function Input({
  error,
  editable,
  source,
  placeholder,
  keyboardType,
  sourcePassword,
  onChangeText,
  value,
  maxLength,
}: Props) {
  const [isClicked, setIsClicked] = useState(false);

  function updateSecureTextEntry() {
    setIsClicked(!isClicked);
  }

  return (
    <>
      <Container>
        <LoginIcon source={source} />

        <InputLogin
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
