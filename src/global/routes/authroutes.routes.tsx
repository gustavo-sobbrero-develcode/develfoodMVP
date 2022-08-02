import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {Login} from '@screens/loginScreens/Login';
import {Register} from '@screens/loginScreens/Register';
import {RegisterLocale} from '@screens/loginScreens/RegisterLocale';
import {RegisterSuccess} from '@screens/loginScreens/RegisterSuccess';
import {RegisterPersonalData} from '@screens/loginScreens/RegisterPersonalData';
import {ForgotPassword} from '@screens/loginScreens/RedefinePasswordScreens/ForgotPassword';
import {AuthCode} from '@screens/loginScreens/RedefinePasswordScreens/AuthCode/index';
import {RedefinePassword} from '@screens/loginScreens/RedefinePasswordScreens/RedefinePassword';
import {RedefineSuccess} from '@screens/loginScreens/RedefinePasswordScreens/RedefineSuccess';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

export function AuthRoutes() {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return (
    <>
      <Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_bottom',
        }}>
        <Screen name="Login" component={Login} />
        <Screen name="Register" component={Register} />
        <Screen name="RegisterPersonalData" component={RegisterPersonalData} />
        <Screen name="RegisterLocale" component={RegisterLocale} />
        <Screen name="RegisterSuccess" component={RegisterSuccess} />
        <Screen name="ForgotPassword" component={ForgotPassword} />
        <Screen name="AuthCode" component={AuthCode} />
        <Screen name="RedefinePassword" component={RedefinePassword} />
        <Screen name="RedefineSuccess" component={RedefineSuccess} />
      </Navigator>
    </>
  );
}
