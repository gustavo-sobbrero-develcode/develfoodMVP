import React, {useState} from 'react';
import {useTheme} from 'styled-components';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';

import {
  Alert,
  Image,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  Container,
  Content,
  Title,
  Description,
  StepBar,
  SectionStepSelected,
  SectionStep,
} from './styles';
import {Input} from '@components/Input';
import {ContinueButton} from '@components/ContinueButton';
import {HeaderComponent} from '@components/HeaderComponent';
import {useRedefinePassword} from '@global/context/RedefinePassword';
import api from '@global/services/api';

interface FormData {
  email: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um email válido.')
    .required('Email é obrigatório.'),
});

export function ForgotPassword() {
  const theme = useTheme();

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const {setToken} = useRedefinePassword();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (value: FormData) => {
    setLoading(true);
    await api
      .post(`reset-password?email=${value.email}`)
      .then(response => {
        setToken(response.data.slice(39));
        navigation.navigate('AuthCode' as never);
      })
      .catch(() => {
        Alert.alert('Email não encontrado.');
      });
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <>
          <StatusBar
            backgroundColor={theme.colors.background}
            barStyle={theme.barStyles.dark}
          />
          <HeaderComponent
            backgroudColor={theme.colors.background}
            name="Recuperação de Senha"
            Textcolor={theme.colors.text_dark}
            source={theme.icons.arrow}
            iconColor={theme.colors.icon_black}
            onPress={() => navigation.navigate('Login' as never)}
          />
          <Content>
            <StepBar>
              <SectionStepSelected />
              <SectionStep />
              <SectionStep />
            </StepBar>
            <Image source={theme.images.forgotPassword} />

            <Title>Esqueceu sua senha?</Title>
            <Description>
              Não se preocupe, isso acontece! Por favor, insira seu e-mail para
              podermos lhe ajudar
            </Description>

            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <Input
                  editable={!loading}
                  error={errors.email && errors.email.message}
                  keyboardType="email-address"
                  placeholder="exemplo@email.com"
                  source={theme.icons.email}
                  name="email"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />

            <ContinueButton
              onPressed={handleSubmit(onSubmit)}
              loading={loading}
              title="Confirmar"
            />
          </Content>
        </>
      </Container>
    </TouchableWithoutFeedback>
  );
}
