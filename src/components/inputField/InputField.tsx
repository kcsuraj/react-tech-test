/**
 * Input field to let user enter and edit texts
 */
import { ChangeEvent, FC } from 'react';

interface IProps {
  name: string;
  type: 'text' | 'number';
  label: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const InputField: FC<IProps> = (props) => {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input {...props} />
    </div>
  );
};

export default InputField;
