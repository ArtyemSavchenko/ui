import { useState } from 'react';
import styles from './App.module.css';
import Input from './shared/Input';
import { usePhoneNumber } from './shared/usePhoneNumber';

function App() {
  const [mask, setMask] = useState('# ### ###-##-##');
  const [maskChar, setMaskChar] = useState('#');

  const { unformattedPhone, formattedPhone, message, handleChange } =
    usePhoneNumber({
      required: true,
      maskPhone: mask,
      maskCharacter: maskChar
    });

  return (
    <div className={styles.App}>
      <Input
        placeholder="Mask"
        value={mask}
        onChange={e => {
          if(e.target.value.length > 0)
            setMask(e.target.value);
        }}
      />
      <Input
        placeholder="Mask Character"
        value={maskChar}
        disabled='true'
      />
      <Input
        placeholder="Phone"
        type="tel"
        value={formattedPhone}
        onChange={handleChange}
      />
      <p>Тип ошибки: {message.type}</p>
      <p>Сообщение ошибки: {message.text}</p>
      <p>Неотформатированный номер: {unformattedPhone}</p>
      <p>Отформатированный номер: {formattedPhone}</p>
    </div>
  );
}

export default App;
