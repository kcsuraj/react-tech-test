/**
 * Input field to let user enter and edit texts
 */
import { ChangeEvent, FC } from 'react';

interface IProps {
  /** Name for Select attribute */
  name: string;
  /** Type of input element */
  type: 'text' | 'number';
  /** Label content to display */
  label: string;
  placeholder: string;
  /** Callback fired when a menu item is selected */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Value selected in select */
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
