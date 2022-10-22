import { useState } from 'react';

export const usePhoneNumber = (params) => {
  const { required = false, maskPhone = '# ### ###-##-##', maskCharacter = '#', } = params;
  const [unformattedPhone, setUnformattedPhone] = useState('');
  const [formattedPhone, setFormattedPhone] = useState('');
  const [message, setMessage] = useState({
    type: 'label',
    text: 'Вводите номер, он будет отформатирован',
  });

  const allowedChars = /^[0-9+]$/;

  const maskLength = maskPhone.match(new RegExp(maskCharacter, 'g')).length;

  const splitFirstPlus = (str) => {
    let firstPlus = '';
    if (str[0] === '+') {
      firstPlus = '+';
      str = str.slice(1);
    };
    return [firstPlus, str];
  }

  const parsePhone = str => {
    const [firstPlus, newStr] = splitFirstPlus(str)
    const numbers = newStr.match(/\d/g);
    return firstPlus + (numbers ? numbers.join('') : '');
  };

  const formatPhone = str => {
    let [firstPlus, numberPhone] = splitFirstPlus(str);
    if(numberPhone.length < 3 || numberPhone.length > maskLength) {
      return str;
    }
    let mask = maskPhone;
    let maskedPhone = firstPlus + numberPhone.split('').reduce((prev, el) => {
      return prev.replace(maskCharacter, el);
    }, mask);
    return maskedPhone.replace(/[^\d]+$/, '');
  }

  const handleChange = e => {
    setMessage({ type: '', text: '' });
    if (e.target.value === '' && required) {
      setMessage({
        type: 'error',
        text: 'Поле является обязательным'
      });
      setUnformattedPhone('');
      setFormattedPhone('');
      return;
    }
    if (e.target.value.match(/^\+?.+\+$/)) {
      setMessage({
        type: 'hint',
        text: `Знак '+' может быть только один и должен стоять в начале строки`
      });
      return;
    }
    if (
      e.nativeEvent.data !== null &&
      !e.nativeEvent.data?.match(allowedChars)
    ) {
      setMessage({
        type: 'hint',
        text: `Допустимы только цифры и знак '+' вначале строки`
      });
      return;
    }
    const unformattedPhone = parsePhone(e.target.value);
    setFormattedPhone(formatPhone(unformattedPhone));
    setUnformattedPhone(unformattedPhone);
  };

  return { unformattedPhone, formattedPhone, message, handleChange };
};
