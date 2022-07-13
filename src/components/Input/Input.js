import { useField } from 'formik';
import * as S from './Input.styles.js';

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <S.Input>
      <S.Label>{label}</S.Label>
      <S.Field {...field} {...props} />
      <S.ErrorMessage>{meta.touched && meta.error}</S.ErrorMessage>
    </S.Input>
  );
};

export default Input;
