import { useId } from 'react';
import styles from './Input.module.css';

const Input = ({ placeholder, type, ...restProps }) => {
  const id = useId();

  return (
    <div className={styles.inputField}>
      <input
        className={styles.inputField__input}
        id={id}
        placeholder=" "
        {...restProps}
      />
      <label htmlFor={id} className={styles.inputField__label}>
        {placeholder}
      </label>
    </div>
  );
};
export default Input;
