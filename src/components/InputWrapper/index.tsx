import React from 'react';
import {Label, Container} from './styles';

interface Props {
  title: string;
  children: React.ReactNode;
}

export function InputWrapperComponent({title, children}: Props) {
  return (
    <>
      <Container>
        <Label>{title}</Label>
        {children}
      </Container>
    </>
  );
}
