import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';
import {Input} from '@components/Input';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {ContinueButton} from '@components/ContinueButton';
import {useCreateUser} from '@global/context/createUserAuth';

import {
  Dimensions,
  Image,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  Container,
  CircleWrapper,
  CircleAdjust,
  Circle,
  CenterCircle,
  InputWrapper,
  ButtonWrapper,
  ModalMessage,
  ErrorImage,
} from './styles';
import api from '@global/services/api';
import {Modalize} from 'react-native-modalize';
import {HeaderComponent} from '@components/HeaderComponent';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  creationDate: Date;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um email válido.')
    .required('Email é obrigatório.'),
  password: Yup.string()
    .min(6, 'Minimo de 6 caracteres.')
    .required('Senha é obrigatória.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas devem ser identicas.')
    .required('Confirmação de senha é obrigatória.'),
});

export function Register() {
  const navigation = useNavigation();

  const theme = useTheme();

  const {handleSetPostData, loading} = useCreateUser();

  const [isLoading, setIsLoading] = useState(false);

  const modalizeRef = useRef<Modalize>(null);

  const ModalHeight = Dimensions.get('screen').height * 0.2;

  function handlerBackButton() {
    navigation.navigate('Login' as never);
  }

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (value: FormData) => {
    setIsLoading(true);
    await api
      .get(`/user/verify?email=${value.email}`)
      .then(() => {
        modalizeRef.current?.open();
      })
      .catch(() => {
        handleSetPostData({
          email: value.email,
          password: value.password,
          creationDate: new Date(),
        });
        navigation.navigate('RegisterPersonalData' as never);
      });
    setIsLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <StatusBar
          hidden={false}
          barStyle={theme.barStyles.dark}
          backgroundColor={theme.colors.background}
        />
        <HeaderComponent
          backgroudColor={theme.colors.background}
          name={'Cadastro'}
          source={theme.icons.arrow}
          iconColor={theme.colors.icon_black}
          onPress={handlerBackButton}
          Textcolor={theme.colors.icon_black}
        />
        <CircleWrapper>
          <CircleAdjust>
            <Circle source={theme.icons.circle} />
            <CenterCircle source={theme.icons.blankcircle} />
          </CircleAdjust>
          <CircleAdjust>
            <Circle source={theme.icons.circle} />
            <CenterCircle source={theme.icons.blankcircle} />
          </CircleAdjust>
          <CircleAdjust>
            <Circle source={theme.icons.circle} />
            <CenterCircle source={theme.icons.blankcircle} />
          </CircleAdjust>
        </CircleWrapper>
        <Image
          source={theme.icons.womanleft}
          style={{marginTop: RFValue(6), marginBottom: RFValue(26)}}
        />

        <InputWrapper>
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

          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, value}}) => (
              <Input
                editable={!loading}
                error={errors.password && errors.password.message}
                keyboardType="default"
                placeholder="senha"
                source={theme.icons.password}
                name="password"
                onChangeText={onChange}
                value={value}
                sourcePassword
              />
            )}
            name="password"
          />

          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, value}}) => (
              <Input
                editable={!loading}
                error={errors.confirmPassword && errors.confirmPassword.message}
                keyboardType="default"
                placeholder="confirmar senha"
                source={theme.icons.password}
                name="password"
                onChangeText={onChange}
                value={value}
                sourcePassword
              />
            )}
            name="confirmPassword"
          />
        </InputWrapper>

        <ButtonWrapper>
          <ContinueButton
            title="Continuar"
            onPressed={handleSubmit(onSubmit)}
            loading={isLoading}
          />
        </ButtonWrapper>
        <Modalize
          modalHeight={ModalHeight}
          ref={modalizeRef}
          modalStyle={{backgroundColor: theme.colors.background}}>
          <ErrorImage source={theme.images.error} />
          <ModalMessage>E-mail já cadastrado no Develfood...</ModalMessage>
        </Modalize>
      </Container>
    </TouchableWithoutFeedback>
  );
}
