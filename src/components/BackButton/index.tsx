import React from 'react';
import {useTheme} from 'styled-components';

import {Icon, ButtonIcon} from './styles';

interface Props {
  onPressed: Function;
  name: string;
}

export function BackButton({onPressed, name}: Props) {
  const theme = useTheme();
  return (
    <ButtonIcon onPress={() => onPressed()}>
      <Icon
        source={
          name === 'arrow'
            ? theme.icons.arrow
            : name === 'exit'
            ? theme.icons.exit
            : (name = 'exitwhite' ? theme.icons.exitWhite : null)
        }
      />
    </ButtonIcon>
  );
}
