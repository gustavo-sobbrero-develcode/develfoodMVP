import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';
import {Input} from '@components/Input';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {ContinueButton} from '@components/ContinueButton';
import {useCreateUser} from '@global/context/createUserAuth';
import {
  Image,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  Container,
  Wrapper,
  RowView,
  NicknameWrapper,
  CepWrapper,
  Content,
  StateWrapper,
  NumberWrapper,
  ButtonWrapper,
} from './styles';
import {
  CircleWrapper,
  CircleAdjust,
  Circle,
  CenterCircle,
} from '../Register/styles';
import {InputMaskZipCode} from '@components/InputMask/zipcode';
import {HeaderComponent} from '@components/HeaderComponent';
import {useState} from 'react';
import {useCep} from '@global/services/viaCEP';

interface FormData {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  state: string;
  nickname: string;
  cep: string;
}

interface CEPProps {
  endpoint: string;
}

const schema = Yup.object().shape({
  street: Yup.string().required('Rua é obrigatório.'),
  city: Yup.string().required('Cidade é obrigatória.'),
  neighborhood: Yup.string().required('Bairro é obrigatório.'),
  number: Yup.number()
    .required('Numero é obrigatório.')
    .typeError('Apenas numeros são aceitos'),
  cep: Yup.string().required('CEP é obrigatório.'),
  state: Yup.string().required('Estado é obrigatório.').uppercase(),
  nickname: Yup.string().required('Apelido é obrigatório.'),
});

export function RegisterLocale({route}: any) {
  const navigation = useNavigation();

  const {email, password, firstName, lastName, cpf, phone} = route.params;

  const theme = useTheme();

  const [cep, setCEP] = useState('');

  const {data: cepData, handleCEP} = useCep<CEPProps>(`/${cep}/json/`);

  const {loading, createUserAccount} = useCreateUser();

  function handlerBackButton() {
    navigation.goBack();
  }

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  function handleContinue() {
    const values = getValues();

    function onSuccess() {
      navigation.navigate('RegisterSuccess' as never);
    }

    const userInfo = {
      email,
      password,
      firstName,
      lastName,
      cpf,
      phone,
      photo: {
        code: '',
      },
      street: values.street,
      number: values.number,
      neighborhood: values.neighborhood,
      city: values.city,
      zipcode: values.cep,
      state: values.state,
      nickname: values.nickname,
    };

    createUserAccount(onSuccess, userInfo);
  }

  function handleCEPChange() {
    handleCEP();
  }

  useEffect(() => {
    setValue('street', cepData.logradouro);
    setValue('city', cepData.localidade);
    setValue('neighborhood', cepData.bairro);
    setValue('state', cepData.uf);
    setValue('cep', cep);
  }, [cepData]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <StatusBar
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
            <CenterCircle source={theme.icons.check} />
          </CircleAdjust>
          <CircleAdjust>
            <Circle source={theme.icons.circle} />
            <CenterCircle source={theme.icons.check} />
          </CircleAdjust>
          <CircleAdjust>
            <Circle source={theme.icons.circle} />
            <CenterCircle source={theme.icons.blankcircle} />
          </CircleAdjust>
        </CircleWrapper>

        <Image
          source={theme.icons.woman}
          style={{
            marginTop: RFValue(6),
            marginBottom: RFValue(20),
            alignSelf: 'center',
          }}
        />

        <Wrapper>
          <RowView>
            <NicknameWrapper>
              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, value}}) => (
                  <Input
                    editable={!loading}
                    error={errors.nickname && errors.nickname.message}
                    keyboardType="email-address"
                    placeholder="Apelido do End."
                    source={theme.icons.locale}
                    name="nickname"
                    onChangeText={onChange}
                    value={value}
                    maxLength={8}
                  />
                )}
                name="nickname"
              />
            </NicknameWrapper>

            <CepWrapper>
              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, value}}) => (
                  <InputMaskZipCode
                    source={theme.icons.locale}
                    name="cep"
                    error={errors.cep && errors.cep.message}
                    editable={!loading}
                    onChangeText={text => {
                      onChange;
                      setCEP(text);
                    }}
                    onBlur={() => handleCEPChange()}
                    value={value}
                    placeholder="CEP"
                  />
                )}
                name="cep"
              />
            </CepWrapper>
          </RowView>

          <Content>
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <Input
                  editable={!loading}
                  error={
                    cepData.logradouro
                      ? null
                      : errors.street && errors.street.message
                  }
                  keyboardType="email-address"
                  placeholder="Rua"
                  source={theme.icons.locale}
                  name="street"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="street"
            />

            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <Input
                  editable={!loading}
                  error={
                    cepData.localidade
                      ? null
                      : errors.city && errors.city.message
                  }
                  keyboardType="email-address"
                  placeholder="Cidade"
                  source={theme.icons.locale}
                  name="city"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="city"
            />

            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <Input
                  editable={!loading}
                  error={
                    cepData.logradouro
                      ? null
                      : errors.neighborhood && errors.neighborhood.message
                  }
                  keyboardType="email-address"
                  placeholder="Bairro"
                  source={theme.icons.locale}
                  name="neighborhood"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="neighborhood"
            />
          </Content>

          <RowView>
            <StateWrapper>
              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, value}}) => (
                  <Input
                    editable={!loading}
                    error={
                      cepData.uf ? null : errors.state && errors.state.message
                    }
                    keyboardType="email-address"
                    placeholder="Estado"
                    source={theme.icons.locale}
                    name="state"
                    onChangeText={onChange}
                    value={value}
                    maxLength={2}
                  />
                )}
                name="state"
              />
            </StateWrapper>
            <NumberWrapper>
              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, value}}) => (
                  <Input
                    editable={!loading}
                    error={errors.number && errors.number.message}
                    keyboardType="email-address"
                    placeholder="Numero"
                    source={theme.icons.locale}
                    name="number"
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="number"
              />
            </NumberWrapper>
          </RowView>
        </Wrapper>

        <ButtonWrapper>
          <ContinueButton
            title="Continuar"
            onPressed={handleSubmit(handleContinue)}
            loading={loading}
          />
        </ButtonWrapper>
      </Container>
    </TouchableWithoutFeedback>
  );
}
