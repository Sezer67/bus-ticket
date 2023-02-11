import React from 'react';
import { formTypes } from '../types/index';

const useInputState = (): formTypes.InputHookType => {
  const [value, setValue] = React.useState<string>('');
  return { value, onChangeText: setValue };
};

export { useInputState };
