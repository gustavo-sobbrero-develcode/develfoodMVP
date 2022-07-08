import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';
import {BackButton} from '../../../components/BackButton';
import {Input} from '../../../components/Input';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {ContinueButton} from '../../../components/ContinueButton';
import {useCreateUser} from '../../../global/Context/createUserAuth';

import {
  Image,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  Container,
  Header,
  TittleWrapper,
  Title,
  CircleWrapper,
  CircleAdjust,
  Circle,
  CenterCircle,
  Wrapper,
  RowView,
  NicknameWrapper,
  CepWrapper,
  Content,
  StateWrapper,
  NumberWrapper,
  ButtonWrapper,
} from './styles';
import {InputMaskZipCode} from '../../../components/InputMask/zipcode';

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

interface CreateUserAddress {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  state: string;
  nickname: string;
}

interface CreateUserAccount {
  email: string;
  password: string;
  creationDate: Date;
  role?: {
    id: number;
  };
  costumer?: {
    firstName?: string;
    lastName?: string;
    cpf?: string;
    phone?: string;
    photo?: {
      code: string;
    };
    address?: CreateUserAddress[];
  };
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

export function RegisterLocale() {
  const navigation = useNavigation();

  const theme = useTheme();

  const {handleSetPostData, loading, createUserAccount, postData} =
    useCreateUser();

  function handlerBackButton() {
    navigation.navigate('RegisterPersonalData' as never);
  }

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (value: FormData) => {
    handleSetPostData({
      ...postData,
      costumer: {
        ...postData.costumer,
        address: [
          {
            street: value.street,
            city: value.city,
            number: value.number,
            neighborhood: value.neighborhood,
            zipCode: value.cep,
            state: value.state,
            nickname: value.nickname,
          },
        ],
      },
    });
    function createUserSuccess(data: CreateUserAccount) {
      data && navigation.navigate('RegisterSuccess' as never);
    }
    await createUserAccount(createUserSuccess, postData);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        <Header>
          <BackButton onPressed={handlerBackButton} name="arrow" />
          <TittleWrapper>
            <Title>Cadastro</Title>
          </TittleWrapper>
        </Header>
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
          style={{marginTop: RFValue(6), marginBottom: RFValue(20)}}
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
                    error={errors.cep && errors.cep.message}
                    editable={!loading}
                    onChangeText={onChange}
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
                  error={errors.street && errors.street.message}
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
                  error={errors.city && errors.city.message}
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
                  error={errors.neighborhood && errors.neighborhood.message}
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
                    error={errors.state && errors.state.message}
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
            onPressed={handleSubmit(onSubmit)}
            loading={loading}
          />
        </ButtonWrapper>
      </Container>
    </TouchableWithoutFeedback>
  );
}
