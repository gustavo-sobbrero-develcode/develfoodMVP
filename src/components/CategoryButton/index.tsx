import React, { useEffect, useState } from "react";
import { StyleSheet, TextProps, TouchableOpacityProps } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { useAuth } from "../../global/Context";
import { useFetch } from "../../global/services/get";
import theme from "../../global/styles/theme";
import { Container, Title, View } from "./styles";

interface Props {
  title: string;
  onPress: () => void;
  style: RectButtonProps["style"];
  textStyle: TextProps["style"];
}

export function Category({ title, style, textStyle, onPress, ...rest }: Props) {
  return (
    <Container onPress={onPress} activeOpacity={1} {...rest} style={style}>
      <Title style={textStyle}>{title}</Title>
    </Container>
  );
}


